// services/recipeService.js
import { featuredRecipes } from "../sample_data/featuredRecipes";
import { trendingRecipes } from "../sample_data/trendingRecipes";
import { newRecipes } from "../sample_data/newRecipes";
import recipeDetails from "../sample_data/recipeDetail";
import { myRecipes } from "../sample_data/myRecipes";
import { favoriteRecipes } from "../sample_data/FavoriteRecipes";
import recipeLists from "../sample_data/recipeLists";
// import axios from 'axios';

const USE_MOCK = true;

const recipeService = {
  async getFeatured() {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return featuredRecipes;
    }
    // const response = await axios.get('/api/recipes/featured/');
    // return response.data;
  },

  async getTrending() {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return trendingRecipes;
    }
    // const response = await axios.get('/api/recipes/trending/');
    // return response.data;
  },

  async getNew() {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return newRecipes;
    }
    // const response = await axios.get('/api/recipes/new/');
    // return response.data;
  },

  async getRecipe(id) {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      // The id coming from the URL is a string, so convert if necessary
      const recipe = recipeDetails[Number(id)];
      if (!recipe) throw new Error("Recipe not found");
      return recipe;
    }
    // const response = await axios.get(`/api/recipes/${id}/`);
    // return response.data;
  },

  async getComments(recipeId) {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const recipe = recipeDetails[Number(recipeId)];
      if (!recipe) throw new Error("Recipe not found");
      return recipe.comments || [];
    }
    // const response = await axios.get(`/api/recipes/${recipeId}/comments/`);
    // return response.data;
  },

  async addComment(recipeId, text) {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      // Return a mock new comment object — the UI will add it locally anyway
      return {
        id: Date.now(),
        user: { name: "کاربر مهمان", avatar: null },
        text,
        time: "همین الان",
        likes: 0,
        liked: false,
        replies: [],
      };
    }
    // const response = await axios.post(`/api/recipes/${recipeId}/comments/`, { text });
    // return response.data;
  },

  async addReply(recipeId, commentId, text) {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return {
        id: Date.now(),
        user: { name: "کاربر مهمان", avatar: null },
        text,
        time: "همین الان",
        likes: 0,
        liked: false,
      };
    }
    // const response = await axios.post(`/api/recipes/${recipeId}/comments/${commentId}/replies/`, { text });
    // return response.data;
  },

  async likeComment(recipeId, commentId) {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return { success: true };
    }
    // const response = await axios.post(`/api/recipes/${recipeId}/comments/${commentId}/like/`);
    // return response.data;
  },

  async getMyRecipes() {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return myRecipes;
    }
    // const response = await axios.get('/api/my-recipes');
    // return response.data;
  },

  // Inside recipeService object:

  async getFavoriteRecipes() {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return favoriteRecipes;
    }
    // const response = await axios.get('/api/favorites');
    // return response.data;
  },

  // Inside the recipeService object

  async deleteRecipe(recipeId) {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      // Return success – the UI will remove the card from state
      return { success: true };
    }
    // const response = await axios.delete(`/api/recipes/${recipeId}/`);
    // return response.data;
  },

  async removeFavorite(recipeId) {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return { success: true };
    }
    // const response = await axios.delete(`/api/favorites/${recipeId}/`);
    // return response.data;
  },

  async getFilteredRecipes(type, filters = {}, sort = "") {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Get base list based on type
      let recipes = [];

      if (type === "trending") {
        recipes = [...recipeLists.trending];
      } else if (type === "new") {
        recipes = [...recipeLists.new];
      } else if (type?.startsWith("category-")) {
        recipes = [...recipeLists.category];
      }

      // --- Apply Filters (unchanged) ---
      if (filters.cookTime?.length > 0) {
        recipes = recipes.filter((r) => {
          if (filters.cookTime.includes("under30")) return r.time < 30;
          if (filters.cookTime.includes("30to60"))
            return r.time >= 30 && r.time <= 60;
          if (filters.cookTime.includes("over60")) return r.time > 60;
          return false;
        });
      }

      if (filters.difficulty?.length > 0) {
        const diffMap = { easy: "آسان", medium: "متوسط", hard: "سخت" };
        const selectedDiffs = filters.difficulty.map((d) => diffMap[d]);
        recipes = recipes.filter((r) => selectedDiffs.includes(r.difficulty));
      }

      if (filters.score?.length > 0) {
        const minScore = Math.min(...filters.score.map(Number));
        recipes = recipes.filter((r) => r.rating >= minScore);
      }

      // --- Apply Sort ---
      if (sort === "newest") {
        recipes.sort((a, b) => b.id - a.id);
      } else if (sort === "oldest") {
        recipes.sort((a, b) => a.id - b.id);
      } else if (sort === "highest") {
        recipes.sort((a, b) => b.rating - a.rating);
      }

      return recipes;
    }

    // const response = await axios.get(`/api/recipes/${type}/`, { params: { ...filters, sort } });
    // return response.data;
  },
};

export default recipeService;
