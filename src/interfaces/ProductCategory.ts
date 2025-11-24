// Definimos las categorías como una constante de solo lectura (as const)
// Esto permite que TypeScript entienda que estos son los ÚNICOS valores permitidos.
export const PRODUCT_CATEGORIES = [
  "Cafetería / Panadería",
  "Comida corrida / Casera",
  "Tortas, tacos y antojitos",
  "Carnes frías y embutidos",
  "Frutas y verduras",
  "Lácteos (leche, queso, yogur)",
  "Platillos preparados",
  "Pescados y mariscos",
  "Snacks y botanas",
  "Bebidas (incluye alcohol y no alcohol)"
] as const;

// Creamos un tipo (Type) basado automáticamente en la lista de arriba.
// ProductCategory será: "Cafetería / Panadería" | "Comida corrida / Casera" | ...
export type ProductCategory = typeof PRODUCT_CATEGORIES[number];