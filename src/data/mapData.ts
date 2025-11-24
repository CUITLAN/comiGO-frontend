export interface MapRestaurant {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  category: string;
  logo: string; // URL del logo para el pin
}

// Coordenadas simuladas en Ciudad de México (Centro)
export const mapRestaurants: MapRestaurant[] = [
  {
    id: '1',
    name: 'Café 30-30',
    coordinates: { lat: 19.4326, lng: -99.1332 },
    category: 'Cafetería',
    logo: '/ComiGo-Logo.png' // Usamos el logo de ComiGo como placeholder
  },
  {
    id: '2',
    name: 'Tacos El Califa',
    coordinates: { lat: 19.4350, lng: -99.1400 },
    category: 'Mexicana',
    logo: '/food-hero-mobile.jpg'
  },
  {
    id: '3',
    name: 'Panadería Rosetta',
    coordinates: { lat: 19.4200, lng: -99.1600 },
    category: 'Panadería',
    logo: '/sandwich-hero.jpg'
  }
];