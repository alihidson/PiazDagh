import { Link } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({
  image,
  title,
  description,
  rating,
  time,
  difficulty,
  linkTo,
}) => {
  return (
    <div className="card recipe-card bg-canvas h-100 border-0">
      
      {/* Mint accent bar */}
      <div className="bg-mint" style={{ height: '4px' }}></div>

      {/* Image */}
      <img
        src={image}
        className="card-img-top rounded-0"
        alt={title}
        style={{ height: '180px', objectFit: 'cover' }}
      />

      {/* Card Body: Title + Description */}
      <div className="card-body pb-2">
        <h5 className="card-title fw-bold text-charcoal text-start">{title}</h5>
        <p className="card-text text-charcoal small text-start" style={{ opacity: 0.8 }}>
          {description}
        </p>
      </div>

      {/* Meta Row: Three Equal Columns (Rating · Time · Difficulty) */}
      <div className="border-top py-3 px-3" style={{ borderTopWidth: '1px', borderTopColor: 'rgba(68, 69, 68, 0.1)' }}>
        <div className="row text-center g-0">
          
          {/* Rating */}
          <div className="col-4 d-flex flex-column align-items-center">
            <div className="star-rating mb-1" style={{ fontSize: '0.9rem' }}>
              {'★'.repeat(Math.floor(rating))}
              {'☆'.repeat(5 - Math.floor(rating))}
            </div>
            <span className="text-charcoal small fw-bold">{rating}</span>
          </div>

          {/* Time */}
          <div className="col-4 d-flex flex-column align-items-center border-start border-end" style={{ borderColor: 'rgba(68, 69, 68, 0.1)' }}>
            <span className="mb-1" style={{ fontSize: '1.1rem' }}>⏱</span>
            <span className="text-charcoal small">{time} دقیقه</span>
          </div>

          {/* Difficulty */}
          <div className="col-4 d-flex flex-column align-items-center">
            <span className="mb-1" style={{ fontSize: '1.1rem' }}>👨‍🍳</span>
            <span className="text-plum small fw-medium">{difficulty}</span>
          </div>

        </div>
      </div>
      {/* CTA Button */}
      <div className="card-body pt-0 text-start">
        <Link to={linkTo} className="btn btn-outline-saffron w-100 text-center">
          مشاهده دستور
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;