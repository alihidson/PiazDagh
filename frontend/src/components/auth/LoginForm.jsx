import React from "react";
import FormField from "./FormField";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";


const LoginForm = ({ onToggle }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/"); // or go to the page they came from
    } catch (err) {
      setError("ایمیل یا رمز عبور اشتباه است.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-100">
      <h3 className="fw-extrabold mb-1 text-charcoal">ورود</h3>
      <p className="text-muted small mb-4">خوشحالیم دوباره می‌بینیمت 🌿</p>

      {error && <div className="alert alert-danger py-2 small">{error}</div>}    

      <FormField
        id="loginEmail"
        label="ایمیل"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        floating
        labelIcon="envelope"
      />

      <FormField
        id="loginPassword"
        label="رمز عبور"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="رمز عبور"
        floating
        labelIcon="lock"
      />

      <div className="pt-1 mb-3">
        <button type="submit" className="btn btn-saffron w-100 fw-bold btn-auth" disabled={loading}>
          {loading ? "در حال ورود..." : "ورود"}
        </button>
      </div>

      <p className="small mb-3">
        <Link to="#" className="text-muted text-decoration-none link-muted-hover">
          رمز عبور را فراموش کرده‌اید؟
        </Link>
      </p>

      <p className="mb-0">
        حساب کاربری ندارید؟{" "}
        <button
          type="button"
          className="btn btn-link text-mint fw-bold p-0 border-0 align-baseline link-register"
          onClick={onToggle}
        >
          ثبت نام کنید
        </button>
      </p>
    </form>
  );
};

export default LoginForm;