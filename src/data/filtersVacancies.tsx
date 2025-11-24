import { filterType } from "@/interfaces/table";
import { PRODUCT_CATEGORIES, ProductCategory } from "@/interfaces/ProductCategory";

export const filtersVacancies: filterType[] = [
  {
    value: 'state', 
    name: 'Estado',
    options: [
      { label: 'Disponible', value: 'Activo' }, 
      { label: 'En revisión', value: 'EnRevisión' },
      { label: 'Agotada', value: 'Agotada' },
      { label: 'Cerrado', value: 'Cerrado' },
      { label: 'Rechazado', value: 'Rechazado' },
    ],
  },
  {
    value: 'foodType', // Antes workShift
    name: 'Tipo',
    options: [
      { label: 'Paquete', value: 'Packete' }, 
      { label: 'Platillo', value: 'Platillo' },
    ]
  },
  {
    value: 'category', // Antes modality
    name: 'Categoría',
    // Mapeamos dinámicamente las categorías importadas
    options: PRODUCT_CATEGORIES.map(cat => ({
        label: cat,
        value: cat
    }))
  },
  {
    value: 'createdAt',
    name: 'Fecha de publicación',
    isDate: true,
  },
];