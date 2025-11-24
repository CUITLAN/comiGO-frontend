export interface FoodItem {
  id: string;
  name: string;
  image: string; // URL de la imagen
  cookedDate: string;
  rating: number; // 1-5
  restaurantName: string;
  price: number;
  category: string;
}

export const dummyFoodData: FoodItem[] = [
  {
    id: '1',
    name: 'Hamburguesa Clásica',
    image: '/food1.png', 
    cookedDate: '12/12/2025',
    rating: 4,
    restaurantName: 'Fonda Matilda',
    price: 150,
    category: 'Carnes'
  },
  {
    id: '2',
    name: 'Paquete Desayuno',
    image: '/food-delivery-happy.jpg',
    cookedDate: '12/12/2025',
    rating: 5,
    restaurantName: 'Café El Despertar',
    price: 85,
    category: 'Cafetería'
  },
  {
    id: '3',
    name: 'Tacos Dorados (3 pzas)',
    image: '/sandwich-hero.jpg',
    cookedDate: '11/12/2025',
    rating: 3,
    restaurantName: 'Antojitos Doña Pelo',
    price: 45,
    category: 'Mexicana'
  },
  {
    id: '4',
    name: 'Rebanada de Pastel',
    image: '/food-hero-mobile.jpg',
    cookedDate: '12/12/2025',
    rating: 5,
    restaurantName: 'Panadería La Espiga',
    price: 35,
    category: 'Panadería'
  },
];