export interface RestaurantItem {
  id: string;
  name: string;
  image: string;
  rating: number; // 1-5
  address: string;
  category: string; // "Mexicana", "Cafetería", etc.
}

export const dummyRestaurantData: RestaurantItem[] = [
  {
    id: '101',
    name: 'Fonda Matilda',
    image: '/food-hero-mobile.jpg', // Placeholder
    rating: 4,
    address: 'Juriquilla, Querétaro',
    category: 'Mexicana'
  },
  {
    id: '102',
    name: 'Café El Despertar',
    image: '/food-delivery-happy.jpg', // Placeholder
    rating: 5,
    address: 'Centro Histórico, Qro',
    category: 'Cafetería'
  },
  {
    id: '103',
    name: 'La Mercadería',
    image: '/sandwich-hero.jpg', // Placeholder
    rating: 5,
    address: 'Álamos 2da Sección',
    category: 'Restaurante'
  },
];