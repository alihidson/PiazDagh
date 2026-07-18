import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import recipeService from "../services/recipeService";
import { useAuth } from "../hooks/useAuth";

const initial = { title: "", description: "", instructions: "", preparation_time: 10, cooking_time: 20, servings: 4, category_id: "" };

export default function RecipeFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [form, setForm] = useState(initial);
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    recipeService.getCategories().then(setCategories).catch(() => setError("دریافت دسته‌بندی‌ها ناموفق بود."));
    if (id) recipeService.getRecipe(id).then((r) => setForm({
      title: r.title, description: r.description, instructions: r.instructions,
      preparation_time: r.preparation_time, cooking_time: r.cooking_time,
      servings: r.servings, category_id: r.category?.id || "",
    })).catch(() => setError("دستور یافت نشد."));
  }, [id]);

  if (!authLoading && !isAuthenticated) return <div className="container py-5 text-center"><p>برای ثبت دستور ابتدا وارد شوید.</p><Link className="btn btn-saffron" to="/auth">ورود</Link></div>;

  const change = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault(); setSaving(true); setError("");
    try {
      const payload = { ...form, preparation_time: Number(form.preparation_time), cooking_time: Number(form.cooking_time), servings: Number(form.servings), category_id: form.category_id ? Number(form.category_id) : null, status: "draft" };
      const saved = await recipeService.saveRecipe(payload, id);
      navigate(`/recipe/${saved.id}/${saved.slug}`);
    } catch (err) { setError(Object.values(err.response?.data || {}).flat().join(" ") || "ذخیره دستور ناموفق بود."); }
    finally { setSaving(false); }
  };

  return <div className="container py-5" style={{ maxWidth: 850 }}>
    <h2 className="fw-bold text-charcoal mb-4">{id ? "ویرایش دستور" : "ثبت دستور جدید"}</h2>
    {error && <div className="alert alert-danger">{error}</div>}
    <form onSubmit={submit} className="card border-0 shadow-sm p-4 bg-canvas">
      <label className="form-label">عنوان</label><input required name="title" className="form-control mb-3" value={form.title} onChange={change}/>
      <label className="form-label">توضیح کوتاه</label><textarea required name="description" rows="3" className="form-control mb-3" value={form.description} onChange={change}/>
      <label className="form-label">مراحل پخت (هر مرحله در یک خط)</label><textarea required name="instructions" rows="8" className="form-control mb-3" value={form.instructions} onChange={change}/>
      <div className="row g-3 mb-3">
        <div className="col-md-4"><label className="form-label">زمان آماده‌سازی</label><input min="1" type="number" name="preparation_time" className="form-control" value={form.preparation_time} onChange={change}/></div>
        <div className="col-md-4"><label className="form-label">زمان پخت</label><input min="1" type="number" name="cooking_time" className="form-control" value={form.cooking_time} onChange={change}/></div>
        <div className="col-md-4"><label className="form-label">تعداد نفرات</label><input min="1" type="number" name="servings" className="form-control" value={form.servings} onChange={change}/></div>
      </div>
      <label className="form-label">دسته‌بندی</label><select name="category_id" className="form-select mb-4" value={form.category_id} onChange={change}><option value="">بدون دسته‌بندی</option>{categories.map((c)=><option key={c.id} value={c.id}>{c.name}</option>)}</select>
      <div className="alert alert-info">دستور پس از ثبت به صورت پیش‌نویس ذخیره می‌شود و مدیر می‌تواند آن را تأیید و منتشر کند.</div>
      <button disabled={saving} className="btn btn-saffron">{saving ? "در حال ذخیره..." : "ذخیره دستور"}</button>
    </form>
  </div>;
}
