export interface RestaurantItem {
  id: string;
  name: string;
  image: string;
  logo: string;
  rating: number;
  category: string;
  deliveryTime: string;
  minOrder: number;
  address: string;
  description: string;
  
  // --- NUEVOS CAMPOS PARA LA VISTA DETALLADA ---
  hours: string;
  days: string;
  avgCost: string;
  manager: string;
  website: string;
  email: string;
  phone: string;
  gallery: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const dummyRestaurantData: RestaurantItem[] = [
  {
    id: '101',
    name: 'Fonda Matilda',
    image: '/FondoLanding.png',
    logo: '/ComiGo-Logo.png',
    rating: 4.5,
    category: 'Mexicana',
    deliveryTime: '30-45 min',
    minOrder: 100,
    address: 'Av. Universidad 45, Centro, Querétaro',
    description: 'Cocina tradicional con el sabor de hogar que te encanta. Ingredientes frescos del mercado local preparados con amor.',
    hours: '09:00 - 18:00',
    days: 'Lunes - Sábado',
    avgCost: '$100 - $150 MXN',
    manager: 'Matilda Gómez',
    website: 'www.fondamatilda.com',
    email: 'contacto@fondamatilda.com',
    phone: '+52 442 111 2233',
    gallery: ['/FondoLanding.png', '/FondoLanding.png', '/FondoLanding.png'],
    coordinates: { lat: 20.5923, lng: -100.3900 }
  },
  {
    id: '102',
    name: 'Café El Despertar',
    image: '/FondoLanding.png',
    logo: '/ComiGo-Logo.png',
    rating: 4.8,
    category: 'Cafetería',
    deliveryTime: '20-30 min',
    minOrder: 50,
    address: 'Calle 5 de Mayo 12, Centro, Querétaro',
    description: 'El mejor café de especialidad de la ciudad, acompañado de panadería artesanal hecha en casa.',
    hours: '07:00 - 14:00',
    days: 'Lunes - Domingo',
    avgCost: '$80 - $120 MXN',
    manager: 'Jorge Campos',
    website: 'www.eldespertar.cafe',
    email: 'hola@eldespertar.cafe',
    phone: '+52 442 999 8877',
    gallery: ['/FondoLanding.png', '/FondoLanding.png', '/FondoLanding.png'],
    coordinates: { lat: 20.5940, lng: -100.3930 }
  },
  {
    id: '103',
    name: 'La Mercaderia',
    image: '/FondoLanding.png',
    logo: '/ComiGo-Logo.png',
    rating: 4.9,
    category: 'Gourmet',
    deliveryTime: '40-60 min',
    minOrder: 150,
    address: 'Abelardo Ávila 3, Querétaro',
    description: 'Somos un espacio dedicado a la comida consciente, rescatando ingredientes de alta calidad para ofrecer experiencias gourmet a precios accesibles.',
    hours: '18:00 - 20:00',
    days: 'Lunes - Domingo',
    avgCost: '$100 - $200 MXN',
    manager: 'Roberto Diaz',
    website: 'www.lamercaderia.com',
    email: 'contacto@lamercaderia.com',
    phone: '+52 442 123 4567',
    gallery: ['/FondoLanding.png', '/FondoLanding.png', '/FondoLanding.png'],
    coordinates: { lat: 20.5888, lng: -100.3899 }
  }
];