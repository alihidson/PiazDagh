from django.contrib.auth import get_user_model
from django.db.models import Avg, Count, Q
from rest_framework import filters, status, viewsets
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from recipes.models import Category, Recipe

from .serializers import (
    AdminCategorySerializer,
    AdminRecipeSerializer,
    AdminUserSerializer,
    RecipeStatusSerializer,
)


User = get_user_model()


class AdminUserViewSet(viewsets.ModelViewSet):
    """Admin-only CRUD for application users."""

    serializer_class = AdminUserSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["username", "email", "first_name", "last_name"]
    ordering_fields = ["date_joined", "last_login", "username", "email"]
    ordering = ["-date_joined"]

    def get_queryset(self):
        return User.objects.annotate(recipes_count=Count("recipes", distinct=True))

    def destroy(self, request, *args, **kwargs):
        user = self.get_object()
        if user.pk == request.user.pk:
            return Response(
                {"detail": "You cannot delete your own administrator account."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if user.is_superuser and User.objects.filter(is_superuser=True).count() <= 1:
            return Response(
                {"detail": "The last superuser cannot be deleted."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return super().destroy(request, *args, **kwargs)


class AdminRecipeViewSet(viewsets.ModelViewSet):
    """Admin-only recipe review, approval, editing, and deletion."""

    serializer_class = AdminRecipeSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = [
        "title",
        "description",
        "author__username",
        "author__email",
        "category__name",
    ]
    ordering_fields = ["created_at", "updated_at", "title", "status"]
    ordering = ["-created_at"]

    def get_queryset(self):
        queryset = (
            Recipe.objects.select_related("author", "category")
            .prefetch_related("recipe_ingredients__ingredient")
            .annotate(favorites_count=Count("favorited_by", distinct=True))
        )
        recipe_status = self.request.query_params.get("status")
        category = self.request.query_params.get("category")
        author = self.request.query_params.get("author")
        if recipe_status:
            queryset = queryset.filter(status=recipe_status)
        if category:
            queryset = queryset.filter(category_id=category)
        if author:
            queryset = queryset.filter(author_id=author)
        return queryset

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=["post"])
    def approve(self, request, pk=None):
        recipe = self.get_object()
        recipe.status = Recipe.Status.PUBLISHED
        recipe.save(update_fields=["status", "updated_at"])
        return Response(self.get_serializer(recipe).data)

    @action(detail=True, methods=["post"])
    def reject(self, request, pk=None):
        recipe = self.get_object()
        recipe.status = Recipe.Status.DRAFT
        recipe.save(update_fields=["status", "updated_at"])
        return Response(self.get_serializer(recipe).data)

    @action(detail=True, methods=["patch"], url_path="set-status")
    def set_status(self, request, pk=None):
        recipe = self.get_object()
        serializer = RecipeStatusSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        recipe.status = serializer.validated_data["status"]
        recipe.save(update_fields=["status", "updated_at"])
        return Response(self.get_serializer(recipe).data)


class AdminCategoryViewSet(viewsets.ModelViewSet):
    """Admin-only category CRUD."""

    serializer_class = AdminCategorySerializer
    permission_classes = [IsAdminUser]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "description"]
    ordering_fields = ["name", "created_at", "recipes_count"]
    ordering = ["name"]

    def get_queryset(self):
        return Category.objects.annotate(recipes_count=Count("recipes", distinct=True))


@api_view(["GET"])
@permission_classes([IsAdminUser])
def dashboard_report(request):
    users = User.objects.all()
    recipes = Recipe.objects.all()

    popular_recipes = (
        recipes.filter(status=Recipe.Status.PUBLISHED)
        .select_related("author", "category")
        .annotate(
            favorites_count=Count("favorited_by", distinct=True),
            reviews_count_value=Count("reviews", distinct=True),
            average_rating_value=Avg("reviews__rating"),
        )
        .order_by(
            "-favorites_count",
            "-reviews_count_value",
            "-average_rating_value",
            "-created_at",
        )[:10]
    )

    popular_data = [
        {
            "id": recipe.id,
            "title": recipe.title,
            "author": recipe.author.username,
            "category": recipe.category.name if recipe.category else None,
            "favorites_count": recipe.favorites_count,
            "reviews_count": recipe.reviews_count_value,
            "average_rating": (
                round(recipe.average_rating_value, 1)
                if recipe.average_rating_value is not None
                else None
            ),
        }
        for recipe in popular_recipes
    ]

    return Response(
        {
            "users": {
                "total": users.count(),
                "active": users.filter(is_active=True).count(),
                "staff": users.filter(is_staff=True).count(),
            },
            "recipes": {
                "total": recipes.count(),
                "pending": recipes.filter(status=Recipe.Status.DRAFT).count(),
                "published": recipes.filter(status=Recipe.Status.PUBLISHED).count(),
            },
            "categories": Category.objects.count(),
            "popular_recipes": popular_data,
        }
    )
