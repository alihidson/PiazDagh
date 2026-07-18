from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from recipes.models import Category, Recipe
from recipes.serializers import CategorySerializer, RecipeSerializer


User = get_user_model()


class AdminUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=False,
        allow_blank=False,
        validators=[validate_password],
    )
    recipes_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "avatar",
            "bio",
            "is_active",
            "is_staff",
            "is_superuser",
            "date_joined",
            "last_login",
            "recipes_count",
            "password",
        )
        read_only_fields = ("id", "date_joined", "last_login", "recipes_count")

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        for field, value in validated_data.items():
            setattr(instance, field, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class AdminRecipeSerializer(RecipeSerializer):
    favorites_count = serializers.IntegerField(read_only=True)

    class Meta(RecipeSerializer.Meta):
        fields = RecipeSerializer.Meta.fields + ("favorites_count",)
        read_only_fields = tuple(
            field for field in RecipeSerializer.Meta.read_only_fields
            if field != "author"
        ) + ("favorites_count",)


class RecipeStatusSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=Recipe.Status.choices)


class AdminCategorySerializer(CategorySerializer):
    recipes_count = serializers.IntegerField(read_only=True)

    class Meta(CategorySerializer.Meta):
        fields = CategorySerializer.Meta.fields + ("recipes_count",)
        read_only_fields = ("recipes_count",)
