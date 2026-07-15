// services/recipeService.js
import { featuredRecipes } from '../sample_data/featuredRecipes';
import { trendingRecipes } from '../sample_data/trendingRecipes';
import { newRecipes } from '../sample_data/newRecipes';
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
};

export default recipeService;