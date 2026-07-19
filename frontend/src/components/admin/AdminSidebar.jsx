import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const tabs = [
  { key: "dashboard", label: "داشبورد", icon: "📊" },
  { key: "users", label: "کاربران", icon: "👥" },
  { key: "recipes", label: "دستورها", icon: "🍲" },
];

const AdminSidebar = ({ activeTab, onSelect }) => {
  const { logout } = useAuth();

  return (
    <div
      className="bg-charcoal text-canvas h-100 d-flex flex-column p-3"
      dir="rtl"
    >
      <div className="mb-4 text-center">
        <h5 className="fw-bold text-mint">پنل مدیریت</h5>
      </div>

      <nav className="nav flex-column flex-grow-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onSelect(tab.key)}
            className={`nav-link text-start btn btn-link text-decoration-none ${
              activeTab === tab.key
                ? "bg-mint text-white fw-bold"
                : "text-canvas"
            }`}
            style={{ borderRadius: "0.5rem", marginBottom: "0.25rem" }}
            data-bs-dismiss="offcanvas" // ← dismiss offcanvas on click (no effect on desktop)
          >
            <span className="me-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      <hr className="border-mint my-3" />

      <Link to="/" className="text-canvas text-decoration-none small">
        مشاهده سایت
      </Link>

      <button
        onClick={logout}
        className="btn btn-link text-decoration-none text-plum fw-bold text-start"
      >
        🚪 خروج
      </button>
    </div>
  );
};

export default AdminSidebar;
