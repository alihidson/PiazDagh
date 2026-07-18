from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from recipes.models import Category, Favorite, Recipe


User = get_user_model()


class AdminApiTests(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_superuser(
            username="admin-api",
            email="admin-api@example.com",
            password="StrongPass123!",
        )
        self.user = User.objects.create_user(
            username="normal-user",
            email="normal@example.com",
            password="StrongPass123!",
        )
        self.category = Category.objects.create(name="Iranian")
        self.recipe = Recipe.objects.create(
            author=self.user,
            category=self.category,
            title="Test Recipe",
            description="Description",
            instructions="Instructions",
            preparation_time=10,
            cooking_time=20,
            servings=2,
            status=Recipe.Status.DRAFT,
        )

    def test_non_admin_cannot_access_admin_api(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(reverse("admin_api:admin-user-list"))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_can_list_users(self):
        self.client.force_authenticate(self.admin)
        response = self.client.get(reverse("admin_api:admin-user-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 2)

    def test_admin_can_approve_recipe(self):
        self.client.force_authenticate(self.admin)
        response = self.client.post(
            reverse("admin_api:admin-recipe-approve", args=[self.recipe.pk])
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.recipe.refresh_from_db()
        self.assertEqual(self.recipe.status, Recipe.Status.PUBLISHED)

    def test_admin_can_create_category(self):
        self.client.force_authenticate(self.admin)
        response = self.client.post(
            reverse("admin_api:admin-category-list"),
            {"name": "Dessert", "description": "Sweet recipes"},
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Category.objects.filter(name="Dessert").exists())

    def test_dashboard_report(self):
        self.recipe.status = Recipe.Status.PUBLISHED
        self.recipe.save()
        Favorite.objects.create(user=self.admin, recipe=self.recipe)
        self.client.force_authenticate(self.admin)
        response = self.client.get(reverse("admin_api:dashboard-report"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["users"]["active"], 2)
        self.assertEqual(response.data["recipes"]["published"], 1)
        self.assertEqual(response.data["popular_recipes"][0]["id"], self.recipe.id)
