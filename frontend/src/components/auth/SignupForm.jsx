import React from "react";
import FormField from "./FormField";

const SignupForm = ({ onToggle }) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle signup
  };

  return (
    <form onSubmit={handleSubmit} className="w-100">
      <h3 className="fw-extrabold mb-1 text-charcoal">ثبت نام</h3>
      <p className="text-muted small mb-4">به خانواده پیازداغ بپیوندید ✨</p>

      <FormField
        id="signupName"
        label="نام کامل"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="نام و نام خانوادگی"
        floating
        labelIcon="person"
      />

      <FormField
        id="signupEmail"
        label="ایمیل"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        floating
        labelIcon="envelope"
      />

      <FormField
        id="signupPassword"
        label="رمز عبور"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="رمز عبور"
        floating
        labelIcon="lock"
      />

      <FormField
        id="signupConfirmPassword"
        label="تکرار رمز عبور"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="تکرار رمز عبور"
        floating
        labelIcon="lock"
      />

      <div className="pt-1 mb-3">
        <button type="submit" className="btn btn-saffron w-100 fw-bold btn-auth">
          ثبت نام
        </button>
      </div>

      <p className="mb-0">
        حساب کاربری دارید؟{" "}
        <button
          type="button"
          className="btn btn-link text-mint fw-bold p-0 border-0 align-baseline link-register"
          onClick={onToggle}
        >
          وارد شوید
        </button>
      </p>
    </form>
  );
};

export default SignupForm;