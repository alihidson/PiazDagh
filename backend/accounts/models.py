from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(
        unique=True,
        error_messages={
            "unique": "کاربری با این ایمیل قبلاً ثبت‌نام کرده است.",
        },
    )

    avatar = models.ImageField(
        upload_to="avatars/",
        blank=True,
        null=True,
    )

    bio = models.TextField(
        blank=True,
        max_length=500,
    )

    def __str__(self):
        return self.username