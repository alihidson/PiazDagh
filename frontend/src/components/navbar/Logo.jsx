import { Link } from "react-router-dom";
import logo from "../../assets/logo/PIAZDAGH-logo-main.png";

const Logo = ({ text_color = "text-dark" }) => {
  return (
    <Link
      to="/"
      className="d-flex align-items-center gap-4 text-decoration-none"
    >
      <img src={logo} alt="پیاز داغ" height="60" />
      <span className={`fw-bold fs-3 ${text_color}`}>پیاز داغ</span>
    </Link>
  );
};

export default Logo;
