import { topRowLinks, navLinks } from "./navData";
import TopRowLink from "./TopRowLink";
import NavItem from "./NavItem";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav
      className="navbar navbar-expand-lg bg-canvas py-0 border-bottom border-mint"
      dir="rtl"
    >
      <div className="container-fluid d-flex flex-column px-4">
        {/* Row 1: Logo + Actions */}
        <div className="position-relative d-flex align-items-center justify-content-between py-3 w-100 border-bottom border-mint">
          <div className="d-flex align-items-center w-100 w-lg-auto justify-content-center justify-content-lg-start gap-2">
            <Logo />
          </div>

          <div className="d-flex align-items-center">
            <div className="d-none d-lg-flex align-items-center gap-4 small fw-semibold">
              {/* Always show these links (newsletter, etc.) */}
              {topRowLinks.map((link) => (
                <TopRowLink
                  key={link.id}
                  label={link.label}
                  href={link.href}
                  variant={link.variant}
                />
              ))}

              {/* Auth-aware section */}
              {isAuthenticated ? (
                <>
                  <Link to="/new-recipe" className="btn btn-sm btn-saffron px-3 py-1">ثبت دستور</Link>
                  <Link
                    to="/profile"
                    className="text-charcoal text-decoration-none d-flex align-items-center gap-1"
                  >
                    <span
                      className="rounded-circle bg-mint d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: "28px",
                        height: "28px",
                        color: "#e6ebe3",
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                      }}
                    >
                      {(user?.username || "م")[0].toUpperCase()}
                    </span>
                    <span>{user?.username}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="btn btn-sm btn-outline-mint px-3 py-1"
                    style={{ fontSize: "0.8rem" }}
                  >
                    خروج
                  </button>
                </>
              ) : (
                <TopRowLink label="ورود" href="/auth" variant="saffron" />
              )}
            </div>

            <button
              className="navbar-toggler border-0 position-absolute start-0 top-50 translate-middle-y"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>

        {/* Row 2: Collapsible Menu + Desktop Search */}
        <div className="collapse navbar-collapse w-100" id="navbarNav">
          <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center justify-content-lg-between w-100 py-3 py-lg-2">
            {/* Mobile-only duplicate action links */}
            <div className="d-lg-none d-flex flex-column gap-2 mb-3 small fw-semibold">
              {topRowLinks.map((link) => (
                <TopRowLink
                  key={link.id}
                  label={link.label}
                  href={link.href}
                  variant={link.variant}
                />
              ))}
              {/* Mobile auth-aware section */}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="text-charcoal text-decoration-none d-flex align-items-center gap-1"
                  >
                    <span
                      className="rounded-circle bg-mint d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: "28px",
                        height: "28px",
                        color: "#e6ebe3",
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                      }}
                    >
                      {(user?.username || "م")[0].toUpperCase()}
                    </span>
                    <span>{user?.username}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="btn btn-sm btn-outline-mint px-2 py-0 align-self-start"
                    style={{ fontSize: "0.8rem" }}
                  >
                    خروج
                  </button>
                </>
              ) : (
                <TopRowLink label="ورود" href="/auth" variant="secondary" />
              )}
              <hr className="my-2 border-charcoal" />
            </div>

            <ul className="navbar-nav mb-3 mb-lg-0 flex-column flex-lg-row gap-3 gap-lg-4 small fw-medium p-0">
              {navLinks.map((link) => (
                <NavItem
                  key={link.id}
                  label={link.label}
                  href={link.href}
                  hasDropdown={link.hasDropdown}
                  dropdownItems={link.dropdownItems}
                />
              ))}
            </ul>

            <div
              className="d-none d-lg-block mt-2 mt-lg-0"
              style={{ maxWidth: "350px", width: "100%" }}
            >
              <SearchBar placeholder='جستجوی "پاستا"...' />
            </div>
          </div>
        </div>

        {/* Row 3: Mobile Search */}
        <div className="d-block d-lg-none w-100 pb-3 pt-1">
          <SearchBar placeholder='جستجوی "پاستا"...' />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
