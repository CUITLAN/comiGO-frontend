'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Agregado para navegación
import { useRouter } from 'next/navigation';
import { Bag } from '@solar-icons/react';
import { CartFoodCard } from '@/components/client/cartFood';
import { Button } from '@/components/ui/button';
import EmptyDisplay from '@/components/empty-display/EmptyDisplay';
import { ConfirmPurchaseDialog } from '@/components/ui/modal/ConfirmPurchaseDialog'; 
import { toast } from 'sonner'; 
import axios from 'axios';

// Stores
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function CartPage() {
  const router = useRouter();
  
  // 1. Acceso al Store del Carrito
  const { items: cartItems, removeItem, clearCart } = useCartStore();
  
  // 2. Acceso al Usuario (para crear la orden)
  const { user, accessToken } = useAuthStore();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false); 
  const [isProcessing, setIsProcessing] = useState(false);

  // Cálculos financieros
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const serviceFee = subtotal * 0.05; 
  const donation = subtotal * 0.05;   
  const total = subtotal + serviceFee + donation;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handleConfirmPurchase = async () => {
    if (!user || !accessToken) {
        toast.error("Debes iniciar sesión para completar la compra");
        router.push('/login');
        return;
    }

    setIsProcessing(true);

    try {
        // 3. Crear una orden por cada ítem en el carrito
        // (Idealmente el backend tendría un endpoint de 'bulk-create', pero iteramos por ahora)
        const orderPromises = cartItems.map(item => {
            return axios.post(
                `${API_URL}/orders`, 
                {
                    userId: user.id,
                    productId: item.id,
                    branchId: item.branchId,
                    quantity: item.quantity,
                    totalPrice: item.price * item.quantity, // Total por línea
                    // pickupCode: se genera en backend si no se envía
                },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
        });

        await Promise.all(orderPromises);

        // 4. Éxito: Limpiar y Notificar
        clearCart();
        setIsConfirmOpen(false);
        
        toast.success("¡Pedido Confirmado!", {
            description: "Se ha notificado al restaurante. Revisa 'Mis Pedidos' para ver el código de entrega.",
            duration: 5000,
            style: {
                background: '#F0FDF4', 
                border: '1px solid #4A7729',
                color: '#15803d'
            }
        });

        // Opcional: Redirigir a la lista de pedidos
        // router.push('/client/user/orders');

    } catch (error) {
        console.error("Error creando orden:", error);
        toast.error("Hubo un problema al procesar tu pedido. Intenta nuevamente.");
    } finally {
        setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] pb-24"> 
      
      {/* HEADER */}
      <div className="sticky top-0 z-30 bg-[#EBEBEB] px-6 py-3 flex justify-between items-center shadow-sm">
        <h1 className="text-lg font-bold text-[#0C3252] tracking-wide uppercase">Tu Carrito</h1>
        <div className="text-black">
            <Bag className="w-6 h-6" />
        </div>
      </div>

      <div className="p-4 space-y-6 flex-1"> 
        
        {/* Banner */}
        <div className="relative w-full h-32 rounded-2xl overflow-hidden shadow-md group shrink-0">
            <Image
                src="/Carrusel2.jpg"
                alt="Banner Donación"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center px-6 text-center">
                <h2 className="text-white font-bold text-lg leading-snug drop-shadow-md">
                    Las ONGS Mexicanas se benefician de tu compra
                </h2>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#529A60]" />
        </div>

        {/* Lista de Items */}
        <div className="space-y-3">
            {cartItems.length > 0 ? (
                cartItems.map((item) => (
                    <CartFoodCard 
                        key={item.id} 
                        item={item} 
                        onRemove={() => removeItem(item.id)}
                    />
                ))
            ) : (
                <div className="py-10 flex flex-col items-center text-center">
                    <EmptyDisplay
                        icon={<Bag className="w-20 h-20 text-gray-300" />} 
                        firstLine="Tu carrito está vacío"
                        secondline="Explora nuestros platillos para salvar comida."
                    />
                    <Link href="/client/home">
                        <Button className="mt-4 bg-[#529A60] hover:bg-[#468753] text-white">
                            Explorar Menú
                        </Button>
                    </Link>
                </div>
            )}
        </div>

      </div>

      {/* Footer de Totales */}
      {cartItems.length > 0 && (
          <div className="px-6 bg-[#FDFBF7] pt-4">
            <hr className="border-gray-300 mb-4" />

            <div className="space-y-1 text-right text-sm text-gray-700 font-medium mb-4">
                <p>Tu pedido: <span className="font-bold">{formatCurrency(subtotal)}</span></p>
                <p>Servicio (5%): <span className="font-bold">{formatCurrency(serviceFee)}</span></p>
                <p>Donación ONG (5%): <span className="font-bold text-[#529A60]">{formatCurrency(donation)}</span></p>
            </div>

            <div className="space-y-4">
                <div className="flex justify-end">
                    <div className="border border-gray-300 rounded-lg px-4 py-1.5 bg-white shadow-sm">
                        <span className="font-extrabold text-lg text-black">
                            Total: {formatCurrency(total)}
                        </span>
                    </div>
                </div>

                <p className="text-[10px] text-gray-400 text-right truncate">
                    Gracias por ayudarnos a salvar comida.
                </p>

                <Button 
                    className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white text-base font-bold h-11 rounded-xl shadow-md mb-2"
                    onClick={() => setIsConfirmOpen(true)}
                    disabled={isProcessing}
                >
                    {isProcessing ? 'Procesando...' : 'Confirmar Compra'}
                </Button>
            </div>
          </div>
      )}

      <ConfirmPurchaseDialog 
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirm={handleConfirmPurchase}
        total={formatCurrency(total)}
      />

    </div>
  );
}