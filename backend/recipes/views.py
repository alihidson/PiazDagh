from rest_framework.filters import SearchFilter
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny

from .models import Category, Ingredient
from .serializers import CategorySerializer, IngredientSerializer


class CategoryListView(ListAPIView):
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    pagination_class = None

    queryset = Category.objects.all()


class IngredientListView(ListAPIView):
    serializer_class = IngredientSerializer
    permission_classes = [AllowAny]
    pagination_class = None

    queryset = Ingredient.objects.all()

    filter_backends = [SearchFilter]
    search_fields = ["name"]