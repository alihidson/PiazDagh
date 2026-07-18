import { useAuth } from "../../hooks/useAuth";

const ProfileHeader = () => {
  const { user } = useAuth();

  // Mock data – later these will come from a user profile service
  const joinDate = "تیر ۱۴۰۵";
  const stats = {
    favorites: 12,
    recipes: 8,
  };

  return (
    <div className="text-center mb-5">
      {/* Avatar – always shows initial */}
      <div className="d-inline-block">
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
      </div>

      {/* Name */}
      <h3 className="fw-bold text-charcoal mt-3 mb-1">
        {user?.firstName && user?.lastName
          ? `${user.firstName} ${user.lastName}`
          : user?.username || "کاربر"}
      </h3>

      {/* Email */}
      <p className="text-charcoal opacity-75 mb-2">{user?.email || ""}</p>

      {user?.bio && (
        <p className="text-charcoal small opacity-75 mb-2">{user.bio}</p>
      )}

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
