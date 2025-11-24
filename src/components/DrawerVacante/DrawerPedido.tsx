'use client';

import { Sale } from '@/interfaces/sale';
import { Button } from '@/components/ui/button';
import { DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerDescription } from '@/components/ui/drawer';
import { User, Calendar, Bag, Star, MapPoint, Tag, Layers } from '@solar-icons/react'; 
import { dateToLocaleDateString } from '@/lib/utils';

interface DrawerPedidoProps {
  // Extendemos la interfaz localmente solo para 'category' ya que 'unit' (tipo) ya viene en Sale
  sale: Sale & { category?: string }; 
  onClose: () => void;
}

export default function DrawerPedido({ sale, onClose }: DrawerPedidoProps) {
  
  const formatMoney = (amount: number) => 
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);

  return (
    <DrawerContent className="h-full w-[400px] max-w-full ml-auto rounded-l-xl rounded-r-none bg-white border-l border-gray-200 focus:outline-none z-[100]">
      
      {/* HEADER */}
      <DrawerHeader className="border-b border-gray-100 pb-4">
        <DrawerTitle className="text-2xl font-bold text-[#0C3252] flex items-center gap-2">
            <Bag className="text-[#4A7729]" />
            Detalle del Pedido
        </DrawerTitle>
        <DrawerDescription>ID Venta: #{sale.id}</DrawerDescription>
      </DrawerHeader>

      {/* BODY SCROLLABLE */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        
        {/* Sección Cliente */}
        <div className="space-y-3">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Cliente</h3>
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div className="bg-white p-2 rounded-full shadow-sm">
                    <User className="w-6 h-6 text-[#0C3252]" />
                </div>
                <div>
                    <p className="font-semibold text-gray-800">{sale.customerName || "Cliente Desconocido"}</p>
                    {/* Se eliminó la etiqueta "Cliente frecuente" */}
                </div>
            </div>
        </div>

        {/* Sección Producto */}
        <div className="space-y-3">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Producto</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                
                {/* Nombre y Unidad */}
                <div className="flex justify-between items-start mb-4">
                    <span className="font-bold text-lg text-[#0C3252] leading-tight w-3/4">
                        {sale.productName}
                    </span>
                    {/* Badge pequeño con el tipo (unit) */}
                    <span className="bg-[#EAF2FF] text-[#008BD8] text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wide">
                        {sale.unit}
                    </span>
                </div>
                
                {/* --- NUEVA INFORMACIÓN: Tipo y Categoría --- */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    {/* TIPO: Mapeado desde sale.unit (Packete / Platillo) */}
                    <div className="bg-gray-50 p-2 rounded border border-gray-100 flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase flex items-center gap-1 mb-1">
                            <Layers size={10} /> Tipo
                        </span>
                        <span className="text-sm font-semibold text-gray-700 capitalize truncate">
                            {sale.unit} 
                        </span>
                    </div>

                    {/* CATEGORÍA: Mapeado desde sale.category (Opcional/Default) */}
                    <div className="bg-gray-50 p-2 rounded border border-gray-100 flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase flex items-center gap-1 mb-1">
                            <Tag size={10} /> Categoría
                        </span>
                        <span className="text-sm font-semibold text-gray-700 capitalize truncate">
                            {sale.category || "General"}
                        </span>
                    </div>
                </div>

                {/* Info adicional (Fecha/Sucursal) */}
                <div className="space-y-2 text-sm text-gray-600 border-t border-gray-100 pt-3">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{dateToLocaleDateString(sale.saleDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPoint className="w-4 h-4 text-gray-400" />
                        <span>{sale.branch}</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Sección Valoración */}
        <div className="space-y-3">
             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Valoración del cliente</h3>
             <div className="flex items-center gap-1 bg-yellow-50/50 p-3 rounded-lg border border-yellow-100 w-fit">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                    key={star}
                    weight={star <= sale.rating ? "Bold" : "Linear"}
                    className={`w-5 h-5 ${star <= sale.rating ? "text-yellow-400" : "text-gray-300"}`}
                    />
                ))}
                <span className="ml-2 text-sm font-bold text-gray-700">({sale.rating}/5)</span>
             </div>
        </div>

        {/* Resumen de Pago */}
        <div className="border-t border-dashed border-gray-300 pt-4">
            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                <span>Precio unitario</span>
                {/* Calculamos el unitario dividiendo total / cantidad */}
                <span>{formatMoney(sale.price / sale.quantity)}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                <span>Cantidad</span>
                <span>x {sale.quantity}</span>
            </div>
            
            {/* Si existe método de pago, lo mostramos */}
            {sale.paymentMethod && (
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>Método de pago</span>
                    <span className="font-medium text-gray-700">{sale.paymentMethod}</span>
                </div>
            )}

            <div className="flex justify-between items-center bg-[#F8F7FA] p-4 rounded-lg border border-gray-100">
                <span className="font-bold text-[#0C3252]">Total Pagado</span>
                <span className="font-bold text-xl text-[#4A7729]">{formatMoney(sale.price)}</span>
            </div>
        </div>

      </div>

      {/* FOOTER */}
      <DrawerFooter className="border-t border-gray-100 pt-4 pb-6">
        <Button onClick={onClose} variant="ghost" className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium">
            Cerrar Detalle
        </Button>
      </DrawerFooter>
    </DrawerContent>
  );
}