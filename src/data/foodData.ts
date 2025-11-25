export interface FoodItem {
  id: string;
  name: string; // Antes era name en la tarjeta y productName en el detalle. Unificamos a 'name'.
  price: number;
  rating: number;
  description: string;
  image: string;
  pickupTime: string;
  portions: number;
  type: 'Platillo' | 'Paquete';
  cookedDate: string;
  category: string;

  // Objeto restaurante anidado (como vendría de una API real con 'include: restaurant')
  restaurant: {
    name: string;
    logo: string;
    address: string;
    category: string;
    hours: string;
    days: string;
    avgCost: string;
    manager: string;
    description: string;
    website: string;
    email: string;
    phone: string;
    gallery: string[];
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}

export const dummyFoodData: FoodItem[] = [
  {
    id: '1',
    name: 'Hamburguesa Clásica',
    image: '/food1.png', 
    price: 150,
    rating: 4,
    description: 'Jugosa carne de res 100% artesanal, queso cheddar derretido, lechuga fresca, tomate y nuestra salsa especial de la casa. Acompañada de papas.',
    pickupTime: '14:00 - 16:00',
    portions: 5,
    type: 'Platillo',
    cookedDate: 'Hoy, 12:00 PM',
    category: 'Carnes',
    restaurant: {
      name: 'Fonda Matilda',
      logo: '/ComiGo-Logo.png',
      address: 'Av. Universidad 45, Centro, Querétaro',
      category: 'Cocina Económica',
      hours: '09:00 - 18:00',
      days: 'Lunes - Sábado',
      avgCost: '$100 - $150 MXN',
      manager: 'Matilda Gómez',
      description: 'Cocina tradicional con el sabor de hogar que te encanta. Ingredientes frescos del mercado local.',
      website: 'www.fondamatilda.com',
      email: 'contacto@fondamatilda.com',
      phone: '+52 442 111 2233',
      gallery: ['/food1.png', '/FondoLanding.png', '/ComiGo.png'],
      coordinates: { lat: 20.5923, lng: -100.3900 }
    }
  },
  {
    id: '2',
    name: 'Paquete Desayuno',
    image: '/food-delivery-happy.jpg',
    price: 85,
    rating: 5,
    description: 'Incluye café americano grande de grano recién molido, un cuernito horneado esta mañana relleno de jamón de pavo y queso manchego, y jugo.',
    pickupTime: '08:00 - 11:00',
    portions: 10,
    type: 'Paquete',
    cookedDate: 'Hoy, 07:00 AM',
    category: 'Cafetería',
    restaurant: {
      name: 'Café El Despertar',
      logo: '/ComiGo-Logo.png',
      address: 'Calle 5 de Mayo 12, Centro, Querétaro',
      category: 'Cafetería / Panadería',
      hours: '07:00 - 14:00',
      days: 'Lunes - Domingo',
      avgCost: '$80 - $120 MXN',
      manager: 'Jorge Campos',
      description: 'El mejor café de especialidad de la ciudad, acompañado de panadería artesanal hecha en casa.',
      website: 'www.eldespertar.cafe',
      email: 'hola@eldespertar.cafe',
      phone: '+52 442 999 8877',
      gallery: ['/food-delivery-happy.jpg', '/FondoLanding.png', '/ComiGo.png'],
      coordinates: { lat: 20.5940, lng: -100.3930 }
    }
  },
  {
    id: '3',
    name: 'Tacos Dorados (3 pzas)',
    image: '/sandwich-hero.jpg',
    price: 45,
    rating: 3,
    description: 'Orden de 3 tacos dorados de pollo con crema, queso, lechuga y salsa verde. Crujientes y deliciosos.',
    pickupTime: '13:00 - 17:00',
    portions: 20,
    type: 'Platillo',
    cookedDate: 'Hoy, 11:00 AM',
    category: 'Mexicana',
    restaurant: {
      name: 'Antojitos Doña Pelo',
      logo: '/ComiGo-Logo.png',
      address: 'Mercado de la Cruz, Local 45',
      category: 'Antojitos Mexicanos',
      hours: '18:00 - 23:00',
      days: 'Jueves - Domingo',
      avgCost: '$50 - $100 MXN',
      manager: 'Doña Pelos',
      description: 'Los antojitos más famosos del mercado. Sabor auténtico y precios justos.',
      website: 'www.facebook.com/donapelo',
      email: 'ventas@donapelo.com',
      phone: '+52 442 555 4433',
      gallery: ['/sandwich-hero.jpg', '/FondoLanding.png', '/ComiGo.png'],
      coordinates: { lat: 20.5950, lng: -100.3850 }
    }
  },
  {
    id: '4',
    name: 'Rebanada de Pastel',
    image: '/food-hero-mobile.jpg',
    price: 35,
    rating: 5,
    description: 'Rebanada de pastel de tres leches con durazno. El postre perfecto para alegrar tu tarde.',
    pickupTime: '10:00 - 20:00',
    portions: 8,
    type: 'Platillo',
    cookedDate: 'Ayer',
    category: 'Panadería',
    restaurant: {
      name: 'Panadería La Espiga',
      logo: '/ComiGo-Logo.png',
      address: 'Av. Zaragoza 100, Centro',
      category: 'Panadería Tradicional',
      hours: '06:00 - 21:00',
      days: 'Lunes - Domingo',
      avgCost: '$20 - $200 MXN',
      manager: 'Luis Panadero',
      description: 'Panadería de tradición con más de 50 años en Querétaro. Horneamos con amor todos los días.',
      website: 'www.laespiga.mx',
      email: 'pedidos@laespiga.mx',
      phone: '+52 442 222 1111',
      gallery: ['/food-hero-mobile.jpg', '/FondoLanding.png', '/ComiGo.png'],
      coordinates: { lat: 20.5890, lng: -100.3950 }
    }
  },
];