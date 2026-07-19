import { useState, useEffect } from "react";
import adminService from "../../services/adminService";

const DashboardSection = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await adminService.getDashboard();
        setStats(data);
      } catch {
        setError("خطا در دریافت اطلاعات داشبورد");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-mint" role="status" />
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  const statCards = [
    {
      label: "کل کاربران",
      value: stats.users?.total,
      icon: "👥",
      color: "text-mint",
    },
    {
      label: "کاربران فعال",
      value: stats.users?.active,
      icon: "✅",
      color: "text-saffron",
    },
    {
      label: "ادمین‌ها",
      value: stats.users?.staff,
      icon: "🛡️",
      color: "text-plum",
    },
    {
      label: "کل دستورها",
      value: stats.recipes?.total,
      icon: "🍲",
      color: "text-mint",
    },
    {
      label: "دستورهای در انتظار",
      value: stats.recipes?.pending,
      icon: "⏳",
      color: "text-saffron",
    },
    {
      label: "دستورهای منتشر شده",
      value: stats.recipes?.published,
      icon: "📋",
      color: "text-mint",
    },
    {
      label: "دسته‌بندی‌ها",
      value: stats.categories,
      icon: "📂",
      color: "text-plum",
    },
  ];

  return (
    <div>
      <h4 className="fw-bold text-mint mb-4">داشبورد</h4>

      <div className="row g-3 mb-5">
        {statCards.map((card, idx) => (
          <div className="col-6 col-md-4 col-lg-3" key={idx}>
            <div className="card bg-canvas border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <div
                  className={`${card.color} mb-2`}
                  style={{ fontSize: "2rem" }}
                >
                  {card.icon}
                </div>
                <div
                  className="fw-bold text-charcoal"
                  style={{ fontSize: "1.5rem" }}
                >
                  {card.value ?? 0}
                </div>
                <div className="text-charcoal small opacity-75">
                  {card.label}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {stats.popular_recipes?.length > 0 && (
        <div>
          <h5 className="fw-bold text-mint mb-3">دستورهای محبوب</h5>
          <div className="card bg-canvas border-0 shadow-sm">
            <div className="card-body">
              <table className="table table-borderless align-middle mb-0">
                <thead>
                  <tr
                    className="border-bottom border-charcoal"
                    style={{ opacity: 0.2 }}
                  >
                    <th className="text-charcoal text-start">نام دستور</th>
                    <th className="text-charcoal text-center">امتیاز</th>
                    <th className="text-charcoal text-center">بازدید</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.popular_recipes.map((recipe, idx) => (
                    <tr key={idx}>
                      <td className="text-charcoal text-start">
                        {recipe.title}
                      </td>
                      <td className="text-charcoal text-center">
                        {recipe.average_rating ?? recipe.rating}
                      </td>
                      <td className="text-charcoal text-center">
                        {recipe.views}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardSection;
