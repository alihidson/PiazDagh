import apiClient from "./apiClient";
import fallbackImage from "../assets/images/hero-image-2.jpg";

const unwrapList = (data) => Array.isArray(data) ? data : (data?.results || []);
const slugify = (value = "recipe") => encodeURIComponent(value.trim().replace(/\s+/g, "-"));
const difficultyFromTime = (time) => time <= 30 ? "آسان" : time <= 90 ? "متوسط" : "سخت";
const unitMap = { g: "گرم", kg: "کیلوگرم", ml: "میلی‌لیتر", l: "لیتر", tsp: "قاشق چای‌خوری", tbsp: "قاشق غذاخوری", cup: "پیمانه", piece: "عدد", to_taste: "به مقدار لازم" };

const normalizeRecipe = (recipe) => {
  const time = recipe.total_time ?? ((recipe.preparation_time || 0) + (recipe.cooking_time || 0));
  const instructions = (recipe.instructions || "").split(/\n+/).map((text) => text.trim()).filter(Boolean);
  return {
    ...recipe,
    slug: recipe.slug || slugify(recipe.title),
    image: recipe.image || fallbackImage,
    rating: Number(recipe.average_rating ?? 0),
    time,
    cookTime: time,
    difficulty: recipe.difficulty || difficultyFromTime(time),
    views: recipe.views || 0,
    longDescription: [recipe.description || ""],
    ingredients: (recipe.ingredients || []).map((item) => ({
      name: item.ingredient?.name || item.name || "",
      amount: item.amount == null ? "" : Number(item.amount),
      unit: unitMap[item.unit] || item.unit || "",
      note: item.note || "",
    })),
    steps: instructions.map((text, index) => ({ order: index + 1, text })),
    tips: [],
  };
};

const paramsForFilters = (type, filters, sort) => {
  const params = {};
  if (type?.startsWith("category-")) params.category = type.replace("category-", "");
  if (type === "new") params.ordering = "-created_at";
  if (type === "trending") params.ordering = "-average_rating";
  if (sort === "newest") params.ordering = "-created_at";
  if (sort === "oldest") params.ordering = "created_at";
  if (sort === "highest") params.ordering = "-average_rating";
  if (filters.search) params.search = filters.search;
  return params;
};

const recipeService = {
  async getFeatured() {
    const { data } = await apiClient.get("/recipes/", { params: { ordering: "-average_rating", page_size: 3 } });
    return unwrapList(data).slice(0, 3).map(normalizeRecipe);
  },
  async getTrending() {
    const { data } = await apiClient.get("/recipes/", { params: { ordering: "-average_rating", page_size: 6 } });
    return unwrapList(data).slice(0, 6).map(normalizeRecipe);
  },
  async getNew() {
    const { data } = await apiClient.get("/recipes/", { params: { ordering: "-created_at", page_size: 6 } });
    return unwrapList(data).slice(0, 6).map(normalizeRecipe);
  },
  async getRecipe(id) {
    const { data } = await apiClient.get(`/recipes/${id}/`);
    return normalizeRecipe(data);
  },
  async getComments(recipeId) {
    const { data } = await apiClient.get(`/recipes/${recipeId}/reviews/`);
    return unwrapList(data).map((review) => ({
      id: review.id,
      user: { name: review.user, avatar: null },
      text: review.comment,
      rating: review.rating,
      time: new Date(review.created_at).toLocaleDateString("fa-IR"),
    }));
  },
  async addComment(recipeId, text, rating = 5) {
    const { data } = await apiClient.post(`/recipes/${recipeId}/reviews/`, { comment: text, rating });
    return { id: data.id, user: { name: data.user, avatar: null }, text: data.comment, rating: data.rating, time: "همین الان" };
  },
  async getMyRecipes() {
    const { data } = await apiClient.get("/recipes/", { params: { mine: true, page_size: 100 } });
    return unwrapList(data).map(normalizeRecipe);
  },
  async getFavoriteRecipes() {
    const { data } = await apiClient.get("/favorites/");
    return unwrapList(data).map((item) => normalizeRecipe(item.recipe));
  },
  async deleteRecipe(recipeId) { await apiClient.delete(`/recipes/${recipeId}/`); return { success: true }; },
  async addFavorite(recipeId) { const { data } = await apiClient.post(`/recipes/${recipeId}/favorite/`); return data; },
  async removeFavorite(recipeId) { await apiClient.delete(`/recipes/${recipeId}/favorite/`); return { success: true }; },
  async getFilteredRecipes(type, filters = {}, sort = "") {
    const { data } = await apiClient.get("/recipes/", { params: { ...paramsForFilters(type, filters, sort), page_size: 100 } });
    let recipes = unwrapList(data).map(normalizeRecipe);
    if (filters.cookTime?.length) recipes = recipes.filter((r) => filters.cookTime.some((v) => v === "under30" ? r.time < 30 : v === "30to60" ? r.time >= 30 && r.time <= 60 : r.time > 60));
    if (filters.difficulty?.length) { const map = { easy: "آسان", medium: "متوسط", hard: "سخت" }; recipes = recipes.filter((r) => filters.difficulty.map((x) => map[x]).includes(r.difficulty)); }
    if (filters.score?.length) recipes = recipes.filter((r) => r.rating >= Math.min(...filters.score.map(Number)));
    return recipes;
  },
  async getCategories() { const { data } = await apiClient.get("/categories/"); return data; },
  async getIngredients() { const { data } = await apiClient.get("/ingredients/"); return data; },
  async saveRecipe(payload, id = null) {
    const request = id ? apiClient.patch(`/recipes/${id}/`, payload) : apiClient.post("/recipes/", payload);
    const { data } = await request;
    return normalizeRecipe(data);
  },
};

export default recipeService;
