import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import recipeService from '../services/recipeService';
import RecipeHero from '../components/recipe/RecipeHero';
import IngredientsSidebar from '../components/recipe/IngredientsSidebar';
import StepsList from '../components/recipe/StepsList';
import TipsSection from '../components/recipe/TipsSection';
import AboutDish from '../components/recipe/AboutDish'
import CommentSection from '../components/recipe/CommentSection';


const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadRecipe() {
      try {
        const data = await recipeService.getRecipe(id);
        setRecipe(data);
      } catch (err) {
        setError(err.message || 'خطا در بارگذاری دستور');
      } finally {
        setLoading(false);
      }
    }
    loadRecipe();
  }, [id]);

  const [comments, setComments] = useState([]);
  useEffect(() => {
    async function loadComments() {
      const data = await recipeService.getComments(id);
      setComments(data);
    }
    loadComments();
  }, [id]);

  const handleAddComment = async (text) => {
    const newComment = await recipeService.addComment(id, text);
    setComments((prev) => [newComment, ...prev]);
  };

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-mint" role="status">
          <span className="visually-hidden">در حال بارگذاری...</span>
        </div>
        <p className="mt-3 text-charcoal">در حال بارگذاری دستور...</p>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="container text-center py-5">
        <h2 className="text-charcoal mb-3">خطا</h2>
        <p className="text-charcoal">{error || 'دستور مورد نظر یافت نشد.'}</p>
      </div>
    );
  }

  return (
    <>
      <RecipeHero recipe={recipe} />

      {/* Favorite Button */}
      <div className="container px-4 pb-4 text-center">
        <button className="btn btn-outline-plum px-4">
          ❤️ ذخیره دستور
        </button>
      </div>

      <AboutDish paragraphs={recipe.longDescription} />

      <div className="container px-4 pb-5">
        <div className="row g-4">
            {/* Ingredients (right side on desktop, top on mobile) */}
            <div className="col-md-4 order-md-0">
                <div style={{ position: 'sticky', top: '20px' }}>
                    <IngredientsSidebar ingredients={recipe.ingredients} />
                </div>
                </div>

                {/* Steps (left side on desktop, bottom on mobile) */}
                <div className="col-md-8 order-md-1">
                  <StepsList steps={recipe.steps} />
                </div>
            </div>
        </div>
        
        <TipsSection tips={recipe.tips} />
        <CommentSection comments={comments} onAddComment={handleAddComment} />
    </>
  );
};

export default RecipePage;