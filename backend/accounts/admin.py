from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        (
            "Profile",
            {
                "fields": (
                    "avatar",
                    "bio",
                )
            },
        ),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        (
            "Profile",
            {
                "fields": (
                    "email",
                    "first_name",
                    "last_name",
                    "avatar",
                    "bio",
                )
            },
        ),
    )

    list_display = (
        "id",
        "username",
        "email",
        "first_name",
        "last_name",
        "is_active",
        "is_staff",
    )

    search_fields = (
        "username",
        "email",
        "first_name",
        "last_name",
    )