from django.db.models import Q

#from django.db import IntegrityError

from rest_framework.filters import OrderingFilter, SearchFilter
from django.shortcuts import get_object_or_404

from rest_framework import generics

from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
)

from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView


from .models import Category, Ingredient, Recipe, Favorite, Review
from .permissions import IsAuthorOrReadOnly

from recipes.permissions import IsReviewAuthorOrReadOnly
from rest_framework.exceptions import ValidationError

from .serializers import (
    CategorySerializer,
    IngredientSerializer,
    RecipeSerializer,
    FavoriteSerializer,
    ReviewSerializer,
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

        
        mine = self.request.query_params.get("mine")

        if mine == "true":
            if not user.is_authenticated:
                return Recipe.objects.none()

            queryset = queryset.filter(
                author=user,
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


class FavoriteListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        favorites = (
            Favorite.objects
            .filter(user=request.user)
            .select_related(
                "recipe",
                "recipe__author",
                "recipe__category",
            )
            .prefetch_related(
                "recipe__recipe_ingredients__ingredient",
            )
        )

        serializer = FavoriteSerializer(
            favorites,
            many=True,
            context={
                "request": request,
            },
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )


class RecipeFavoriteView(APIView):
    permission_classes = [IsAuthenticated]

    def get_recipe(self, request, pk):
        queryset = (
            Recipe.objects
            .filter(
                Q(status=Recipe.Status.PUBLISHED)
                | Q(author=request.user)
            )
            .select_related(
                "author",
                "category",
            )
            .prefetch_related(
                "recipe_ingredients__ingredient",
            )
        )

        return get_object_or_404(
            queryset,
            pk=pk,
        )

    def post(self, request, pk):
        recipe = self.get_recipe(
            request,
            pk,
        )

        favorite, created = Favorite.objects.get_or_create(
            user=request.user,
            recipe=recipe,
        )

        serializer = FavoriteSerializer(
            favorite,
            context={
                "request": request,
            },
        )

        if created:
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

    def delete(self, request, pk):
        recipe = self.get_recipe(
            request,
            pk,
        )

        favorite = Favorite.objects.filter(
            user=request.user,
            recipe=recipe,
        ).first()

        if favorite is None:
            return Response(
                {
                    "detail": (
                        "This recipe is not in your favorites."
                    )
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        favorite.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT,
        )





class RecipeReviewListCreateView(
    generics.ListCreateAPIView
):
    serializer_class = ReviewSerializer
    permission_classes = [
        IsAuthenticatedOrReadOnly,
    ]

    def get_recipe(self):
        return get_object_or_404(
            Recipe.objects.select_related(
                "author",
                "category",
            ),
            pk=self.kwargs["recipe_pk"],
            status=Recipe.Status.PUBLISHED,
        )

    def get_queryset(self):
        recipe = self.get_recipe()

        return (
            Review.objects
            .filter(recipe=recipe)
            .select_related(
                "user",
                "recipe",
            )
        )

    def perform_create(self, serializer):
        recipe = self.get_recipe()

        if Review.objects.filter(
            user=self.request.user,
            recipe=recipe,
        ).exists():
            

            raise ValidationError(
                {
                    "detail": (
                        "You have already reviewed this recipe."
                    )
                }
            )

        serializer.save(
            user=self.request.user,
            recipe=recipe,
        )


class ReviewDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    serializer_class = ReviewSerializer
    permission_classes = [
        IsReviewAuthorOrReadOnly,
    ]

    queryset = (
        Review.objects
        .filter(
            recipe__status=Recipe.Status.PUBLISHED,
        )
        .select_related(
            "user",
            "recipe",
        )
    )



