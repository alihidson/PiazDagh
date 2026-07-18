from django.conf import settings
from django.core.validators import MinValueValidator
from django.db import models


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        abstract = True


class Category(TimeStampedModel):
    name = models.CharField(
        max_length=100,
        unique=True,
    )

    description = models.TextField(
        blank=True,
    )

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"
        ordering = ("name",)

    def __str__(self):
        return self.name


class Ingredient(TimeStampedModel):
    name = models.CharField(
        max_length=150,
        unique=True,
    )

    class Meta:
        ordering = ("name",)

    def __str__(self):
        return self.name


class Recipe(TimeStampedModel):
    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        PUBLISHED = "published", "Published"

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="recipes",
    )

    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        related_name="recipes",
        null=True,
        blank=True,
    )

    title = models.CharField(
        max_length=200,
    )

    description = models.TextField()

    instructions = models.TextField()

    image = models.ImageField(
        upload_to="recipes/images/",
        null=True,
        blank=True,
    )

    preparation_time = models.PositiveIntegerField(
        validators=[MinValueValidator(1)],
        help_text="Preparation time in minutes.",
    )

    cooking_time = models.PositiveIntegerField(
        validators=[MinValueValidator(1)],
        help_text="Cooking time in minutes.",
    )

    servings = models.PositiveIntegerField(
        default=1,
        validators=[MinValueValidator(1)],
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.DRAFT,
    )

    ingredients = models.ManyToManyField(
        Ingredient,
        through="RecipeIngredient",
        related_name="recipes",
    )

    class Meta:
        ordering = ("-created_at",)
        indexes = [
            models.Index(
                fields=["status", "-created_at"],
            ),
            models.Index(
                fields=["category", "-created_at"],
            ),
        ]

    def __str__(self):
        return self.title

    @property
    def total_time(self):
        return self.preparation_time + self.cooking_time


class RecipeIngredient(models.Model):
    class Unit(models.TextChoices):
        GRAM = "g", "Gram"
        KILOGRAM = "kg", "Kilogram"
        MILLILITER = "ml", "Milliliter"
        LITER = "l", "Liter"
        TEASPOON = "tsp", "Teaspoon"
        TABLESPOON = "tbsp", "Tablespoon"
        CUP = "cup", "Cup"
        PIECE = "piece", "Piece"
        TO_TASTE = "to_taste", "To taste"

    recipe = models.ForeignKey(
        Recipe,
        on_delete=models.CASCADE,
        related_name="recipe_ingredients",
    )

    ingredient = models.ForeignKey(
        Ingredient,
        on_delete=models.CASCADE,
        related_name="recipe_ingredients",
    )

    amount = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0)],
    )

    unit = models.CharField(
        max_length=20,
        choices=Unit.choices,
        default=Unit.GRAM,
    )

    note = models.CharField(
        max_length=200,
        blank=True,
        help_text="Example: chopped, fresh or optional.",
    )

    class Meta:
        ordering = ("id",)
        constraints = [
            models.UniqueConstraint(
                fields=["recipe", "ingredient"],
                name="unique_ingredient_per_recipe",
            ),
        ]

    def __str__(self):
        return f"{self.recipe.title} - {self.ingredient.name}"


class Favorite(TimeStampedModel):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="favorite_recipes",
    )

    recipe = models.ForeignKey(
        Recipe,
        on_delete=models.CASCADE,
        related_name="favorited_by",
    )

    class Meta:
        ordering = ("-created_at",)
        constraints = [
            models.UniqueConstraint(
                fields=["user", "recipe"],
                name="unique_user_recipe_favorite",
            ),
        ]

    def __str__(self):
        return f"{self.user.username} - {self.recipe.title}"