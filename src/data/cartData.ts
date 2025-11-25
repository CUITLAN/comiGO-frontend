import { FoodItem, dummyFoodData } from "@/data/foodData";

// EN LUGAR DE REPETIR DATOS:
// Importamos la "Base de Datos" central (dummyFoodData) y seleccionamos 
// los platillos que queremos simular que están en el carrito.

export const initialCartData: FoodItem[] = [
  // Simulamos que el carrito tiene la Hamburguesa (ID '1')
  dummyFoodData.find(item => item.id === '1') as FoodItem,
  
  // Simulamos que el carrito tiene los Tacos (ID '3')
  dummyFoodData.find(item => item.id === '3') as FoodItem,
];