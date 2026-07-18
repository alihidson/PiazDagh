from django.db import transaction
from rest_framework import serializers

from recipes.models import (
    Category,
    Favorite,
    Ingredient,
    Recipe,
    RecipeIngredient,
)




class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            "id",
            "name",
            "description",
        )


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = (
            "id",
            "name",
        )


class RecipeIngredientSerializer(serializers.ModelSerializer):
    ingredient_id = serializers.PrimaryKeyRelatedField(
        source="ingredient",
        queryset=Ingredient.objects.all(),
        write_only=True,
    )

    ingredient = IngredientSerializer(
        read_only=True,
    )

    class Meta:
        model = RecipeIngredient
        fields = (
            "id",
            "ingredient",
            "ingredient_id",
            "amount",
            "unit",
            "note",
        )

        read_only_fields = ("id",)


class RecipeSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

    category = CategorySerializer(
        read_only=True,
    )

    category_id = serializers.PrimaryKeyRelatedField(
        source="category",
        queryset=Category.objects.all(),
        write_only=True,
        required=False,
        allow_null=True,
    )

    ingredients = RecipeIngredientSerializer(
        source="recipe_ingredients",
        many=True,
        required=False,
    )

    total_time = serializers.IntegerField(
        read_only=True,
    )

    class Meta:
        model = Recipe
        fields = (
            "id",
            "author",
            "category",
            "category_id",
            "title",
            "description",
            "instructions",
            "image",
            "preparation_time",
            "cooking_time",
            "total_time",
            "servings",
            "status",
            "ingredients",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "author",
            "total_time",
            "created_at",
            "updated_at",
        )

    def get_author(self, obj):
        return {
            "id": obj.author.id,
            "username": obj.author.username,
            "first_name": obj.author.first_name,
            "last_name": obj.author.last_name,
        }

    def validate_ingredients(self, ingredients):
        ingredient_ids = [
            item["ingredient"].id
            for item in ingredients
        ]

        if len(ingredient_ids) != len(set(ingredient_ids)):
            raise serializers.ValidationError(
                "Each ingredient can only be added once."
            )

        return ingredients

    @transaction.atomic
    def create(self, validated_data):
        ingredients_data = validated_data.pop(
            "recipe_ingredients",
            [],
        )

        recipe = Recipe.objects.create(**validated_data)

        RecipeIngredient.objects.bulk_create(
            [
                RecipeIngredient(
                    recipe=recipe,
                    **ingredient_data,
                )
                for ingredient_data in ingredients_data
            ]
        )

        return recipe

    @transaction.atomic
    def update(self, instance, validated_data):
        ingredients_data = validated_data.pop(
            "recipe_ingredients",
            None,
        )

        for field, value in validated_data.items():
            setattr(instance, field, value)

        instance.save()

        if ingredients_data is not None:
            instance.recipe_ingredients.all().delete()

            RecipeIngredient.objects.bulk_create(
                [
                    RecipeIngredient(
                        recipe=instance,
                        **ingredient_data,
                    )
                    for ingredient_data in ingredients_data
                ]
            )

        return instance



class FavoriteSerializer(serializers.ModelSerializer):
    recipe = RecipeSerializer(
        read_only=True,
    )

    class Meta:
        model = Favorite
        fields = (
            "id",
            "recipe",
            "created_at",
        )

        read_only_fields = fields