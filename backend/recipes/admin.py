from django.contrib import admin

from .models import (
    Category,
    Favorite,
    Ingredient,
    Recipe,
    RecipeIngredient,
)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "created_at",
    )
    search_fields = ("name",)
    ordering = ("name",)


@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "created_at",
    )
    search_fields = ("name",)
    ordering = ("name",)


class RecipeIngredientInline(admin.TabularInline):
    model = RecipeIngredient
    extra = 1
    autocomplete_fields = ("ingredient",)


@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "author",
        "category",
        "status",
        "preparation_time",
        "cooking_time",
        "created_at",
    )

    list_filter = (
        "status",
        "category",
        "created_at",
    )

    search_fields = (
        "title",
        "description",
        "author__username",
        "author__email",
    )

    autocomplete_fields = (
        "author",
        "category",
    )

    inlines = (
        RecipeIngredientInline,
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )


@admin.register(RecipeIngredient)
class RecipeIngredientAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "recipe",
        "ingredient",
        "amount",
        "unit",
    )

    list_filter = ("unit",)

    search_fields = (
        "recipe__title",
        "ingredient__name",
    )

    autocomplete_fields = (
        "recipe",
        "ingredient",
    )




@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "recipe",
        "created_at",
    )

    search_fields = (
        "user__username",
        "user__email",
        "recipe__title",
    )

    list_select_related = (
        "user",
        "recipe",
    )