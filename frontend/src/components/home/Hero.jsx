import heroImage from '../../assets/images/hero-image-2.jpg';

const Hero = () => {
  return (
    <div className="container col-xxl-8 px-4 py-5">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        
        {/* Image Column */}
        <div className="col-10 col-sm-8 col-lg-6 mx-auto">
          <img
            src={heroImage}
            className="d-block mx-lg-auto img-fluid rounded-4"
            alt="غذای ایرانی"
            width="700"
            height="500"
            loading="lazy"
          />
        </div>

        {/* Text Column */}
        <div className="col-lg-6 text-center text-lg-start">
            <h1 className="display-5 fw-bold lh-1 mb-3 text-charcoal">
                آشپزی آسان، طعمی بی‌نظیر
            </h1>
            <p className="lead text-charcoal mb-4" style={{ opacity: 0.8 }}>
                از مبتدی تا حرفه‌ای، هر روز یه دستور جدید و ساده برای آشپزی خونه‌تون
            </p>
            {/* Change justify-content-md-end to justify-content-md-start */}
            <div className="d-grid gap-2 d-lg-flex justify-content-lg-start justify-content-center">                <button type="button" className="btn btn-saffron btn-lg px-4">
                ارسال دستور شما
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;