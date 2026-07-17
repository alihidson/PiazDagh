import { useState } from "react";
import authService from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

const AccountSettingsSection = () => {
  const { user, updateUser } = useAuth();

  // Account info state
  const [account, setAccount] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    email: user?.email || "",
  });

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Feedback
  const [infoMsg, setInfoMsg] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");
  const [infoLoading, setInfoLoading] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);

  const handleInfoChange = (e) => {
    setAccount((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    setInfoMsg("");
    setInfoLoading(true);
    try {
      const updated = await authService.updateProfile(account);
      updateUser(updated); // instantly update context → header reflects new data
      setInfoMsg("اطلاعات با موفقیت ذخیره شد.");
    } catch {
      setInfoMsg("خطا در ذخیره اطلاعات.");
    } finally {
      setInfoLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPwdMsg("");
    if (newPassword !== confirmNewPassword) {
      setPwdMsg("رمز عبور جدید و تکرار آن مطابقت ندارند.");
      return;
    }
    setPwdLoading(true);
    try {
      await authService.changePassword(currentPassword, newPassword);
      setPwdMsg("رمز عبور با موفقیت تغییر کرد.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch {
      setPwdMsg("خطا در تغییر رمز عبور.");
    } finally {
      setPwdLoading(false);
    }
  };

  return (
    <div>
      <h5 className="fw-bold text-mint mb-4">تنظیمات حساب</h5>

      {/* ---------- Account Info Form ---------- */}
      <h6 className="text-charcoal mb-3">ویرایش اطلاعات حساب</h6>
      {infoMsg && (
        <div
          className={`alert ${infoMsg.includes("موفقیت") ? "alert-success" : "alert-danger"} py-2 small`}
        >
          {infoMsg}
        </div>
      )}
      <form onSubmit={handleInfoSubmit} className="mb-5">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label text-charcoal">نام</label>
            <input
              type="text"
              name="firstName"
              className="form-control bg-white text-charcoal"
              value={account.firstName}
              onChange={handleInfoChange}
              style={{ borderColor: "rgba(68,69,68,0.15)" }}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label text-charcoal">نام خانوادگی</label>
            <input
              type="text"
              name="lastName"
              className="form-control bg-white text-charcoal"
              value={account.lastName}
              onChange={handleInfoChange}
              style={{ borderColor: "rgba(68,69,68,0.15)" }}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label text-charcoal">نام کاربری</label>
            <input
              type="text"
              name="username"
              className="form-control bg-white text-charcoal"
              value={account.username}
              onChange={handleInfoChange}
              style={{ borderColor: "rgba(68,69,68,0.15)" }}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label text-charcoal">ایمیل</label>
            <input
              type="email"
              name="email"
              className="form-control bg-white text-charcoal"
              value={account.email}
              onChange={handleInfoChange}
              style={{ borderColor: "rgba(68,69,68,0.15)" }}
            />
          </div>
        </div>
        <div className="text-start mt-4">
          <button
            type="submit"
            className="btn btn-saffron"
            disabled={infoLoading}
          >
            {infoLoading ? "در حال ذخیره..." : "ذخیره اطلاعات"}
          </button>
        </div>
      </form>

      {/* ---------- Password Form ---------- */}
      <h6 className="text-charcoal mb-3">تغییر رمز عبور</h6>
      {pwdMsg && (
        <div
          className={`alert ${pwdMsg.includes("موفقیت") ? "alert-success" : "alert-danger"} py-2 small`}
        >
          {pwdMsg}
        </div>
      )}
      <form onSubmit={handlePasswordSubmit}>
        <div className="row g-3">
          <div className="col-12">
            <label className="form-label text-charcoal">رمز عبور فعلی</label>
            <input
              type="password"
              className="form-control bg-white text-charcoal"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              style={{ borderColor: "rgba(68,69,68,0.15)" }}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label text-charcoal">رمز عبور جدید</label>
            <input
              type="password"
              className="form-control bg-white text-charcoal"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{ borderColor: "rgba(68,69,68,0.15)" }}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label text-charcoal">
              تکرار رمز عبور جدید
            </label>
            <input
              type="password"
              className="form-control bg-white text-charcoal"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
              style={{ borderColor: "rgba(68,69,68,0.15)" }}
            />
          </div>
        </div>
        <div className="text-start mt-4">
          <button
            type="submit"
            className="btn btn-saffron"
            disabled={pwdLoading}
          >
            {pwdLoading ? "در حال ذخیره..." : "تغییر رمز عبور"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettingsSection;
