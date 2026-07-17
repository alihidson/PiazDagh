from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from recipes.models import (
    Category,
    Ingredient,
    Recipe,
    RecipeIngredient,
)


User = get_user_model()


class RecipeAPITests(APITestCase):
    def setUp(self):
        self.owner = User.objects.create_user(
            username="recipe_owner",
            email="owner@example.com",
            password="TestPassword123",
            first_name="Recipe",
            last_name="Owner",
        )

        self.other_user = User.objects.create_user(
            username="other_user",
            email="other@example.com",
            password="TestPassword123",
            first_name="Other",
            last_name="User",
        )

        self.fast_food_category = Category.objects.create(
            name="Fast Food",
            description="Quick and popular meals.",
        )

        self.iranian_category = Category.objects.create(
            name="Iranian Food",
            description="Traditional Iranian recipes.",
        )

        self.cheese = Ingredient.objects.create(
            name="Cheese",
        )

        self.tomato = Ingredient.objects.create(
            name="Tomato",
        )

        self.published_recipe = Recipe.objects.create(
            author=self.owner,
            category=self.fast_food_category,
            title="Published Pizza",
            description="A published pizza recipe.",
            instructions="Prepare the dough and bake.",
            preparation_time=20,
            cooking_time=15,
            servings=4,
            status=Recipe.Status.PUBLISHED,
        )

        RecipeIngredient.objects.create(
            recipe=self.published_recipe,
            ingredient=self.cheese,
            amount="250.00",
            unit="g",
            note="grated",
        )

        self.draft_recipe = Recipe.objects.create(
            author=self.owner,
            category=self.iranian_category,
            title="Private Draft",
            description="A private draft recipe.",
            instructions="Draft instructions.",
            preparation_time=10,
            cooking_time=20,
            servings=2,
            status=Recipe.Status.DRAFT,
        )

        RecipeIngredient.objects.create(
            recipe=self.draft_recipe,
            ingredient=self.tomato,
            amount="2.00",
            unit="piece",
            note="",
        )

        self.recipe_list_url = reverse(
            "recipes:recipe-list-create"
        )

        self.published_detail_url = reverse(
            "recipes:recipe-detail",
            kwargs={"pk": self.published_recipe.pk},
        )

        self.draft_detail_url = reverse(
            "recipes:recipe-detail",
            kwargs={"pk": self.draft_recipe.pk},
        )

    def authenticate(self, user=None):
        self.client.force_authenticate(
            user=user or self.owner
        )

    def get_recipe_ids(self, response):
        return [
            recipe["id"]
            for recipe in response.data
        ]

    def test_anonymous_user_can_view_published_recipes(self):
        response = self.client.get(
            self.recipe_list_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        recipe_ids = self.get_recipe_ids(response)

        self.assertIn(
            self.published_recipe.id,
            recipe_ids,
        )

    def test_anonymous_user_cannot_view_draft_in_list(self):
        response = self.client.get(
            self.recipe_list_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        recipe_ids = self.get_recipe_ids(response)

        self.assertNotIn(
            self.draft_recipe.id,
            recipe_ids,
        )

    def test_owner_can_view_own_draft_in_list(self):
        self.authenticate()

        response = self.client.get(
            self.recipe_list_url,
            {"status": Recipe.Status.DRAFT},
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        recipe_ids = self.get_recipe_ids(response)

        self.assertIn(
            self.draft_recipe.id,
            recipe_ids,
        )

    def test_other_user_cannot_view_draft_in_list(self):
        self.authenticate(self.other_user)

        response = self.client.get(
            self.recipe_list_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        recipe_ids = self.get_recipe_ids(response)

        self.assertNotIn(
            self.draft_recipe.id,
            recipe_ids,
        )

    def test_owner_can_view_own_draft_detail(self):
        self.authenticate()

        response = self.client.get(
            self.draft_detail_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertEqual(
            response.data["id"],
            self.draft_recipe.id,
        )

        self.assertEqual(
            response.data["status"],
            Recipe.Status.DRAFT,
        )

    def test_other_user_cannot_view_draft_detail(self):
        self.authenticate(self.other_user)

        response = self.client.get(
            self.draft_detail_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
        )

    def test_anonymous_user_cannot_view_draft_detail(self):
        response = self.client.get(
            self.draft_detail_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
        )

    def test_anonymous_user_cannot_create_recipe(self):
        payload = {
            "category_id": self.fast_food_category.id,
            "title": "Anonymous Recipe",
            "description": "This request must fail.",
            "instructions": "None",
            "preparation_time": 10,
            "cooking_time": 10,
            "servings": 2,
            "status": Recipe.Status.PUBLISHED,
        }

        response = self.client.post(
            self.recipe_list_url,
            payload,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
        )

    def test_authenticated_user_can_create_recipe(self):
        self.authenticate()

        payload = {
            "category_id": self.fast_food_category.id,
            "title": "New Pizza",
            "description": "A new pizza recipe.",
            "instructions": "Prepare dough and bake.",
            "preparation_time": 20,
            "cooking_time": 15,
            "servings": 4,
            "status": Recipe.Status.PUBLISHED,
            "ingredients": [
                {
                    "ingredient_id": self.cheese.id,
                    "amount": "300.00",
                    "unit": "g",
                    "note": "grated",
                },
                {
                    "ingredient_id": self.tomato.id,
                    "amount": "2.00",
                    "unit": "piece",
                    "note": "",
                },
            ],
        }

        response = self.client.post(
            self.recipe_list_url,
            payload,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
        )

        recipe = Recipe.objects.get(
            pk=response.data["id"]
        )

        self.assertEqual(
            recipe.author,
            self.owner,
        )

        self.assertEqual(
            recipe.title,
            "New Pizza",
        )

        self.assertEqual(
            recipe.recipe_ingredients.count(),
            2,
        )

    def test_owner_can_update_recipe(self):
        self.authenticate()

        response = self.client.patch(
            self.published_detail_url,
            {
                "title": "Updated Pizza",
                "servings": 6,
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.published_recipe.refresh_from_db()

        self.assertEqual(
            self.published_recipe.title,
            "Updated Pizza",
        )

        self.assertEqual(
            self.published_recipe.servings,
            6,
        )

    def test_other_user_cannot_update_published_recipe(self):
        self.authenticate(self.other_user)

        response = self.client.patch(
            self.published_detail_url,
            {
                "title": "Unauthorized Update",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
        )

        self.published_recipe.refresh_from_db()

        self.assertEqual(
            self.published_recipe.title,
            "Published Pizza",
        )

    def test_other_user_cannot_update_draft_recipe(self):
        self.authenticate(self.other_user)

        response = self.client.patch(
            self.draft_detail_url,
            {
                "title": "Hacked Draft",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
        )

        self.draft_recipe.refresh_from_db()

        self.assertEqual(
            self.draft_recipe.title,
            "Private Draft",
        )

    def test_other_user_cannot_delete_recipe(self):
        self.authenticate(self.other_user)

        response = self.client.delete(
            self.published_detail_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
        )

        self.assertTrue(
            Recipe.objects.filter(
                pk=self.published_recipe.pk
            ).exists()
        )

    def test_owner_can_delete_recipe(self):
        self.authenticate()

        response = self.client.delete(
            self.published_detail_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
        )

        self.assertFalse(
            Recipe.objects.filter(
                pk=self.published_recipe.pk
            ).exists()
        )

    def test_filter_recipes_by_category(self):
        Recipe.objects.create(
            author=self.owner,
            category=self.iranian_category,
            title="Published Iranian Recipe",
            description="Traditional food.",
            instructions="Cook the recipe.",
            preparation_time=30,
            cooking_time=60,
            servings=4,
            status=Recipe.Status.PUBLISHED,
        )

        response = self.client.get(
            self.recipe_list_url,
            {
                "category": self.fast_food_category.id,
            },
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertGreater(
            len(response.data),
            0,
        )

        for recipe in response.data:
            self.assertEqual(
                recipe["category"]["id"],
                self.fast_food_category.id,
            )

    def test_filter_recipes_by_status(self):
        self.authenticate()

        response = self.client.get(
            self.recipe_list_url,
            {
                "status": Recipe.Status.DRAFT,
            },
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertGreater(
            len(response.data),
            0,
        )

        for recipe in response.data:
            self.assertEqual(
                recipe["status"],
                Recipe.Status.DRAFT,
            )

    def test_search_recipe_by_title(self):
        response = self.client.get(
            self.recipe_list_url,
            {
                "search": "Pizza",
            },
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        recipe_ids = self.get_recipe_ids(response)

        self.assertIn(
            self.published_recipe.id,
            recipe_ids,
        )

    def test_order_recipes_by_preparation_time(self):
        Recipe.objects.create(
            author=self.owner,
            category=self.fast_food_category,
            title="Quick Sandwich",
            description="A quick sandwich.",
            instructions="Prepare ingredients.",
            preparation_time=5,
            cooking_time=0,
            servings=1,
            status=Recipe.Status.PUBLISHED,
        )

        response = self.client.get(
            self.recipe_list_url,
            {
                "ordering": "preparation_time",
            },
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        preparation_times = [
            recipe["preparation_time"]
            for recipe in response.data
        ]

        self.assertEqual(
            preparation_times,
            sorted(preparation_times),
        )