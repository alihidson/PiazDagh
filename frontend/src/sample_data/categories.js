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
    image: iranianImg,
    name: 'غذاهای ایرانی',
    subtitle: 'از قورمه‌سبزی تا کباب',
    count: 245,
    linkTo: '/categories/iranian',
  },
  {
    id: 2,
    image: internationalImg,
    name: 'غذاهای بین‌المللی',
    subtitle: 'طعم‌هایی از سراسر دنیا',
    count: 138,
    linkTo: '/categories/international',
  },
  {
    id: 3,
    image: saladImg,
    name: 'سالاد و پیش‌غذا',
    subtitle: 'تازه و سالم',
    count: 92,
    linkTo: '/categories/salad-appetizer',
  },
  {
    id: 4,
    image: dessertImg,
    name: 'دسر و شیرینی',
    subtitle: 'برای هر مناسبت',
    count: 164,
    linkTo: '/categories/dessert',
  },
  {
    id: 5,
    image: breakfastImg,
    name: 'صبحانه',
    subtitle: 'شروع روز با انرژی',
    count: 78,
    linkTo: '/categories/breakfast',
  },
  {
    id: 6,
    image: fastfoodImg,
    name: 'فست فود',
    subtitle: 'سریع و خوشمزه',
    count: 53,
    linkTo: '/categories/fastfood',
  },
  {
    id: 7,
    image: soupImg,
    name: 'سوپ و آش',
    subtitle: 'گرم و دلچسب',
    count: 41,
    linkTo: '/categories/soup',
  },
  {
    id: 8,
    image: drinkImg,
    name: 'نوشیدنی',
    subtitle: 'خنک و گوارا',
    count: 35,
    linkTo: '/categories/drinks',
  },
];