import { Link } from 'react-router-dom';

const TopRowLink = ({ label, href, variant = 'secondary' }) => {
  const variantClasses = {
    secondary: 'text-charcoal text-decoration-none',   // #444544
    saffron: 'text-saffron text-decoration-none fw-bold', // #e88427
  };

  return (
    <Link to={href} className={variantClasses[variant] || variantClasses.secondary}>
      {label}
    </Link>
  );
};

export default TopRowLink;