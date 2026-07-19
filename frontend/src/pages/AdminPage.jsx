import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";
import DashboardSection from "../components/admin/DashboardSection";
import UsersSection from "../components/admin/UsersSection";
import RecipesSection from "../components/admin/RecipesSection";

const AdminPage = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-mint" role="status" />
      </div>
    );
  }

  if (!isAuthenticated || !user?.isStaff) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-canvas">
      <AdminNavbar user={user} />

      <div className="d-flex flex-grow-1">
        {/* Sidebar – visible only on large screens */}
        <div
          className="d-none d-lg-block order-lg-0"
          style={{ width: "260px", flexShrink: 0 }}
        >
          <AdminSidebar activeTab={activeTab} onSelect={setActiveTab} />
        </div>

        {/* Main content */}
        <div className="flex-grow-1 p-4" style={{ overflowY: "auto" }}>
          {activeTab === "dashboard" && <DashboardSection />}
          {activeTab === "users" && <UsersSection />}
          {activeTab === "recipes" && <RecipesSection />}
        </div>
      </div>

      {/* Offcanvas sidebar for small screens */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="adminSidebarOffcanvas"
        aria-labelledby="adminSidebarOffcanvasLabel"
        dir="rtl"
      >
        <div className="offcanvas-header">
          <h5
            className="offcanvas-title fw-bold text-mint"
            id="adminSidebarOffcanvasLabel"
          >
            پنل مدیریت
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body p-0">
          <AdminSidebar activeTab={activeTab} onSelect={setActiveTab} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
