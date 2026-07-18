from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase


User = get_user_model()


class ChangePasswordAPITests(APITestCase):
    def setUp(self):
        self.old_password = "TestPassword123"
        self.new_password = "NewPassword456"

        self.user = User.objects.create_user(
            username="change_password_user",
            email="change@example.com",
            password=self.old_password,
            first_name="Change",
            last_name="Password",
        )

        self.change_password_url = reverse(
            "change-password"
        )

    def authenticate(self):
        self.client.force_authenticate(
            user=self.user
        )

    def test_authenticated_user_can_change_password(self):
        self.authenticate()

        response = self.client.post(
            self.change_password_url,
            {
                "old_password": self.old_password,
                "new_password": self.new_password,
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.user.refresh_from_db()

        self.assertTrue(
            self.user.check_password(
                self.new_password
            )
        )

        self.assertFalse(
            self.user.check_password(
                self.old_password
            )
        )

    def test_user_cannot_change_password_with_wrong_old_password(self):
        self.authenticate()

        response = self.client.post(
            self.change_password_url,
            {
                "old_password": "WrongPassword123",
                "new_password": self.new_password,
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

        self.user.refresh_from_db()

        self.assertTrue(
            self.user.check_password(
                self.old_password
            )
        )

        self.assertFalse(
            self.user.check_password(
                self.new_password
            )
        )

    def test_anonymous_user_cannot_change_password(self):
        response = self.client.post(
            self.change_password_url,
            {
                "old_password": self.old_password,
                "new_password": self.new_password,
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
        )

        self.user.refresh_from_db()

        self.assertTrue(
            self.user.check_password(
                self.old_password
            )
        )