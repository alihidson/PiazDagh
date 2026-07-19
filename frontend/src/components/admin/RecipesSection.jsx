import { useState, useEffect } from "react";
import adminService from "../../services/adminService";
import apiClient from "../../services/apiClient";

const statusMap = {
  DRAFT: { label: "پیش‌نویس", className: "badge bg-secondary" },
  PUBLISHED: { label: "منتشر شده", className: "badge bg-mint" },
  REJECTED: { label: "رد شده", className: "badge bg-plum" },
};

const RecipesSection = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [total, setTotal] = useState(0);

  const fetchRecipes = async (url = null) => {
    setLoading(true);
    try {
      let res;
      if (url) {
        const response = await apiClient.get(url);
        res = response.data;
      } else {
        res = await adminService.getRecipes({ search, page_size: 10 });
      }
      setRecipes(res.results || res);
      setTotal(res.count || 0);
      setNextUrl(res.next);
      setPrevUrl(res.previous);
    } catch {
      setError("خطا در دریافت دستورها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [search]);

  const handleSearch = (e) => setSearch(e.target.value);

  const handleDelete = async (id) => {
    if (!window.confirm("آیا از حذف این دستور مطمئن هستید؟")) return;
    try {
      await adminService.deleteRecipe(id);
      fetchRecipes();
    } catch {
      alert("خطا در حذف دستور");
    }
  };

  const handleApprove = async (id) => {
    try {
      await adminService.approveRecipe(id);
      fetchRecipes();
    } catch {
      alert("خطا در تأیید دستور");
    }
  };

  const handleReject = async (id) => {
    try {
      await adminService.rejectRecipe(id);
      fetchRecipes();
    } catch {
      alert("خطا در رد دستور");
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold text-mint mb-0">دستورها</h4>
      </div>

      {/* Search */}
      <input
        type="text"
        className="form-control bg-white text-charcoal mb-3"
        placeholder="جستجوی دستور..."
        value={search}
        onChange={handleSearch}
        style={{ borderColor: "rgba(68,69,68,0.15)", maxWidth: "300px" }}
      />

      {/* Table */}
      <div className="card bg-canvas border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr
                  className="border-bottom border-charcoal"
                  style={{ opacity: 0.15 }}
                >
                  <th className="text-charcoal text-start p-3">عنوان</th>
                  <th className="text-charcoal text-start">نویسنده</th>
                  <th className="text-charcoal text-start">دسته‌بندی</th>
                  <th className="text-charcoal text-center">وضعیت</th>
                  <th className="text-charcoal text-center">تاریخ</th>
                  <th className="text-charcoal text-center">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {recipes.length === 0 && !loading ? (
                  <tr>
                    <td colSpan={6} className="text-center text-charcoal py-4">
                      هیچ دستوری یافت نشد.
                    </td>
                  </tr>
                ) : (
                  recipes.map((recipe) => (
                    <tr key={recipe.id}>
                      <td className="text-charcoal text-start p-3">
                        {recipe.title}
                      </td>
                      <td className="text-charcoal text-start">
                        {recipe.author?.username || "—"}
                      </td>
                      <td className="text-charcoal text-start">
                        {recipe.category?.name || "—"}
                      </td>
                      <td className="text-center">
                        <span
                          className={
                            statusMap[recipe.status]?.className ||
                            "badge bg-secondary"
                          }
                        >
                          {statusMap[recipe.status]?.label || recipe.status}
                        </span>
                      </td>
                      <td className="text-charcoal text-center small">
                        {new Date(recipe.created_at).toLocaleDateString(
                          "fa-IR",
                        )}
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-outline-plum"
                          title="حذف"
                          onClick={() => handleDelete(recipe.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="text-center py-3">
          <div
            className="spinner-border spinner-border-sm text-mint"
            role="status"
          />
        </div>
      )}

      {/* Pagination */}
      {total > 10 && (
        <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
          <button
            className="btn btn-sm btn-outline-mint"
            disabled={!prevUrl}
            onClick={() => fetchRecipes(prevUrl)}
          >
            قبلی
          </button>
          <span className="text-charcoal small">
            {total.toLocaleString()} دستور
          </span>
          <button
            className="btn btn-sm btn-outline-mint"
            disabled={!nextUrl}
            onClick={() => fetchRecipes(nextUrl)}
          >
            بعدی
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipesSection;
