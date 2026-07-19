import apiClient from "./apiClient";

const adminService = {
  async getDashboard() {
    const { data } = await apiClient.get("/admin-panel/reports/dashboard/");
    return data;
  },

  // Users
  async getUsers(params = {}) {
    const { data } = await apiClient.get("/admin-panel/users/", { params });
    return {
      count: data.count,
      next: data.next,
      previous: data.previous,
      results: data.results || data,
    };
  },

  async getUser(id) {
    const { data } = await apiClient.get(`/admin-panel/users/${id}/`);
    return data;
  },

  async createUser(payload) {
    const { data } = await apiClient.post("/admin-panel/users/", payload);
    return data;
  },

  async updateUser(id, payload) {
    const { data } = await apiClient.patch(
      `/admin-panel/users/${id}/`,
      payload,
    );
    return data;
  },

  async deleteUser(id) {
    await apiClient.delete(`/admin-panel/users/${id}/`);
  },

  // Recipes
  async getRecipes(params = {}) {
    const { data } = await apiClient.get("/admin-panel/recipes/", { params });
    return {
      count: data.count,
      next: data.next,
      previous: data.previous,
      results: data.results || data,
    };
  },

  async getRecipe(id) {
    const { data } = await apiClient.get(`/admin-panel/recipes/${id}/`);
    return data;
  },

  async updateRecipe(id, payload) {
    const { data } = await apiClient.patch(
      `/admin-panel/recipes/${id}/`,
      payload,
    );
    return data;
  },

  async deleteRecipe(id) {
    await apiClient.delete(`/admin-panel/recipes/${id}/`);
  },
};

export default adminService;
