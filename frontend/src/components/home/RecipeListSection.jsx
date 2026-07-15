import { Link } from 'react-router-dom';
import RecipeCard from '../cards/RecipeCard';
import "./Home.css";

const RecipeListSection = ({ title, recipes, linkTo, maxDisplay = 4 }) => {
  const displayedRecipes = recipes.slice(0, maxDisplay);

  return (
    <section className="container px-4 py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-charcoal section-heading mb-0">{title}</h2>
        <Link to={linkTo} className="btn btn-outline-saffron">
          بیشتر
        </Link>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 mt-1">
        {displayedRecipes.map((recipe, index) => (
          <div
            className={`col ${maxDisplay === 4 && index === 3 ? 'd-none d-sm-block' : ''}`}
            key={recipe.id}
          >
            <RecipeCard
              image={recipe.image}
              title={recipe.title}
              description={recipe.description}
              rating={recipe.rating}
              time={recipe.time}
              difficulty={recipe.difficulty}
              linkTo={recipe.linkTo}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecipeListSection;