export const topRowLinks = [
  { id: 1, label: 'خبرنامه', href: '/newsletter', variant: 'secondary' },
  { id: 3, label: 'شروع رایگان', href: '/auth', variant: 'saffron' },
];

export const navLinks = [
  {
    id: 1,
    label: 'دستور پخت‌ها',
    href: '/recipes',
    hasDropdown: true,
    dropdownItems: [
      { id: '1-1', label: 'پیش‌غذا', href: '/recipes/appetizers' },
      { id: '1-2', label: 'غذای اصلی', href: '/recipes/main-course' },
      { id: '1-3', label: 'دسر', href: '/recipes/desserts' },
      { id: '1-4', label: 'نوشیدنی', href: '/recipes/drinks' },
    ],
  },
  {
    id: 2,
    label: 'مواد اولیه',
    href: '/ingredients',
    hasDropdown: true,
    dropdownItems: [
      { id: '2-1', label: 'سبزیجات', href: '/ingredients/vegetables' },
      { id: '2-2', label: 'گوشت و مرغ', href: '/ingredients/meat' },
      { id: '2-3', label: 'ادویه‌جات', href: '/ingredients/spices' },
      { id: '2-4', label: 'لبنیات', href: '/ingredients/dairy' },
    ],
  },
  {
    id: 3,
    label: 'مناسبت‌ها',
    href: '/occasions',
    hasDropdown: true,
    dropdownItems: [
      { id: '3-1', label: 'عید نوروز', href: '/occasions/nowruz' },
      { id: '3-2', label: 'شب یلدا', href: '/occasions/yalda' },
      { id: '3-3', label: 'مهمانی', href: '/occasions/parties' },
      { id: '3-4', label: 'روزمره', href: '/occasions/everyday' },
    ],
  },
  {
    id: 4,
    label: 'تجهیزات آشپزخانه',
    href: '/kitchen-gear',
    hasDropdown: true,
    dropdownItems: [
      { id: '4-1', label: 'قابلمه و تابه', href: '/kitchen-gear/pots-pans' },
      { id: '4-2', label: 'چاقو', href: '/kitchen-gear/knives' },
      { id: '4-3', label: 'وسایل برقی', href: '/kitchen-gear/appliances' },
      { id: '4-4', label: 'ابزار پخت', href: '/kitchen-gear/bakeware' },
    ],
  },
  {
    id: 5,
    label: 'تکنیک‌ها',
    href: '/techniques',
    hasDropdown: false,
  },
];