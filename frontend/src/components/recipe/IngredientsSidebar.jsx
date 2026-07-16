const IngredientsSidebar = ({ ingredients }) => {
  return (
    <div
      className="card bg-canvas shadow-sm"
      style={{
        border: 'none',
        borderTop: '1px solid rgba(156, 113, 122, 0.25)',
        borderBottom: '1px solid rgba(156, 113, 122, 0.25)',
      }}
    >
      <div className="card-body">
        <h5 className="fw-bold text-mint mb-3 text-start">🥕 مواد اولیه</h5>
        <ul className="list-unstyled mb-0">
          {ingredients.map((ing, index) => (
            <li
              key={index}
              className="d-flex justify-content-between align-items-center py-2"
              style={{
                borderBottom:
                  index !== ingredients.length - 1
                    ? '1px solid rgba(68, 69, 68, 0.10)'
                    : 'none',
              }}
            >
              <label className="ingredients-checkbox d-flex align-items-center gap-2 text-charcoal flex-grow-1 m-0">
                <input type="checkbox" className="form-check-input m-0" />
                <span>{ing.name}</span>
              </label>
              <span
                className="text-charcoal"
                style={{ minWidth: '70px', textAlign: 'left' }}
              >
                {ing.amount} {ing.unit}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IngredientsSidebar;