import { notFound } from 'next/navigation';
import FoodDetailView from '@/components/client/FoodDetailedFood';

// Mismo DTO y lógica de fetch que en la Home
interface ProductApiDto {
    id: string;
    name: string;
    description: string;
    price: string | number;
    imageUrl?: string;
    category?: string;
    type: string;
    portionsAvailable: number;
    pickupStartTime?: string;
    pickupEndTime?: string;
    branch: {
        id: string;
        name: string;
        address: string;
        latitude?: string;
        longitude?: string;
        phone?: string;
        openingHours?: string | Record<string, string>; 
        restaurant?: {
            name: string;
            logoUrl?: string;
            website?: string;
            email?: string;
        }
    }
}

async function getProduct(id: string) {
    try {
        // Usamos 127.0.0.1 para asegurar conexión local en SSR
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3000';
        const res = await fetch(`${apiUrl}/products/${id}`, { cache: 'no-store' });
        
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error("Error fetching product details for cart:", error);
        return null;
    }
}

const formatOpeningHours = (hours?: string | Record<string, string>) => {
    if (!hours) return 'Horario no disponible';
    if (typeof hours === 'string') return hours;
    return Object.values(hours)[0] || 'Consultar en restaurante';
};

export default async function CartDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    const product: ProductApiDto = await getProduct(id);

    if (!product) {
        return notFound();
    }

    // Mapeo de datos reales para la vista
    const mappedFoodItem = {
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.imageUrl || '/placeholder-food.png',
        rating: 4.5,
        pickupTime: `${product.pickupStartTime?.slice(0,5) || '10:00'} - ${product.pickupEndTime?.slice(0,5) || '20:00'}`,
        portions: product.portionsAvailable,
        type: (product.type as 'Platillo' | 'Paquete') || 'Platillo',
        description: product.description || 'Sin descripción.',
        cookedDate: 'Hoy',
        category: product.category || 'General',
        restaurant: {
            id: product.branch.id,
            name: product.branch.restaurant?.name || product.branch.name,
            gallery: [product.imageUrl || '/placeholder-food.png'],
            coordinates: {
                lat: parseFloat(product.branch.latitude || '20.59'), 
                lng: parseFloat(product.branch.longitude || '-100.39')
            },
            address: product.branch.address || 'Sin dirección',
            category: 'Restaurante',
            hours: formatOpeningHours(product.branch.openingHours),
            days: 'Lun - Dom',
            avgCost: '$$',
            manager: 'Gerente',
            website: product.branch.restaurant?.website || 'No disponible',
            email: product.branch.restaurant?.email || 'contacto@comigo.app',
            phone: product.branch.phone || 'Sin teléfono'
        }
    };

    // Renderizamos la vista en modo "remove" (eliminar del carrito)
    return <FoodDetailView data={mappedFoodItem} actionType="remove" />;
}