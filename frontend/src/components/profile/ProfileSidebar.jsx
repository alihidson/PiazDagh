import { useAuth } from '../../hooks/useAuth';

const sidebarItems = [
  { key: 'account-info', label: 'اطلاعات حساب', icon: '👤' },
  { key: 'my-recipes', label: 'دستورهای من', icon: '🍲' },
  { key: 'favorites', label: 'علاقه‌مندی‌ها', icon: '❤️' },
  { key: 'settings', label: 'تنظیمات حساب', icon: '⚙️' },
];

const ProfileSidebar = ({ activeSection, onSelect }) => {
  const { logout } = useAuth();

  return (
    <div className="card bg-canvas border-0 shadow-sm">
      <div className="card-body p-3">
        <nav className="nav flex-column">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              onClick={() => onSelect(item.key)}
              className={`nav-link text-start btn btn-link text-decoration-none ${
                activeSection === item.key
                  ? 'bg-mint text-white fw-bold'
                  : 'text-charcoal'
              }`}
              style={{ borderRadius: '0.5rem', marginBottom: '0.25rem' }}
            >
              <span className="me-2">{item.icon}</span>
              {item.label}
            </button>
          ))}
          <hr className="my-3" />
          <button
            onClick={logout}
            className="nav-link text-start btn btn-link text-decoration-none text-plum fw-bold"
          >
            🚪 خروج از حساب
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ProfileSidebar;