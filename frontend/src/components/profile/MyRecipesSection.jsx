import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../cards/RecipeCard";
import recipeService from "../../services/recipeService";

const MyRecipesSection = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null); // track which card is being deleted
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      const data = await recipeService.getMyRecipes();
      setRecipes(data);
      setLoading(false);
    }
    fetch();
  }, []);

  const handleDelete = async (recipeId) => {
    if (!window.confirm("آیا از حذف این دستور مطمئن هستید؟")) return;

    setDeleting(recipeId);
    try {
      await recipeService.deleteRecipe(recipeId);
      setRecipes((prev) => prev.filter((r) => r.id !== recipeId));
    } catch {
      alert("خطا در حذف دستور");
    } finally {
      setDeleting(null);
    }
  };

  const handleEdit = (recipeId) => {
    // Placeholder – navigate to edit page when ready
    navigate(`/edit-recipe/${recipeId}`);
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
        <p className="text-charcoal">شما هنوز دستوری ثبت نکرده‌اید.</p>
      </div>
    );
  }

  return (
    <div>
      <h5 className="fw-bold text-mint mb-4">دستورهای من</h5>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        {recipes.map((recipe) => (
          <div className="col" key={recipe.id}>
            <div
              className="position-relative"
              style={{ opacity: deleting === recipe.id ? 0.5 : 1 }}
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
              {/* Action buttons overlay */}
              <div
                className="position-absolute top-0 end-0 p-2 d-flex gap-1"
                style={{ direction: "ltr" }}
              >
                <button
                  className="btn btn-sm btn-outline-mint"
                  title="ویرایش"
                  disabled={deleting === recipe.id}
                  onClick={(e) => {
                    e.preventDefault();
                    handleEdit(recipe.id);
                  }}
                >
                  ✏️
                </button>
                <button
                  className="btn btn-sm btn-outline-plum"
                  title="حذف"
                  disabled={deleting === recipe.id}
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(recipe.id);
                  }}
                >
                  {deleting === recipe.id ? "..." : "🗑️"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRecipesSection;
