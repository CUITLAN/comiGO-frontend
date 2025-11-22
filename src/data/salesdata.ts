import { Sale } from "@/interfaces/sale";
import { filterType } from "@/interfaces/table";

export const DataSales: Sale[] = [
  {
    id: '1001',
    productName: 'Charcuteria',
    saleDate: '2024-11-20T14:30:00',
    quantity: 10,
    unit: 'Packete',
    rating: 4,
    price: 1230.00, // Precio total o unitario (depende tu lógica, aquí asumo total)
    branch: 'Sucursal Norte',
    customerName: 'Juan Pérez',
    paymentMethod: 'Tarjeta de Crédito'
  },
  {
    id: '1002',
    productName: 'Hamburguesa',
    saleDate: '2024-11-20T15:00:00',
    quantity: 2,
    unit: 'Platillo',
    rating: 5,
    price: 250.00,
    branch: 'Sucursal Centro',
    customerName: 'Ana López',
    paymentMethod: 'Efectivo'
  },
  {
    id: '1003',
    productName: 'Papas a la francesa',
    saleDate: '2024-11-21T12:00:00',
    quantity: 5,
    unit: 'Platillo',
    rating: 3,
    price: 150.00,
    branch: 'Sucursal Sur',
    customerName: 'Carlos Ruiz',
    paymentMethod: 'Transferencia'
  },
  {
    id: '1004',
    productName: 'Cerveza Artesanal',
    saleDate: '2024-11-22T18:45:00',
    quantity: 6,
    unit: 'Packete',
    rating: 5,
    price: 450.00,
    branch: 'Sucursal Norte',
    customerName: 'Lucía Méndez',
    paymentMethod: 'Tarjeta de Débito'
  },
  {
    id: '1005',
    productName: 'Alitas Búfalo',
    saleDate: '2024-11-22T19:00:00',
    quantity: 3,
    unit: 'Platillo',
    rating: 4,
    price: 330.00,
    branch: 'Sucursal Centro',
    customerName: 'Roberto Diaz',
    paymentMethod: 'Efectivo'
  }
];

// Definición de filtros para la barra de búsqueda
export const filtersSales: filterType[] = [
  {
    value: 'saleDate',
    name: 'Fecha de venta',
    isDate: true,
  },
  {
    value: 'branch',
    name: 'Sucursal',
    options: [
        { label: 'Sucursal Norte', value: 'Sucursal Norte' },
        { label: 'Sucursal Centro', value: 'Sucursal Centro' },
        { label: 'Sucursal Sur', value: 'Sucursal Sur' }
    ]
  }
];