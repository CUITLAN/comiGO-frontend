import { notFound } from 'next/navigation';
import { dummyRestaurantData } from '@/data/restaurantData';
import { dummyFoodData } from '@/data/foodData';
import RestaurantDetailView from '@/components/client/RestaurantDetailedVIew';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function RestaurantDetailPage({ params }: PageProps) {
    const { id } = await params;

    // 1. Buscar el restaurante
    const restaurant = dummyRestaurantData.find(r => r.id === id);

    if (!restaurant) return notFound();

    // 2. Filtrar comida de este restaurante
    const restaurantMenu = dummyFoodData.filter(
        food => food.restaurant.name === restaurant.name
    );

    // 3. Renderizar la vista cliente
    return <RestaurantDetailView restaurant={restaurant} menu={restaurantMenu} />;
}