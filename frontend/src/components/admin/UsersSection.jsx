import { useState, useEffect } from "react";
import adminService from "../../services/adminService";
import apiClient from "../../services/apiClient";

const emptyForm = {
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  password: "",
  is_active: true,
  is_staff: false,
};

const UsersSection = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [total, setTotal] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchUsers = async (url = null) => {
    setLoading(true);
    try {
      let res;
      if (url) {
        const response = await apiClient.get(url);
        res = response.data;
      } else {
        res = await adminService.getUsers({ search, page_size: 10 });
      }
      setUsers(res.results || res);
      setTotal(res.count || 0);
      setNextUrl(res.next);
      setPrevUrl(res.previous);
    } catch {
      setError("خطا در دریافت کاربران");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const handleSearch = (e) => setSearch(e.target.value);

  const handleAdd = () => {
    setEditingUser(null);
    setForm(emptyForm);
    setFormError("");
    setShowModal(true);
  };

  const handleEdit = async (userId) => {
    try {
      const user = await adminService.getUser(userId);
      setEditingUser(user);
      setForm({
        username: user.username || "",
        email: user.email || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        password: "",
        is_active: user.is_active,
        is_staff: user.is_staff,
      });
      setFormError("");
      setShowModal(true);
    } catch {
      alert("خطا در دریافت اطلاعات کاربر");
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("آیا از حذف این کاربر مطمئن هستید؟")) return;
    try {
      await adminService.deleteUser(userId);
      fetchUsers();
    } catch {
      alert("خطا در حذف کاربر");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSaving(true);
    try {
      if (editingUser) {
        await adminService.updateUser(editingUser.id, form);
      } else {
        await adminService.createUser(form);
      }
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        Object.values(err.response?.data || {})
          .flat()
          .join(" ") ||
        "خطا در ذخیره کاربر";
      setFormError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold text-mint mb-0">کاربران</h4>
        <button className="btn btn-saffron" onClick={handleAdd}>
          افزودن کاربر
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        className="form-control bg-white text-charcoal mb-3"
        placeholder="جستجوی کاربر..."
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
                  <th className="text-charcoal text-start p-3">نام کاربری</th>
                  <th className="text-charcoal text-start">ایمیل</th>
                  <th className="text-charcoal text-start">نام</th>
                  <th className="text-charcoal text-start">نام خانوادگی</th>
                  <th className="text-charcoal text-center">فعال</th>
                  <th className="text-charcoal text-center">ادمین</th>
                  <th className="text-charcoal text-center">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 && !loading ? (
                  <tr>
                    <td colSpan={7} className="text-center text-charcoal py-4">
                      هیچ کاربری یافت نشد.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td className="text-charcoal text-start p-3">
                        {user.username}
                      </td>
                      <td className="text-charcoal text-start">{user.email}</td>
                      <td className="text-charcoal text-start">
                        {user.first_name || "—"}
                      </td>
                      <td className="text-charcoal text-start">
                        {user.last_name || "—"}
                      </td>
                      <td className="text-center">
                        {user.is_active ? "✅" : "❌"}
                      </td>
                      <td className="text-center">
                        {user.is_staff ? "✅" : "❌"}
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-outline-mint me-1"
                          onClick={() => handleEdit(user.id)}
                        >
                          ✏️
                        </button>
                        <button
                          className="btn btn-sm btn-outline-plum"
                          onClick={() => handleDelete(user.id)}
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
            onClick={() => fetchUsers(prevUrl)}
          >
            قبلی
          </button>
          <span className="text-charcoal small">
            {total.toLocaleString()} کاربر
          </span>
          <button
            className="btn btn-sm btn-outline-mint"
            disabled={!nextUrl}
            onClick={() => fetchUsers(nextUrl)}
          >
            بعدی
          </button>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-canvas border-0 shadow">
              <div
                className="modal-header border-bottom border-charcoal"
                style={{ opacity: 0.15 }}
              >
                <h5 className="modal-title text-charcoal fw-bold">
                  {editingUser ? "ویرایش کاربر" : "افزودن کاربر"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {formError && (
                    <div className="alert alert-danger py-2 small">
                      {formError}
                    </div>
                  )}
                  <div className="mb-3">
                    <label className="form-label text-charcoal">
                      نام کاربری
                    </label>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      value={form.username}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-charcoal">ایمیل</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={form.email}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <label className="form-label text-charcoal">نام</label>
                      <input
                        type="text"
                        name="first_name"
                        className="form-control"
                        value={form.first_name}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label text-charcoal">
                        نام خانوادگی
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        className="form-control"
                        value={form.last_name}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-charcoal">
                      رمز عبور{" "}
                      {editingUser && (
                        <small>(خالی بگذارید تا تغییر نکند)</small>
                      )}
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={form.password}
                      onChange={handleFormChange}
                      required={!editingUser}
                    />
                  </div>
                  <div className="form-check form-switch mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="is_active"
                      checked={form.is_active}
                      onChange={handleFormChange}
                    />
                    <label className="form-check-label text-charcoal">
                      کاربر فعال
                    </label>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="is_staff"
                      checked={form.is_staff}
                      onChange={handleFormChange}
                    />
                    <label className="form-check-label text-charcoal">
                      دسترسی ادمین
                    </label>
                  </div>
                </div>
                <div
                  className="modal-footer border-top border-charcoal"
                  style={{ opacity: 0.15 }}
                >
                  <button
                    type="button"
                    className="btn btn-outline-charcoal"
                    onClick={() => setShowModal(false)}
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="btn btn-saffron"
                    disabled={saving}
                  >
                    {saving
                      ? "در حال ذخیره..."
                      : editingUser
                        ? "ویرایش کاربر"
                        : "افزودن کاربر"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersSection;
