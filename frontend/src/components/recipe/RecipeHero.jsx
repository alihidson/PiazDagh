const RecipeHero = ({ recipe }) => {
  const { image, title, description, rating, cookTime, difficulty, servings, views } = recipe;

  return (
    <div className="container px-4 py-4">
      {/* Large image */}
      <div className="text-center mb-4">
        <img
          src={image}
          alt={title}
          className="img-fluid rounded-4"
          style={{ maxHeight: '500px', width: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Title, rating, description - all centered */}
      <div className="text-center mb-4">
        <h1 className="fw-bold text-charcoal mb-2" style={{ fontSize: '2.5rem' }}>
          {title}
        </h1>

        {/* Rating */}
        <div className="star-rating mb-2" style={{ fontSize: '1.2rem' }}>
          {'★'.repeat(Math.floor(rating))}
          {'☆'.repeat(5 - Math.floor(rating))}
          <span className="text-charcoal ms-2">{rating}</span>
        </div>

        <p className="text-charcoal lead" style={{ maxWidth: '600px', margin: '0 auto', opacity: 0.85 }}>
          {description}
        </p>
      </div>

      {/* Metadata row – centered with max-width */}
      <div className="d-flex justify-content-center">
        <div
          className="row text-center rounded-3 py-3 px-2 w-100 bg-saffron-subtle g-2"
          style={{ maxWidth: '600px' }}
        >
          {/* Time */}
          <div className="col-6 col-md-3 d-flex flex-column align-items-center gap-1">
            <span className="text-plum" style={{ fontSize: '1.5rem' }}>⏱</span>
            <span className="text-charcoal fw-bold">{cookTime} دقیقه</span>
          </div>

          {/* Difficulty */}
          <div className="col-6 col-md-3 d-flex flex-column align-items-center gap-1">
            <span className="text-plum" style={{ fontSize: '1.5rem' }}>👨‍🍳</span>
            <span className="text-charcoal fw-bold">{difficulty}</span>
          </div>

          {/* Servings */}
          <div className="col-6 col-md-3 d-flex flex-column align-items-center gap-1">
            <span className="text-plum" style={{ fontSize: '1.5rem' }}>🍽</span>
            <span className="text-charcoal fw-bold">{servings} نفر</span>
          </div>

          {/* Views */}
          <div className="col-6 col-md-3 d-flex flex-column align-items-center gap-1">
            <span className="text-plum" style={{ fontSize: '1.5rem' }}>👁</span>
            <span className="text-charcoal fw-bold">{views.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeHero;