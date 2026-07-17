from django.urls import path

from .views import CategoryListView, IngredientListView


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
]