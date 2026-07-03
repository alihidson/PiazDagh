import logo from '../../assets/logo/PIAZDAGH-logo-main.png';

const Logo = () => {
  return (
    <div className="d-flex align-items-center gap-4">
      <img src={logo} alt="پیاز داغ" height="60" />
      <span className="fw-bold text-dark fs-3">پیاز داغ</span>
    </div>
  );
};

export default Logo;