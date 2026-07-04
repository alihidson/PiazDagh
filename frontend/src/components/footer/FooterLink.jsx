import { Link } from 'react-router-dom';

const FooterLink = ({ label, href }) => {
  const isExternal = href.startsWith('http');

  if (isExternal) {
    return (
      <li>
        <a
          href={href}
          className="footer-link opacity-80"
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      </li>
    );
  }

  return (
    <li>
      <Link to={href} className="footer-link opacity-80">
        {label}
      </Link>
    </li>
  );
};

export default FooterLink;