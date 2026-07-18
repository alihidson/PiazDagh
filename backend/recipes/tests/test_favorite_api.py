from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from recipes.models import (
    Category,
    Favorite,
    Recipe,
)


User = get_user_model()


class FavoriteAPITests(APITestCase):
    def setUp(self):
        self.owner = User.objects.create_user(
            username="owner",
            email="owner@example.com",
            password="TestPassword123",
        )

        self.other_user = User.objects.create_user(
            username="other_user",
            email="other@example.com",
            password="TestPassword123",
        )

        self.category = Category.objects.create(
            name="Fast Food",
            description="Quick meals.",
        )

        self.published_recipe = Recipe.objects.create(
            author=self.owner,
            category=self.category,
            title="Published Pizza",
            description="Published recipe.",
            instructions="Prepare and bake.",
            preparation_time=20,
            cooking_time=15,
            servings=4,
            status=Recipe.Status.PUBLISHED,
        )

        self.draft_recipe = Recipe.objects.create(
            author=self.owner,
            category=self.category,
            title="Private Draft",
            description="Private recipe.",
            instructions="Draft instructions.",
            preparation_time=10,
            cooking_time=10,
            servings=2,
            status=Recipe.Status.DRAFT,
        )

        self.favorite_list_url = reverse(
            "recipes:favorite-list"
        )

        self.published_favorite_url = reverse(
            "recipes:recipe-favorite",
            kwargs={
                "pk": self.published_recipe.pk,
            },
        )

        self.draft_favorite_url = reverse(
            "recipes:recipe-favorite",
            kwargs={
                "pk": self.draft_recipe.pk,
            },
        )

    def authenticate(self, user=None):
        self.client.force_authenticate(
            user=user or self.owner
        )

    def test_anonymous_user_cannot_view_favorites(self):
        response = self.client.get(
            self.favorite_list_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
        )

    def test_anonymous_user_cannot_add_favorite(self):
        response = self.client.post(
            self.published_favorite_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
        )

    def test_authenticated_user_can_add_favorite(self):
        self.authenticate()

        response = self.client.post(
            self.published_favorite_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
        )

        self.assertTrue(
            Favorite.objects.filter(
                user=self.owner,
                recipe=self.published_recipe,
            ).exists()
        )

    def test_adding_same_favorite_twice_does_not_duplicate(self):
        self.authenticate()

        first_response = self.client.post(
            self.published_favorite_url
        )

        second_response = self.client.post(
            self.published_favorite_url
        )

        self.assertEqual(
            first_response.status_code,
            status.HTTP_201_CREATED,
        )

        self.assertEqual(
            second_response.status_code,
            status.HTTP_200_OK,
        )

        self.assertEqual(
            Favorite.objects.filter(
                user=self.owner,
                recipe=self.published_recipe,
            ).count(),
            1,
        )

    def test_user_can_view_own_favorites(self):
        Favorite.objects.create(
            user=self.owner,
            recipe=self.published_recipe,
        )

        Favorite.objects.create(
            user=self.other_user,
            recipe=self.published_recipe,
        )

        self.authenticate()

        response = self.client.get(
            self.favorite_list_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertEqual(
            len(response.data),
            1,
        )

        self.assertEqual(
            response.data[0]["recipe"]["id"],
            self.published_recipe.id,
        )

    def test_user_can_remove_favorite(self):
        Favorite.objects.create(
            user=self.owner,
            recipe=self.published_recipe,
        )

        self.authenticate()

        response = self.client.delete(
            self.published_favorite_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
        )

        self.assertFalse(
            Favorite.objects.filter(
                user=self.owner,
                recipe=self.published_recipe,
            ).exists()
        )

    def test_removing_missing_favorite_returns_404(self):
        self.authenticate()

        response = self.client.delete(
            self.published_favorite_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
        )

    def test_owner_can_favorite_own_draft(self):
        self.authenticate()

        response = self.client.post(
            self.draft_favorite_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
        )

        self.assertTrue(
            Favorite.objects.filter(
                user=self.owner,
                recipe=self.draft_recipe,
            ).exists()
        )

    def test_other_user_cannot_favorite_private_draft(self):
        self.authenticate(self.other_user)

        response = self.client.post(
            self.draft_favorite_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
        )

        self.assertFalse(
            Favorite.objects.filter(
                user=self.other_user,
                recipe=self.draft_recipe,
            ).exists()
        )

    def test_favorites_are_separated_between_users(self):
        Favorite.objects.create(
            user=self.owner,
            recipe=self.published_recipe,
        )

        self.authenticate(self.other_user)

        response = self.client.get(
            self.favorite_list_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertEqual(
            response.data,
            [],
        )