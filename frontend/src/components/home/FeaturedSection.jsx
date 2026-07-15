import { featuredRecipes } from '../../sample_data/featuredRecipes';
import RecipeCard from '../cards/RecipeCard';
import "./Home.css";

const FeaturedSection = () => {
  return (
    <section className="container px-4 py-5">
      {/* Section Heading */}
      <div className="text-center text-lg-start mb-5">
        <h2 className="fw-bold text-charcoal section-heading">
          دستور پخت‌های منتخب
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 bg-saffron-subtle p-4 rounded-3">
        {featuredRecipes.map((recipe) => (
          <div className="col" key={recipe.id}>
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

export default FeaturedSection;