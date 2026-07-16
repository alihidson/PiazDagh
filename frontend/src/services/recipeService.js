// services/recipeService.js
import { featuredRecipes } from '../sample_data/featuredRecipes';
import { trendingRecipes } from '../sample_data/trendingRecipes';
import { newRecipes } from '../sample_data/newRecipes';
import recipeDetails from '../sample_data/recipeDetail';
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
      if (!recipe) throw new Error('Recipe not found');
      return recipe;
    }
    // const response = await axios.get(`/api/recipes/${id}/`);
    // return response.data;
  },

  async getComments(recipeId) {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const recipe = recipeDetails[Number(recipeId)];
      if (!recipe) throw new Error('Recipe not found');
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
        user: { name: 'کاربر مهمان', avatar: null },
        text,
        time: 'همین الان',
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
        user: { name: 'کاربر مهمان', avatar: null },
        text,
        time: 'همین الان',
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
};

export default recipeService;