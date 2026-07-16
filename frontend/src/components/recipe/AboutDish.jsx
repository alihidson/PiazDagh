const AboutDish = ({ paragraphs }) => {
  if (!paragraphs || paragraphs.length === 0) return null;

  return (
    <div className="container px-4 pb-4">
      <div className="card bg-canvas border-0 shadow-sm" style={{ backgroundColor: 'rgba(80, 173, 149, 0.06)' }}>
        <div className="card-body">
          {paragraphs.map((text, index) => (
            <p
              key={index}
              className="text-charcoal mb-2 text-start"
              style={{ lineHeight: '2.2', fontSize: '1rem', textAlign: 'justify' }}
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutDish;