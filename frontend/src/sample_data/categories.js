// Placeholder images – replace with real food photos
import iranianImg from '../assets/images/iranian.jpg';
import internationalImg from '../assets/images/international.jpg';
import saladImg from '../assets/images/salad.jpg';
import dessertImg from '../assets/images/dessert.jpg';
import breakfastImg from '../assets/images/breakfast.jpg';
import fastfoodImg from '../assets/images/fastfood.jpg';
import soupImg from '../assets/images/soup.jpg';
import drinkImg from '../assets/images/drink.jpg';

export const categories = [
  {
    id: 1,
    slug: 'iranian',
    image: iranianImg,
    name: 'غذاهای ایرانی',
    subtitle: 'از قورمه‌سبزی تا کباب',
    count: 245,
  },
  {
    id: 2,
    slug: 'international',
    image: internationalImg,
    name: 'غذاهای بین‌المللی',
    subtitle: 'طعم‌هایی از سراسر دنیا',
    count: 138,
  },
  {
    id: 3,
    slug: 'salad-appetizer',
    image: saladImg,
    name: 'سالاد و پیش‌غذا',
    subtitle: 'تازه و سالم',
    count: 92,  },
  {
    id: 4,
    slug: 'dessert',
    image: dessertImg,
    name: 'دسر و شیرینی',
    subtitle: 'برای هر مناسبت',
    count: 164,
  },
  {
    id: 5,
    slug: 'breakfast',
    image: breakfastImg,
    name: 'صبحانه',
    subtitle: 'شروع روز با انرژی',
    count: 78,
  },
  {
    id: 6,
    slug: 'fastfood',
    image: fastfoodImg,
    name: 'فست فود',
    subtitle: 'سریع و خوشمزه',
    count: 53,
  },
  {
    id: 7,
    slug: 'soup',
    image: soupImg,
    name: 'سوپ و آش',
    subtitle: 'گرم و دلچسب',
    count: 41,
  },
  {
    id: 8,
    slug: 'drinks',
    image: drinkImg,
    name: 'نوشیدنی',
    subtitle: 'خنک و گوارا',
    count: 35,
  },
];