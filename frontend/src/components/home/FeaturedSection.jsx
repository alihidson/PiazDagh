import RecipeCard from "../cards/RecipeCard";

const FeaturedSection = ({ recipes }) => {
  return (
    <section className="container px-4 py-5">
      <div className="text-center text-lg-start mb-4">
        <h2 className="fw-bold text-charcoal section-heading">
          دستور پخت‌های منتخب
        </h2>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        {recipes.map((recipe) => (
          <div className="col" key={recipe.id}>
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
