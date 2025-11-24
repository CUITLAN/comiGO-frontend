import { Vacancy } from "@/interfaces/vacancy";

export const DataVacancies: Vacancy[] = [
  {
    id: 1,
    productName: 'Paquete Desayuno Ejecutivo',
    foodType: 'Packete',
    category: 'Cafetería / Panadería',
    branch: 'Sucursal Centro',
    portions: 15,
    description: 'Incluye café americano grande, cuernito de jamón y queso, y jugo de naranja natural. Ideal para oficinas.',
    price: 85.00,
    elaborationDate: '2025-11-23',
    pickupStartTime: '08:00',
    pickupEndTime: '11:00',
    deadlineDate: '2025-11-23',
    finalOffer: false,
    
    // Datos de Sistema
    state: 'Activo',
    createdAt: '2025-11-22T18:00:00.000Z',
    applications: 3, 
    LogoUrl: '/ComiGo-Logo.png',
    companyId: 'REST-001'
  },
  {
    id: 2,
    productName: 'Lasaña Boloñesa (1kg)',
    foodType: 'Platillo',
    category: 'Platillos preparados',
    branch: 'Sucursal Norte',
    portions: 5,
    description: 'Lasaña casera preparada el día de hoy, lista para hornear o calentar. Rinde para 4 personas.',
    price: 250.00,
    elaborationDate: '2025-11-23',
    pickupStartTime: '13:00',
    pickupEndTime: '17:00',
    deadlineDate: '2025-11-24',
    finalOffer: true, 
    
    state: 'EnRevisión', // Esperando aprobación del admin
    createdAt: '2025-11-23T09:00:00.000Z',
    applications: 0,
    LogoUrl: '/ComiGo-Logo.png',
    companyId: 'REST-001'
  },
  {
    id: 3,
    productName: 'Surtido de Tacos de Canasta',
    foodType: 'Packete',
    category: 'Tortas, tacos y antojitos',
    branch: 'Sucursal Sur',
    portions: 0, // Se acabaron
    description: 'Canasta con 50 tacos surtidos (chicharrón, papa, frijol). Incluye salsa verde y roja.',
    price: 400.00,
    elaborationDate: '2025-11-23',
    pickupStartTime: '10:00',
    pickupEndTime: '14:00',
    deadlineDate: '2025-11-23',
    finalOffer: false,
    
    state: 'Agotada',
    createdAt: '2025-11-22T10:00:00.000Z',
    applications: 50,
    LogoUrl: '/ComiGo-Logo.png',
    companyId: 'REST-001'
  },
  {
    id: 4,
    productName: 'Sushi Charola Familiar',
    foodType: 'Packete',
    category: 'Pescados y mariscos',
    branch: 'Sucursal Centro',
    portions: 2,
    description: 'Charola con 4 rollos variados (California, Empanizado, Avocado, Spicy Tuna).',
    price: 350.00,
    elaborationDate: '2025-11-22',
    pickupStartTime: '14:00',
    pickupEndTime: '20:00',
    deadlineDate: '2025-11-22',
    finalOffer: false,
    
    state: 'Rechazado', // Admin rechazó la publicación
    createdAt: '2025-11-21T15:00:00.000Z',
    applications: 0,
    LogoUrl: '/ComiGo-Logo.png',
    companyId: 'REST-001'
  },
];