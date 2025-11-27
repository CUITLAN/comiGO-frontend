import { notFound } from 'next/navigation';
import FoodDetailView from '@/components/client/FoodDetailedFood';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3000';

// 1. Fetch de la Orden (Estado, Código, IDs)
async function getOrder(id: string) {
    try {
        const res = await fetch(`${API_URL}/orders/${id}`, { cache: 'no-store' });
        if (!res.ok) {
            return null;
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching order details:", error);
        return null;
    }
}

// 2. Fetch del Producto (Detalles ricos: Branch, Mapa, Redes)
async function getProductDetails(productId: string) {
    try {
        const res = await fetch(`${API_URL}/products/${productId}`, { cache: 'no-store' });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error("Error fetching product details for order:", error);
        return null;
    }
}

// Helper para horario
const formatOpeningHours = (hours?: string | Record<string, string>) => {
    if (!hours) return 'Horario no disponible';
    if (typeof hours === 'string') return hours;
    return Object.values(hours)[0] || 'Consultar en restaurante';
};

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    // Paso A: Obtener la orden básica
    const order = await getOrder(id);

    if (!order) {
        return notFound();
    }

    // Paso B: Hidratar con datos completos del producto/restaurante
    // Esto es clave para obtener la descripción completa y el mapa
    const fullProduct = order.product?.id ? await getProductDetails(order.product.id) : null;

    // Paso C: Consolidar datos (Estrategia de Fusión)
    // Prioridad: FullProduct > Order.Product > Default
    const productData = fullProduct || order.product || {};
    
    // Prioridad Branch: FullProduct.Branch > Order.Branch > Default
    // Usamos el del producto porque suele tener la lat/lng correcta
    const branchData = fullProduct?.branch || order.branch || {};
    
    // Prioridad Restaurant: Branch.Restaurant > Default
    const restaurantData = branchData.restaurant || {}; 

    // --- DEBUGGING COORDENADAS ---
    // Revisa estos logs en tu terminal para ver qué está llegando
    const rawLat = branchData.latitude || branchData.lat;
    const rawLng = branchData.longitude || branchData.lng;
    console.log(`📍 [Order Debug] Coordenadas: Lat=${rawLat}, Lng=${rawLng}`);

    // Validación de Coordenadas (Fallback al centro si fallan)
    const defaultLat = 20.5888; 
    const defaultLng = -100.3899;
    
    const lat = rawLat ? parseFloat(rawLat) : defaultLat;
    const lng = rawLng ? parseFloat(rawLng) : defaultLng;

    // Mapeo de Estado
    let statusLabel = 'Pendiente';
    const s = order.status?.toLowerCase();
    if (s === 'ready') statusLabel = 'Listo para recoger';
    else if (s === 'completed') statusLabel = 'Entregado';
    else if (s === 'cancelled') statusLabel = 'Cancelado';

    // Construcción de Galería
    const restaurantImages = [
        restaurantData.logoUrl || '/placeholder-restaurant.png',
        productData.imageUrl || '/placeholder-food.png',
    ].filter(img => !img.includes('placeholder'));

    const mappedData = {
        id: productData.id || order.product?.id,
        name: productData.name || 'Producto no disponible',
        price: Number(order.totalPrice),
        image: productData.imageUrl || '/placeholder-food.png',
        rating: 0, 
        pickupTime: `${productData.pickupStartTime?.slice(0,5) || '10:00'} - ${productData.pickupEndTime?.slice(0,5) || '20:00'}`,
        portions: order.quantity,
        type: productData.type || 'Platillo',
        
        // AQUÍ CORREGIMOS LA DESCRIPCIÓN
        description: productData.description || 'Sin descripción disponible para este pedido.',
        
        cookedDate: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '',
        category: productData.category || 'General',
        restaurant: {
            id: branchData.id || 'unknown',
            name: restaurantData.name || branchData.name || 'Restaurante',
            gallery: restaurantImages.length > 0 ? restaurantImages : ['/placeholder-food.png'],
            
            // COORDENADAS VALIDADAS PARA EL MAPA
            coordinates: { lat, lng },
            
            address: branchData.address || 'Dirección no disponible',
            category: 'Restaurante',
            hours: formatOpeningHours(branchData.openingHours),
            days: 'Lun - Dom',
            avgCost: '$$',
            manager: 'Gerente',
            
            // INFORMACIÓN DE CONTACTO
            website: restaurantData.website || 'No disponible',
            email: restaurantData.email || 'contacto@comigo.app',
            phone: branchData.phone || 'Sin teléfono'
        }
    };

    return (
        <FoodDetailView 
            data={mappedData} 
            actionType="order" 
            orderStatus={statusLabel as any}
            accessCode={order.pickupCode} 
            cancellationReason={order.cancellationReason}
        />
    );
}