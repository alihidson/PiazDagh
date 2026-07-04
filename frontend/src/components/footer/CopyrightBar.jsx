import { Link } from 'react-router-dom';
import { copyrightLinks } from './footerData';

const CopyrightBar = () => {
  return (
    <div className="bg-mint py-3">
      <div className="container px-4">
        <div
          className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 small"
          style={{ fontSize: '0.8rem' }}
        >
          <span className="text-charcoal fw-medium">
            © ۲۰۲۶ پیاز داغ. تمامی حقوق مادی و معنوی محفوظ است.
          </span>
          <div className="d-flex gap-3 text-charcoal">
            {copyrightLinks.map((link, index) => (
              <span key={link.id} className="d-flex gap-3">
                {index > 0 && <span>|</span>}
                <Link
                  to={link.href}
                  className="text-decoration-none text-charcoal opacity-90"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyrightBar;