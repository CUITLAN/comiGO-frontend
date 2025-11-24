'use client';

import { useState } from 'react';
import TitleSection from '@/components/common/TitleSection';
import { Shop } from '@solar-icons/react'; 
import { Button } from '@/components/ui/button';
import MapSection from '@/components/ui/mapSection';
import NewBranchDialog from '@/components/employer/newvranch';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'sonner'; // 1. Importamos toast

const DayCircle = ({ label, active }: { label: string, active: boolean }) => (
    <div className={`
        w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border
        ${active 
            ? 'border-[#4A7729] text-[#4A7729] bg-[#4A7729]/10' 
            : 'border-gray-300 text-gray-300 bg-white'
        }
    `}>
        {label}
    </div>
);

export default function BranchesPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [currentBranch, setCurrentBranch] = useState("sucursal-1");

  const methods = useForm({
    defaultValues: {
        address: 'Av. Universidad, Centro, Qro.',
        location: { lat: 20.5888, lng: -100.3899 },
        openTime: '09:00',
        closeTime: '22:00',
        activeDays: ['L', 'M', 'Mi', 'J', 'V', 'S'] 
    }
  });

  const { control, setValue, watch } = methods;

  const sectionConfig = {
    branches: {
      icon: <Shop size={24} weight="Bold" />,
      title: 'SUCURSALES Y PUNTOS',
      description: 'Consulte la información de su restaurante',
    },
  };

  // Función para manejar el guardado y la notificación
  const handleEditToggle = () => {
    if (isEditing) {
        // Si ya estábamos editando y damos click, significa "Guardar"
        toast.success("Cambios guardados", {
            description: "La información de la sucursal se ha actualizado correctamente.",
            duration: 3000,
        });
    }
    setIsEditing(!isEditing);
  };

  return (
    <FormProvider {...methods}>
        <div className="mr-20 space-y-8 p-4 md:p-6 w-full max-w-5xl">
        
        <TitleSection sections={sectionConfig} currentSection="branches" />

        <div className="flex justify-between items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex items-center gap-3 w-full max-w-md">
                <span className="font-bold text-gray-700">Sucursal:</span>
                <select 
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 focus:ring-2 focus:ring-[#4A7729] outline-none"
                    value={currentBranch}
                    onChange={(e) => setCurrentBranch(e.target.value)}
                >
                    <option value="sucursal-1">La Mercaderia - Centro</option>
                    <option value="sucursal-2">La Mercaderia - Juriquilla</option>
                </select>
            </div>
            
            <NewBranchDialog />
        </div>

        <div className={`
            rounded-xl border bg-white overflow-hidden transition-all duration-300 shadow-sm pb-6
            ${isEditing ? 'border-[#4A7729] ring-1 ring-[#4A7729]/20' : 'border-gray-300'}
        `}>
            <div className="flex items-center justify-between px-8 py-4 border-b border-gray-100 bg-[#FAFAFA]">
                <h3 className="text-base font-bold text-gray-800">Ubicación y Orientación</h3>
                <Button 
                    variant="outline" 
                    onClick={handleEditToggle} // Usamos el manejador actualizado
                    className={`h-9 px-6 ${isEditing ? 'bg-[#4A7729] text-white hover:bg-[#3d6321]' : 'text-[#008BD8] border-[#008BD8] hover:bg-blue-50'}`}
                >
                    {isEditing ? 'Guardar' : 'Editar'}
                </Button>
            </div>

            <div className="p-8 grid grid-cols-1 gap-8">
                
                <MapSection 
                    control={control} 
                    setValue={setValue} 
                    isEditing={isEditing} 
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-3 block">Días laborales</label>
                        <div className="flex gap-2">
                            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
                                <DayCircle key={i} label={d} active={watch('activeDays').includes(d === 'M' && i === 2 ? 'Mi' : d)} />
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-3 block">Horario</label>
                        <div className="flex items-center gap-3">
                            <div className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-600 text-center">
                                {watch('openTime')}
                            </div>
                            <span className="text-gray-400">-</span>
                            <div className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-600 text-center">
                                {watch('closeTime')}
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">Seleccione el rango de horas (Solo editable en configuración avanzada)</p>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                    <h4 className="font-bold text-gray-800 text-center mb-4">Fotografías</h4>
                    <div className="h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-sm">
                        Galería de la sucursal
                    </div>
                </div>

            </div>
        </div>

        </div>
    </FormProvider>
  );
}