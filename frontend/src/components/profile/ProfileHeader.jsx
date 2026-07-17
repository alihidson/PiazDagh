import { useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import authService from "../../services/authService";

const ProfileHeader = () => {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  // Mock data – later these will come from a user profile service
  const joinDate = "تیر ۱۴۰۵";
  const stats = {
    favorites: 12,
    recipes: 8,
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await authService.uploadAvatar(file);
      updateUser({ avatar: result.avatar });
    } catch {
      alert("خطا در آپلود تصویر");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="text-center mb-5">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "none" }}
      />

      {/* Avatar */}
      <div className="d-inline-block position-relative">
        {uploading ? (
          <div
            className="rounded-circle bg-mint d-flex align-items-center justify-content-center mx-auto"
            style={{ width: "100px", height: "100px" }}
          >
            <div
              className="spinner-border text-white spinner-border-sm"
              role="status"
            >
              <span className="visually-hidden">در حال آپلود...</span>
            </div>
          </div>
        ) : user?.avatar ? (
          <img
            src={user.avatar}
            alt="تصویر پروفایل"
            className="rounded-circle"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        ) : (
          <div
            className="rounded-circle bg-mint d-flex align-items-center justify-content-center mx-auto"
            style={{
              width: "100px",
              height: "100px",
              fontSize: "2.5rem",
              color: "#e6ebe3",
            }}
          >
            {(user?.username || "ک")[0].toUpperCase()}
          </div>
        )}
        <button
          onClick={handleAvatarClick}
          className="btn btn-sm btn-saffron rounded-circle position-absolute"
          style={{
            bottom: "0",
            right: "0",
            width: "32px",
            height: "32px",
            padding: "0",
          }}
          title="تغییر تصویر"
          disabled={uploading}
        >
          📷
        </button>
      </div>

      {/* Name */}
      <h3 className="fw-bold text-charcoal mt-3 mb-1">
        {user?.firstName && user?.lastName
          ? `${user.firstName} ${user.lastName}`
          : user?.username || "کاربر"}
      </h3>

      {/* Email */}
      <p className="text-charcoal opacity-75 mb-2">{user?.email || ""}</p>

      {/* Join date */}
      <p className="text-charcoal small opacity-50 mb-3">
        عضویت از: {joinDate}
      </p>

      {/* Stats */}
      <div className="d-flex justify-content-center gap-4">
        <span className="text-charcoal">❤️ {stats.favorites} علاقه‌مندی</span>
        <span className="text-charcoal">🍲 {stats.recipes} دستور پخت</span>
      </div>
    </div>
  );
};

export default ProfileHeader;
