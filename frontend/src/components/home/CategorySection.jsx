import { categories } from '../../sample_data/categories';
import CategoryCard from '../cards/CategoryCard';
import "./Home.css";

const CategorySection = () => {
  return (
    <section className="container px-4 py-5">
      {/* Heading */}
      <div className="text-center text-lg-start mb-4">
        <h2 className="fw-bold text-charcoal section-heading">
          دسته‌بندی‌ها
        </h2>
      </div>

      {/* Grid: 2 on mobile, 4 on desktop */}
      <div className="row row-cols-2 row-cols-md-4 g-4 mt-1">
        {categories.map((cat) => (
          <div className="col" key={cat.id}>
            <CategoryCard
              image={cat.image}
              name={cat.name}
              subtitle={cat.subtitle}
              count={cat.count}
              linkTo={cat.linkTo}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;