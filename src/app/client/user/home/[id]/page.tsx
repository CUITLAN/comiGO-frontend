import { notFound } from 'next/navigation';
import FoodDetailView from '@/components/client/FoodDetailedFood';
import { dummyFoodData } from '@/data/foodData'; 

export default async function FoodDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    // Buscamos el item directamente en la data centralizada
    const foodItem = dummyFoodData.find(item => item.id === id);

    if (!foodItem) {
        return notFound();
    }

    // Pasamos el objeto completo
    return <FoodDetailView data={foodItem} />;
}