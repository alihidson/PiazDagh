import React from "react";
import { Link } from "react-router-dom";
import FormField from "./FormField";

const LoginForm = ({ onToggle }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle login
  };

  return (
    <form onSubmit={handleSubmit} className="w-100">
      <h3 className="fw-extrabold mb-1 text-charcoal">ورود</h3>
      <p className="text-muted small mb-4">خوشحالیم دوباره می‌بینیمت 🌿</p>

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
        <button type="submit" className="btn btn-saffron w-100 fw-bold btn-auth">
          ورود
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