import React from "react";
import FormField from "./FormField";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SignupForm = ({ onToggle }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 1. Required fields
    if (!username.trim() || !email.trim() || !password || !confirmPassword) {
      setError("لطفاً همه فیلدهای ضروری را پر کنید.");
      return;
    }

    // 2. Password length
    if (password.length < 8) {
      setError("رمز عبور باید حداقل ۸ کاراکتر باشد.");
      return;
    }

    // 3. Password confirmation
    if (password !== confirmPassword) {
      setError("رمز عبور و تکرار آن مطابقت ندارند.");
      return;
    }

    setLoading(true);
    try {
      const user = await signup(
        username,
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
      );
      if (user.isStaff) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("خطا در ثبت نام. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-100">
      <h3 className="fw-extrabold mb-1 text-charcoal">ثبت نام</h3>
      <p className="text-muted small mb-4">به خانواده پیازداغ بپیوندید ✨</p>

      {/* First & Last name in one row */}
      <div className="row g-2 mb-3">
        <div className="col-6">
          <FormField
            id="signupFirstName"
            label="نام"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="نام"
            floating
          />
        </div>
        <div className="col-6">
          <FormField
            id="signupLastName"
            label="نام خانوادگی"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="نام خانوادگی"
            floating
          />
        </div>
      </div>

      <FormField
        id="signupUsername"
        label="نام کاربری"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="نام کاربری"
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

      {error && <div className="alert alert-danger py-2 small">{error}</div>}

      <div className="pt-1 mb-3">
        <button
          type="submit"
          className="btn btn-saffron w-100 fw-bold btn-auth"
          disabled={loading}
        >
          {loading ? "در حال ثبت نام..." : "ثبت نام"}
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
