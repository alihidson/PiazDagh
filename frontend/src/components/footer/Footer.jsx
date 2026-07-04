import BrandColumn from './BrandColumn';
import LinkColumn from './LinkColumn';
import CopyrightBar from './CopyrightBar';
import { footerColumns } from './footerData';
import './Footer.css';

const Footer = () => {
  return (
    <footer style={{ borderTopWidth: '3px' }} dir="rtl">
      {/* ========== PART 1: Main Footer (Canvas Background) ========== */}
      <div className="bg-canvas pt-5 pb-4">
        <div className="container px-4">
          <div className="row g-4 mb-4">
            {/* Brand Column */}
            <BrandColumn />

            {/* Link Columns */}
            {footerColumns.map((column, index) => {
              // First column gets offset-lg-2, others don't
              const columnClasses =
                index === 0
                  ? 'col-6 col-md-4 col-lg-2 offset-lg-2'
                  : 'col-6 col-md-4 col-lg-2';

              return (
                <LinkColumn
                  key={column.id}
                  title={column.title}
                  links={column.links}
                  columnClasses={columnClasses}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* ========== PART 2: Copyright Bar ========== */}
      <CopyrightBar />
    </footer>
  );
};

export default Footer;