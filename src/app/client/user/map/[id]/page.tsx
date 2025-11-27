import { notFound } from 'next/navigation';
import { dummyRestaurantData } from '@/data/restaurantData';
import { dummyFoodData } from '@/data/foodData';
import RestaurantDetailView from '@/components/client/RestaurantDetailedVIew';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function MapRestaurantDetailPage({ params }: PageProps) {
    const { id } = await params;

    // 1. Buscar restaurante
    const restaurant = dummyRestaurantData.find(r => r.id === id);

    if (!restaurant) return notFound();

    // 2. Filtrar comida
    const restaurantMenu = dummyFoodData.filter(
        food => food.restaurant.name === restaurant.name
    );

    // 3. Renderizar Vista
    // IMPORTANTE: Configuramos backLink para regresar al mapa, no a favoritos
    return (
        <RestaurantDetailView 
            restaurant={restaurant} 
            menu={restaurantMenu} 
            backLink="/client/map"
        />
    );
}