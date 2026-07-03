import { Link } from 'react-router-dom';

const NavItem = ({ label, href, hasDropdown, dropdownItems }) => {
  if (!hasDropdown) {
    return (
      <li className="nav-item">
        <Link className="nav-link text-charcoal" to={href}>
          {label}
        </Link>
      </li>
    );
  }

  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link text-charcoal dropdown-toggle"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
      >
        {label}
      </a>
      <ul className="dropdown-menu">
        {dropdownItems.map((item) => (
          <li key={item.id}>
            <Link className="dropdown-item" to={item.href}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default NavItem;