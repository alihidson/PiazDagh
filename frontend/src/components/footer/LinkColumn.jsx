import FooterLink from './FooterLink';

const LinkColumn = ({ title, links, columnClasses = '' }) => {
  return (
    <div className={columnClasses}>
      <h6 className="text-saffron fw-bold small text-uppercase mb-3">{title}</h6>
      <ul className="list-unstyled d-flex flex-column gap-2 small">
        {links.map((link) => (
          <FooterLink key={link.id} label={link.label} href={link.href} />
        ))}
      </ul>
    </div>
  );
};

export default LinkColumn;