import { FoodItem } from "./foodData";

export const initialCartData: FoodItem[] = [
  {
    id: '1',
    name: 'Hamburguesa Clásica',
    image: '/food-hero-mobile.jpg', 
    cookedDate: '12/12/2025',
    rating: 4,
    restaurantName: 'Fonda Matilda',
    price: 150,
    category: 'Carnes'
  },
  {
    id: '2',
    name: 'Tacos Dorados (Orden)',
    image: '/sandwich-hero.jpg', 
    cookedDate: '12/12/2025',
    rating: 5,
    restaurantName: 'Antojitos Doña Pelo',
    price: 85,
    category: 'Mexicana'
  },
  {
    id: '3',
    name: 'Rebanada de Pizza',
    image: '/food-delivery-happy.jpg', 
    cookedDate: '12/12/2025',
    rating: 3,
    restaurantName: 'Pizzas del Centro',
    price: 45,
    category: 'Rápida'
  },
  {
    id: '4',
    name: 'Café Americano',
    image: '/food-hero-mobile.jpg', 
    cookedDate: '12/12/2025',
    rating: 5,
    restaurantName: 'Café El Despertar',
    price: 35,
    category: 'Bebidas'
  },
];