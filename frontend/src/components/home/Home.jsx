import Hero from './Hero';
import RecipeCard from './../cards/RecipeCard';

const Home = () => {
  return (
    <div>
      <Hero />
      <RecipeCard
        image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        title="پیتزا مارگاریتا" 
        description="پیتزا مارگاریتا با سبزیجات تازه و پنیر"
        rating={4.5}
        time={20}
        difficulty="متوسط"
        linkTo="/recipes/margherita-pizza"
      />
    </div>
  );
};

export default Home;

