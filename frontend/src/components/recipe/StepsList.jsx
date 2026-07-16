const StepsList = ({ steps }) => {
  return (
    <div className="card bg-canvas shadow-sm" style={{ border: '1px solid rgba(156, 113, 122, 0.25)' }}>
      <div className="card-body">
        <h5 className="fw-bold text-mint mb-4 text-start">👨‍🍳 طرز تهیه</h5>
        {steps.map((step) => (
          <div key={step.order} className="d-flex gap-3 mb-4">
            <div
              className="rounded-circle bg-saffron d-flex align-items-center justify-content-center flex-shrink-0"
              style={{ width: '32px', height: '32px', color: '#e6ebe3', fontWeight: 'bold', fontSize: '0.9rem' }}
            >
              {step.order}
            </div>
            <p className="text-charcoal mb-0 text-start" style={{ lineHeight: '1.8' }}>
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepsList;