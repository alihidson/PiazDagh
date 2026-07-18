import { useAuth } from "../../hooks/useAuth";

const AccountInfoSection = ({ onGoToSettings }) => {
  const { user } = useAuth();

  // Mock join date – this will eventually come from the user profile
  const joinDate = "تیر ۱۴۰۵";

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold text-mint mb-0">اطلاعات حساب</h5>
        <button
          className="btn btn-sm btn-link text-saffron p-0"
          onClick={onGoToSettings}
        >
          ویرایش اطلاعات
        </button>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label text-charcoal opacity-75 small">
            نام
          </label>
          <p className="text-charcoal fw-medium">{user?.firstName || "—"}</p>
        </div>
        <div className="col-md-6">
          <label className="form-label text-charcoal opacity-75 small">
            نام خانوادگی
          </label>
          <p className="text-charcoal fw-medium">{user?.lastName || "—"}</p>
        </div>
        <div className="col-md-6">
          <label className="form-label text-charcoal opacity-75 small">
            نام کاربری
          </label>
          <p className="text-charcoal fw-medium">{user?.username || "—"}</p>
        </div>
        <div className="col-md-6">
          <label className="form-label text-charcoal opacity-75 small">
            ایمیل
          </label>
          <p className="text-charcoal fw-medium">{user?.email || "—"}</p>
        </div>
        <div className="col-md-6">
          <label className="form-label text-charcoal opacity-75 small">
            تاریخ عضویت
          </label>
          <p className="text-charcoal fw-medium">{joinDate}</p>
        </div>
        <div className="col-12">
          <label className="form-label text-charcoal opacity-75 small">
            درباره من
          </label>
          <p className="text-charcoal fw-medium">{user?.bio || "—"}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountInfoSection;
