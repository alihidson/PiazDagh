import { useState, useEffect } from 'react';
import Hero from '../components/home/Hero';
import FeaturedSection from '../components/home/FeaturedSection';
import CategorySection from '../components/home/CategorySection';
import RecipeListSection from '../components/home/RecipeListSection';
import recipeService from '../services/recipeService';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [trending, setTrending] = useState([]);
  const [newRecipes, setNewRecipes] = useState([]);

  useEffect(() => {
    async function loadData() {
      const [featuredData, trendingData, newData] = await Promise.all([
        recipeService.getFeatured(),
        recipeService.getTrending(),
        recipeService.getNew(),
      ]);
      setFeatured(featuredData);
      setTrending(trendingData);
      setNewRecipes(newData);
    }
    loadData();
  }, []);

  return (
    <>
      <Hero />
      <FeaturedSection recipes={featured} />
      <CategorySection />
      <RecipeListSection
        title="دستورهای پرطرفدار"
        recipes={trending}
        linkTo="/trending"
      />
      <RecipeListSection
        title="دستورهای جدید"
        recipes={newRecipes}
        linkTo="/new-recipes"
      />
    </>
  );
};

export default Home;