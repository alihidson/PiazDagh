import React from "react";
import Logo from "../components/navbar/Logo";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
import heroImage from "../assets/images/hero-image-2.jpg";
import "../components/auth/LoginSignupPage.css";

const LoginSignupPage = () => {
  const [isLogin, setIsLogin] = React.useState(true);

  return (
    <section className="min-vh-100 d-flex align-items-center bg-canvas py-3 py-sm-4">
      <div className="container">
        <div className="row g-0 auth-card overflow-hidden rounded-4 mx-auto" style={{ maxWidth: "1000px" }}>
          {/* Left: Form */}
          <div className="col-12 col-md-7 d-flex flex-column justify-content-center px-3 px-sm-4 px-lg-5 py-4 py-md-5">
            <div className="mx-auto" style={{ maxWidth: "400px", width: "100%" }}>
              <div className="text-center mb-4">
                <Logo size="2x" />
              </div>
              {isLogin ? (
                <LoginForm onToggle={() => setIsLogin(false)} />
              ) : (
                <SignupForm onToggle={() => setIsLogin(true)} />
              )}
            </div>
          </div>

          {/* Right: Image with overlay */}
          <div className="col-md-5 d-none d-md-block p-0 position-relative">
            <img
              src={heroImage}
              alt="غذای خانگی"
              className="w-100 h-100"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <div className="auth-image-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-4">
              <p className="text-white fw-bold mb-0" style={{ fontSize: "1.1rem", textShadow: "0 2px 4px rgba(0,0,0,0.6)" }}>
                آشپزی از همین‌جا شروع می‌شه
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginSignupPage;