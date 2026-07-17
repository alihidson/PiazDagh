from django.urls import path

from .views import (
    CategoryListView,
    IngredientListView,
    RecipeDetailView,
    RecipeListCreateView,
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
]