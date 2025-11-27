import { notFound } from 'next/navigation';
import FoodDetailView from '@/components/client/FoodDetailedFood';

// DTO que esperamos de la API
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
            facebookUrl?: string;
            instagramUrl?: string;
        }
    }
}

async function getProduct(id: string) {
    // Validación básica del ID antes de llamar a la API
    if (!id || id === 'undefined' || id === 'null') {
        return null;
    }

    try {
        const apiUrl = process.env.AUTH0_BASE_URL || 'http://127.0.0.1:3000';
        
        
        const res = await fetch(`${apiUrl}/products/${id}`, { 
            cache: 'no-store' 
        });
        
        if (!res.ok) {
            if (res.status === 404) {
                console.warn(`⚠️ [Server] Producto no encontrado en API (404). ID: ${id}`);
            } else {
                console.error(`❌ [Server] Error API: ${res.status} ${res.statusText}`);
            }
            return null;
        }

        const data = await res.json();
        return data;

    } catch (error) {
        return null;
    }
}

const formatOpeningHours = (hours?: string | Record<string, string>) => {
    if (!hours) return 'Horario no disponible';
    if (typeof hours === 'string') return hours;
    // Intento de obtener el primer valor disponible si es objeto
    return Object.values(hours)[0] || 'Consultar en restaurante';
};

export default async function FoodDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    const product: ProductApiDto = await getProduct(id);

    if (!product) {
        // Si getProduct falla, mostramos la página 404 de Next.js
        return notFound();
    }

    // Construcción de Galería
    const restaurantImages = [
        product.branch.restaurant?.logoUrl || '/placeholder-restaurant.png',
        product.imageUrl || '/placeholder-food.png',
        '/placeholder-kitchen.png' 
    ].filter(img => !img.includes('placeholder') || img === '/placeholder-restaurant.png'); 

    // Mapeo seguro de datos
    const mappedFoodItem = {
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.imageUrl || '/placeholder-food.png',
        rating: 4.5, 
        pickupTime: `${product.pickupStartTime?.slice(0,5) || '10:00'} - ${product.pickupEndTime?.slice(0,5) || '20:00'}`,
        portions: product.portionsAvailable,
        type: (product.type as 'Platillo' | 'Paquete') || 'Platillo', // Fallback seguro
        description: product.description || 'Sin descripción disponible.',
        cookedDate: 'Hoy',
        category: product.category || 'General',
        restaurant: {
            id: product.branch.id, 
            name: product.branch.restaurant?.name || product.branch.name || 'Restaurante',
            gallery: restaurantImages.length > 0 ? restaurantImages : ['/placeholder-food.png'],
            coordinates: {
                lat: parseFloat(product.branch.latitude || '20.5888'), 
                lng: parseFloat(product.branch.longitude || '-100.3899')
            },
            address: product.branch.address || 'Dirección no disponible',
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

    return <FoodDetailView data={mappedFoodItem} />;
}