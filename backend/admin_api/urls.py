from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    AdminCategoryViewSet,
    AdminRecipeViewSet,
    AdminUserViewSet,
    dashboard_report,
)


app_name = "admin_api"

router = DefaultRouter()
router.register("users", AdminUserViewSet, basename="admin-user")
router.register("recipes", AdminRecipeViewSet, basename="admin-recipe")
router.register("categories", AdminCategoryViewSet, basename="admin-category")

urlpatterns = [
    path("reports/dashboard/", dashboard_report, name="dashboard-report"),
    path("", include(router.urls)),
]
