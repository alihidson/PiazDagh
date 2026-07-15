import { Link } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = ({ image, name, subtitle, count, linkTo }) => {
  return (
    <Link to={linkTo} className="text-decoration-none">
      <div className="card category-card h-100">
        <img src={image} className="card-img-top" alt={name} />
        <div className="card-body text-start">
          <h5 className="category-name fw-bold mb-1">{name}</h5>
          {subtitle && <p className="category-subtitle text-charcoal mb-1">{subtitle}</p>}
          {count && <span className="category-count">{count} دستور پخت</span>}
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;