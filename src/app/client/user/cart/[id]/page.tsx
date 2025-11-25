import { notFound } from 'next/navigation';
import FoodDetailView from '@/components/client/FoodDetailedFood';
import { dummyFoodData } from '@/data/foodData'; 

// Reutilizamos la lógica de datos ya que usamos los mismos IDs
export default async function CartDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    const foodItem = dummyFoodData.find(item => item.id === id);

    if (!foodItem) {
        return notFound();
    }

    // Renderizamos la vista en modo "eliminar"
    return <FoodDetailView data={foodItem} actionType="remove" />;
}