import { useState, useEffect } from "react";
import RecipeCard from "../cards/RecipeCard";
import recipeService from "../../services/recipeService";

const FavoriteRecipesSection = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null); // track which card is being removed

  useEffect(() => {
    async function fetch() {
      const data = await recipeService.getFavoriteRecipes();
      setRecipes(data);
      setLoading(false);
    }
    fetch();
  }, []);

  const handleRemove = async (recipeId) => {
    if (!window.confirm("آیا از حذف این دستور از علاقه‌مندی‌ها مطمئن هستید؟"))
      return;

    setRemoving(recipeId);
    try {
      await recipeService.removeFavorite(recipeId);
      setRecipes((prev) => prev.filter((r) => r.id !== recipeId));
    } catch {
      alert("خطا در حذف از علاقه‌مندی‌ها");
    } finally {
      setRemoving(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-mint" role="status">
          <span className="visually-hidden">در حال بارگذاری...</span>
        </div>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-charcoal">
          شما هنوز دستوری را به علاقه‌مندی‌ها اضافه نکرده‌اید.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h5 className="fw-bold text-mint mb-4">علاقه‌مندی‌ها</h5>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        {recipes.map((recipe) => (
          <div className="col" key={recipe.id}>
            <div
              className="position-relative"
              style={{ opacity: removing === recipe.id ? 0.5 : 1 }}
            >
              <RecipeCard
                id={recipe.id}
                slug={recipe.slug}
                image={recipe.image}
                title={recipe.title}
                description={recipe.description}
                rating={recipe.rating}
                time={recipe.time}
                difficulty={recipe.difficulty}
              />
              {/* Remove from favorites button */}
              <div
                className="position-absolute top-0 end-0 p-2"
                style={{ direction: "ltr" }}
              >
                <button
                  className="btn btn-sm btn-outline-plum"
                  title="حذف از علاقه‌مندی‌ها"
                  disabled={removing === recipe.id}
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemove(recipe.id);
                  }}
                >
                  {removing === recipe.id ? "..." : "❌"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteRecipesSection;
