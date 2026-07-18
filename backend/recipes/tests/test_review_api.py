from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from recipes.models import (
    Category,
    Recipe,
    Review,
)


User = get_user_model()


class ReviewAPITests(APITestCase):
    def setUp(self):
        self.owner = User.objects.create_user(
            username="owner",
            email="owner@example.com",
            password="TestPassword123",
        )

        self.reviewer = User.objects.create_user(
            username="reviewer",
            email="reviewer@example.com",
            password="TestPassword123",
        )

        self.other_user = User.objects.create_user(
            username="other_user",
            email="other@example.com",
            password="TestPassword123",
        )

        self.category = Category.objects.create(
            name="Main Food",
            description="Main dishes.",
        )

        self.published_recipe = Recipe.objects.create(
            author=self.owner,
            category=self.category,
            title="Published Pasta",
            description="A pasta recipe.",
            instructions="Cook the pasta.",
            preparation_time=10,
            cooking_time=20,
            servings=2,
            status=Recipe.Status.PUBLISHED,
        )

        self.draft_recipe = Recipe.objects.create(
            author=self.owner,
            category=self.category,
            title="Draft Pasta",
            description="A private recipe.",
            instructions="Private instructions.",
            preparation_time=10,
            cooking_time=15,
            servings=2,
            status=Recipe.Status.DRAFT,
        )

        self.review_list_url = reverse(
            "recipes:recipe-review-list-create",
            kwargs={
                "recipe_pk": self.published_recipe.pk,
            },
        )

        self.draft_review_list_url = reverse(
            "recipes:recipe-review-list-create",
            kwargs={
                "recipe_pk": self.draft_recipe.pk,
            },
        )

    def authenticate(self, user=None):
        self.client.force_authenticate(
            user=user or self.reviewer
        )

    def create_review(self, user=None):
        return Review.objects.create(
            user=user or self.reviewer,
            recipe=self.published_recipe,
            rating=5,
            comment="Excellent recipe.",
        )

    def test_anonymous_user_can_view_reviews(self):
        self.create_review()

        response = self.client.get(
            self.review_list_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertEqual(
            len(response.data["results"]),
            1,
        )

        self.assertEqual(
            response.data["results"][0]["rating"],
            5,
        )

        

    def test_anonymous_user_cannot_create_review(self):
        response = self.client.post(
            self.review_list_url,
            {
                "rating": 5,
                "comment": "Excellent.",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
        )

    def test_authenticated_user_can_create_review(self):
        self.authenticate()

        response = self.client.post(
            self.review_list_url,
            {
                "rating": 5,
                "comment": "Excellent.",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
        )

        self.assertTrue(
            Review.objects.filter(
                user=self.reviewer,
                recipe=self.published_recipe,
                rating=5,
            ).exists()
        )

    def test_user_cannot_review_same_recipe_twice(self):
        self.create_review()
        self.authenticate()

        response = self.client.post(
            self.review_list_url,
            {
                "rating": 4,
                "comment": "Second review.",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

        self.assertEqual(
            Review.objects.filter(
                user=self.reviewer,
                recipe=self.published_recipe,
            ).count(),
            1,
        )

    def test_rating_cannot_be_greater_than_five(self):
        self.authenticate()

        response = self.client.post(
            self.review_list_url,
            {
                "rating": 6,
                "comment": "Invalid.",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

    def test_rating_cannot_be_less_than_one(self):
        self.authenticate()

        response = self.client.post(
            self.review_list_url,
            {
                "rating": 0,
                "comment": "Invalid.",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

    def test_user_cannot_review_draft_recipe(self):
        self.authenticate()

        response = self.client.post(
            self.draft_review_list_url,
            {
                "rating": 5,
                "comment": "Private review.",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
        )

    def test_review_author_can_update_review(self):
        review = self.create_review()

        review_detail_url = reverse(
            "recipes:review-detail",
            kwargs={
                "pk": review.pk,
            },
        )

        self.authenticate()

        response = self.client.patch(
            review_detail_url,
            {
                "rating": 4,
                "comment": "Updated review.",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        review.refresh_from_db()

        self.assertEqual(
            review.rating,
            4,
        )

        self.assertEqual(
            review.comment,
            "Updated review.",
        )

    def test_other_user_cannot_update_review(self):
        review = self.create_review()

        review_detail_url = reverse(
            "recipes:review-detail",
            kwargs={
                "pk": review.pk,
            },
        )

        self.authenticate(self.other_user)

        response = self.client.patch(
            review_detail_url,
            {
                "rating": 1,
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
        )

    def test_review_author_can_delete_review(self):
        review = self.create_review()

        review_detail_url = reverse(
            "recipes:review-detail",
            kwargs={
                "pk": review.pk,
            },
        )

        self.authenticate()

        response = self.client.delete(
            review_detail_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
        )

        self.assertFalse(
            Review.objects.filter(
                pk=review.pk,
            ).exists()
        )

    def test_other_user_cannot_delete_review(self):
        review = self.create_review()

        review_detail_url = reverse(
            "recipes:review-detail",
            kwargs={
                "pk": review.pk,
            },
        )

        self.authenticate(self.other_user)

        response = self.client.delete(
            review_detail_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
        )

        self.assertTrue(
            Review.objects.filter(
                pk=review.pk,
            ).exists()
        )

    def test_recipe_contains_average_rating_and_review_count(self):
        Review.objects.create(
            user=self.reviewer,
            recipe=self.published_recipe,
            rating=4,
            comment="Good.",
        )

        Review.objects.create(
            user=self.other_user,
            recipe=self.published_recipe,
            rating=5,
            comment="Excellent.",
        )

        recipe_detail_url = reverse(
            "recipes:recipe-detail",
            kwargs={
                "pk": self.published_recipe.pk,
            },
        )

        response = self.client.get(
            recipe_detail_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertEqual(
            response.data["reviews_count"],
            2,
        )

        self.assertEqual(
            response.data["average_rating"],
            4.5,
        )