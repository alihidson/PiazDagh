import Hero from './Hero';
import FeaturedSection from './FeaturedSection';
import CategorySection from './CategorySection';
import RecipeListSection from './RecipeListSection';
import { trendingRecipes } from '../../sample_data/trendingRecipes';
import { newRecipes } from '../../sample_data/newRecipes';


const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedSection />
      <CategorySection />
      <RecipeListSection
        title="دستورهای پرطرفدار"
        recipes={trendingRecipes}
        linkTo="/trending"
      />
      <RecipeListSection
        title="دستورهای جدید"
        recipes={newRecipes}
        linkTo="/new-recipes"
      />
    </div>
  );
};

export default Home;

