import Logo from '../navbar/Logo';

const BrandColumn = () => {
  return (
    <div className="col-12 col-lg-4 mb-4 mb-lg-0">
      <div className="d-flex align-items-center gap-2 mb-3">
        <Logo text_color="text-charcoal" />
      </div>
      <p className="small text-charcoal lh-lg" style={{ opacity: 0.8 }}>
        پیاز داغ، دستیار دیجیتال شما در آشپزخانه. گلچینی از بهترین و معتبرترین
        دستورالعمل‌های پخت اصیل ایرانی و بین‌المللی برای کسانی که به طعم و کیفیت
        غذا اهمیت می‌دهند.
      </p>
    </div>
  );
};

export default BrandColumn;