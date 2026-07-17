import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import AccountInfoSection from "../components/profile/AccountInfoSection";
import MyRecipesSection from "../components/profile/MyRecipesSection";
import FavoriteRecipesSection from "../components/profile/FavoriteRecipesSection";
import AccountSettingsSection from "../components/profile/AccountSettingsSection";

const tabs = [
  { key: "account-info", label: "اطلاعات حساب" },
  { key: "my-recipes", label: "دستورهای من" },
  { key: "favorites", label: "علاقه‌مندی‌ها" },
  { key: "settings", label: "تنظیمات" },
];

const ProfilePage = () => {
  const { isAuthenticated, loading } = useAuth();
  const [activeSection, setActiveSection] = useState("account-info");

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-mint" role="status">
          <span className="visually-hidden">در حال بارگذاری...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="container py-5">
      <ProfileHeader />

      {/* Horizontal tabs – visible below lg */}
      <div className="d-lg-none mb-4">
        <div
          className="nav nav-pills flex-row flex-nowrap overflow-auto"
          style={{ gap: "0.5rem" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveSection(tab.key)}
              className={`nav-link text-nowrap ${
                activeSection === tab.key
                  ? "bg-mint text-white fw-bold"
                  : "text-charcoal"
              }`}
              style={{
                borderRadius: "2rem",
                fontSize: "0.85rem",
                whiteSpace: "nowrap",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="row g-4">
        {/* Vertical sidebar – visible on lg and above */}
        <div className="col-lg-3 d-none d-lg-block order-lg-0">
          <ProfileSidebar
            activeSection={activeSection}
            onSelect={setActiveSection}
          />
        </div>

        {/* Content */}
        <div className="col-lg-9 order-lg-1">
          <div className="card bg-canvas border-0 shadow-sm">
            <div className="card-body p-4">
              {activeSection === "account-info" && (
                <AccountInfoSection
                  onGoToSettings={() => setActiveSection("settings")}
                />
              )}
              {activeSection === "my-recipes" && <MyRecipesSection />}
              {activeSection === "favorites" && <FavoriteRecipesSection />}
              {activeSection === "settings" && <AccountSettingsSection />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
