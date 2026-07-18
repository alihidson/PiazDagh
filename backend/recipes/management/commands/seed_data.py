from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from recipes.models import Category, Ingredient, Recipe, RecipeIngredient

class Command(BaseCommand):
    help = "Create initial categories, ingredients and demo recipes (idempotent)."

    def handle(self, *args, **options):
        User = get_user_model()
        admin, created = User.objects.get_or_create(username="admin", defaults={"email":"admin@piazdagh.local", "is_staff":True, "is_superuser":True})
        if created:
            admin.set_password("admin12345")
            admin.save()
        categories = {}
        for name in ["غذای ایرانی", "فست فود", "دسر", "سالاد", "سوپ", "نوشیدنی", "صبحانه", "بین‌المللی"]:
            categories[name], _ = Category.objects.get_or_create(name=name)
        ingredient_names = ["پیاز", "گوشت", "برنج", "سبزی", "نمک", "فلفل", "روغن", "تخم مرغ", "آرد", "شکر"]
        ingredients = {name: Ingredient.objects.get_or_create(name=name)[0] for name in ingredient_names}
        samples = [
            ("خورشت قورمه سبزی", "غذای ایرانی", 30, 150, "خورشت اصیل ایرانی با سبزی معطر و گوشت", "پیاز را تفت دهید.\nگوشت را اضافه کنید.\nسبزی و آب را اضافه کرده و اجازه دهید خورشت جا بیفتد."),
            ("پاستای خانگی", "بین‌المللی", 15, 30, "پاستای ساده و خوش‌طعم برای یک وعده سریع", "پاستا را بجوشانید.\nسس را آماده کنید.\nپاستا و سس را مخلوط و سرو کنید."),
            ("کیک شکلاتی", "دسر", 20, 45, "کیک شکلاتی نرم و مناسب عصرانه", "مواد خشک را مخلوط کنید.\nمواد تر را اضافه کنید.\nدر فر بپزید."),
            ("سالاد فصل", "سالاد", 15, 5, "سالاد تازه و سبک", "مواد را خرد کنید.\nسس را اضافه کنید.\nسرو کنید."),
            ("سوپ سبزیجات", "سوپ", 20, 40, "سوپ گرم و سالم", "سبزیجات را خرد کنید.\nبا آب و ادویه بپزید.\nگرم سرو کنید."),
            ("صبحانه ایرانی", "صبحانه", 10, 10, "صبحانه ساده و مقوی", "مواد را آماده کنید.\nتخم مرغ را بپزید.\nهمراه نان سرو کنید."),
        ]
        for title, category, prep, cook, desc, instructions in samples:
            recipe, was_created = Recipe.objects.get_or_create(title=title, defaults={"author":admin,"category":categories[category],"description":desc,"instructions":instructions,"preparation_time":prep,"cooking_time":cook,"servings":4,"status":Recipe.Status.PUBLISHED})
            if was_created:
                for idx, ingredient in enumerate(list(ingredients.values())[:4]):
                    RecipeIngredient.objects.create(recipe=recipe, ingredient=ingredient, amount=idx+1, unit="piece")
        self.stdout.write(self.style.SUCCESS("Seed data is ready."))
