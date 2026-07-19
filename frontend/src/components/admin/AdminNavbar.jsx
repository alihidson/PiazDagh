import { Link } from "react-router-dom";

const AdminNavbar = ({ user }) => {
  return (
    <nav
      className="bg-charcoal text-canvas px-4 py-2 d-flex justify-content-between align-items-center"
      dir="rtl"
    >
      <div className="d-flex align-items-center gap-2">
        {/* Hamburger button – visible only on small screens */}
        <button
          className="btn btn-link text-canvas d-lg-none p-0 me-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#adminSidebarOffcanvas"
          aria-controls="adminSidebarOffcanvas"
        >
          <span
            className="navbar-toggler-icon"
            style={{ filter: "invert(1)" }}
          ></span>
        </button>

        <span className="fw-bold">پنل مدیریت پیاز داغ</span>
        <span className="badge bg-mint">ادمین</span>
      </div>
      <div className="d-flex align-items-center gap-3">
        <div className="d-flex align-items-center gap-2">
          <div
            className="rounded-circle bg-mint d-flex align-items-center justify-content-center"
            style={{
              width: "32px",
              height: "32px",
              fontSize: "0.9rem",
              color: "#e6ebe3",
            }}
          >
            {(user?.username || "ا")[0].toUpperCase()}
          </div>
          <span className="small">{user?.username}</span>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
