const TipsSection = ({ tips }) => {
  if (!tips || tips.length === 0) return null;

  return (
    <div className="container px-4 pb-5">
      <div
        className="card border-0 shadow-sm"
        style={{
          backgroundColor: 'rgba(80, 173, 149, 0.08)',
          borderRight: '3px solid #e88427',   // appears on the right in RTL
        }}
      >
        <div className="card-body">
          <h5 className="fw-bold text-mint mb-3 text-start">💡 نکات مهم</h5>
          <ul className="list-unstyled mb-0">
            {tips.map((tip, index) => (
              <li key={index} className="text-charcoal mb-2 d-flex align-items-start gap-2">
                <span className="text-saffron">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TipsSection;