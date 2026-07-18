from django.urls import path

from .views import (
    CategoryListView,
    FavoriteListView,
    IngredientListView,
    RecipeDetailView,
    RecipeFavoriteView,
    RecipeListCreateView,
    RecipeReviewListCreateView,
    ReviewDetailView,
)


app_name = "recipes"


urlpatterns = [
    path(
        "categories/",
        CategoryListView.as_view(),
        name="category-list",
    ),

    path(
        "ingredients/",
        IngredientListView.as_view(),
        name="ingredient-list",
    ),

    path(
        "recipes/",
        RecipeListCreateView.as_view(),
        name="recipe-list-create",
    ),

    path(
        "recipes/<int:pk>/",
        RecipeDetailView.as_view(),
        name="recipe-detail",
    ),
    
    path(
        "favorites/",
        FavoriteListView.as_view(),
        name="favorite-list",
    ),

    path(
        "recipes/<int:pk>/favorite/",
        RecipeFavoriteView.as_view(),
        name="recipe-favorite",
    ),

    path(
        "recipes/<int:recipe_pk>/reviews/",
        RecipeReviewListCreateView.as_view(),
        name="recipe-review-list-create",
    ),

    path(
        "reviews/<int:pk>/",
        ReviewDetailView.as_view(),
        name="review-detail",
    ),
]