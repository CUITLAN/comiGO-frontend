import { filterType } from "@/interfaces/table";

export const filtersVacancies: filterType[] = [
  {
    value: 'state', // Mapea a la columna 'state'
    name: 'Estado',
    options: [
      { label: 'Disponible', value: 'Activo' }, // Asumo que 'Activo' en BD es 'Disponible' visualmente
      { label: 'En revisión', value: 'EnRevisión' },
      { label: 'Agotada', value: 'Agotada' },
      { label: 'Cerrado', value: 'Cerrado' },
    ],
  },
  {
    value: 'workShift', // En tu columna anterior usaste workShift para "Tipo"
    name: 'Tipo',
    options: [
      { label: 'Paquete', value: 'Packete' }, // Ajusta el value según venga de tu BD
      { label: 'Platillo', value: 'Platillo' },
    ]
  },
  {
    value: 'modality', // En tu columna anterior usaste modality para "Categoría"
    name: 'Categoría',
    options: [
      { label: 'Cafetería', value: 'Cafeteria' },
      { label: 'Carnes y frías', value: 'Carnes y frías' },
      { label: 'Aceite', value: 'Aceite' },
      { label: 'Alcohol', value: 'Alcohol' },
      // Agrega más categorías según necesites
    ]
  },
  {
    value: 'createdAt',
    name: 'Fecha de publicación',
    isDate: true,
  },
];