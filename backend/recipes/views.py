from django.db.models import Q
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly

from .models import Category, Ingredient, Recipe
from .permissions import IsAuthorOrReadOnly
from .serializers import (
    CategorySerializer,
    IngredientSerializer,
    RecipeSerializer,
)


class CategoryListView(ListAPIView):
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    pagination_class = None

    queryset = Category.objects.all()


class IngredientListView(ListAPIView):
    serializer_class = IngredientSerializer
    permission_classes = [AllowAny]
    pagination_class = None

    queryset = Ingredient.objects.all()

    filter_backends = [SearchFilter]
    search_fields = ["name"]


class RecipeListCreateView(ListCreateAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    filter_backends = [
        SearchFilter,
        OrderingFilter,
    ]

    search_fields = [
        "title",
        "description",
        "instructions",
        "author__username",
        "category__name",
        "recipe_ingredients__ingredient__name",
    ]

    ordering_fields = [
        "created_at",
        "preparation_time",
        "cooking_time",
        "servings",
        "title",
    ]

    ordering = ["-created_at"]

    def get_queryset(self):
        queryset = (
            Recipe.objects
            .select_related(
                "author",
                "category",
            )
            .prefetch_related(
                "recipe_ingredients__ingredient",
            )
            .distinct()
        )

        user = self.request.user

        if user.is_authenticated:
            queryset = queryset.filter(
                Q(status=Recipe.Status.PUBLISHED)
                | Q(author=user)
            )
        else:
            queryset = queryset.filter(
                status=Recipe.Status.PUBLISHED
            )

        category_id = self.request.query_params.get(
            "category"
        )

        if category_id:
            queryset = queryset.filter(
                category_id=category_id
            )

        status_value = self.request.query_params.get(
            "status"
        )

        if (
            status_value
            and user.is_authenticated
        ):
            if status_value == Recipe.Status.DRAFT:
                queryset = queryset.filter(
                    status=Recipe.Status.DRAFT,
                    author=user,
                )

            elif status_value == Recipe.Status.PUBLISHED:
                queryset = queryset.filter(
                    status=Recipe.Status.PUBLISHED,
                )

        return queryset

    def perform_create(self, serializer):
        serializer.save(
            author=self.request.user,
        )


class RecipeDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = RecipeSerializer

    permission_classes = [
        IsAuthenticatedOrReadOnly,
        IsAuthorOrReadOnly,
    ]

    def get_queryset(self):
        queryset = (
            Recipe.objects
            .select_related(
                "author",
                "category",
            )
            .prefetch_related(
                "recipe_ingredients__ingredient",
            )
        )

        user = self.request.user

        if user.is_authenticated:
            return queryset.filter(
                Q(status=Recipe.Status.PUBLISHED)
                | Q(author=user)
            )

        return queryset.filter(
            status=Recipe.Status.PUBLISHED
        )