'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "@/components/forms/FormInput";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MapSection from "../ui/mapSection";
import { toast } from "sonner"; // 1. Importamos toast

const newBranchSchema = z.object({
  name: z.string().min(3, "Nombre requerido"),
  category: z.string().min(1, "Selecciona una categoría"),
  openTime: z.string().min(1, "Requerido"),
  closeTime: z.string().min(1, "Requerido"),
  days: z.array(z.string()).min(1, "Selecciona al menos un día"),
  address: z.string().min(5, "La dirección es requerida"),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  })
});

type NewBranchForm = z.infer<typeof newBranchSchema>;

const branchCategories = [
    { value: 'cafeteria', label: 'Cafetería' },
    { value: 'restaurante', label: 'Restaurante' },
    { value: 'fonda', label: 'Fonda / Cocina Económica' },
    { value: 'comida-rapida', label: 'Comida Rápida' },
    { value: 'bar', label: 'Bar / Cantina' },
    { value: 'panaderia', label: 'Panadería / Pastelería' },
    { value: 'food-truck', label: 'Food Truck' },
    { value: 'dark-kitchen', label: 'Dark Kitchen (Solo para llevar)' },
];

const daysOptions = [
    { id: 'L', label: 'L' }, { id: 'M', label: 'M' }, { id: 'Mi', label: 'M' },
    { id: 'J', label: 'J' }, { id: 'V', label: 'V' }, { id: 'S', label: 'S' }, { id: 'D', label: 'D' }
];

export default function NewBranchDialog() {
  const [open, setOpen] = useState(false);
  
  const methods = useForm<NewBranchForm>({
    resolver: zodResolver(newBranchSchema),
    defaultValues: {
      name: '', 
      category: '', 
      openTime: '', 
      closeTime: '', 
      days: [],
      address: '',
      location: { lat: 20.5888, lng: -100.3899 } 
    }
  });

  const { control, handleSubmit, setValue, watch, register, formState: { errors }, reset } = methods;
  const selectedDays = watch('days');

  const toggleDay = (day: string) => {
    const current = selectedDays || [];
    if (current.includes(day)) {
      setValue('days', current.filter(d => d !== day));
    } else {
      setValue('days', [...current, day]);
    }
  };

  const onSubmit = (data: NewBranchForm) => {
    // Aquí iría la lógica de API
    console.log("Nueva Sucursal Creada:", data);

    // 2. Disparamos la alerta de éxito
    toast.success("Nueva sucursal creada", {
        description: "La sucursal ha sido creada correctamente.",
        duration: 3000,
    });

    setOpen(false); 
    reset(); 
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#008BD8] hover:bg-[#0077B3] text-white font-medium px-6">
            Nueva sucursal
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#0C3252] text-xl font-bold">Agregar Nueva Sucursal</DialogTitle>
        </DialogHeader>
        
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-2">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput 
                        control={control} 
                        name="name" 
                        label="Nombre de la sucursal" 
                        placeholder="Ej. Sucursal Centro" 
                    />
                    
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">
                            Categoría <span className="text-red-500">*</span>
                        </label>
                        <select 
                            {...register('category')} 
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 focus:ring-2 focus:ring-[#4A7729] outline-none h-[42px]" 
                        >
                            <option value="">Selecciona una opción</option>
                            {branchCategories.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                        {errors.category && <span className="text-xs text-red-500">{errors.category.message}</span>}
                    </div>
                </div>

                <div className="border-t border-b border-gray-100 py-4 space-y-2">
                    <h4 className="text-sm font-bold text-gray-800">Ubicación</h4>
                    <MapSection 
                        control={control} 
                        setValue={setValue} 
                        isEditing={true} 
                    />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Apertura</label>
                        <input type="time" {...register('openTime')} className="w-full border border-gray-300 rounded-md p-2 mt-1 text-sm outline-none focus:border-[#4A7729]" />
                        {errors.openTime && <span className="text-xs text-red-500">Requerido</span>}
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Cierre</label>
                        <input type="time" {...register('closeTime')} className="w-full border border-gray-300 rounded-md p-2 mt-1 text-sm outline-none focus:border-[#4A7729]" />
                        {errors.closeTime && <span className="text-xs text-red-500">Requerido</span>}
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Días Laborales</label>
                    <div className="flex gap-2 justify-start flex-wrap">
                        {daysOptions.map((day) => (
                            <button
                                key={day.id}
                                type="button"
                                onClick={() => toggleDay(day.id)}
                                className={`
                                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all
                                    ${selectedDays.includes(day.id) 
                                        ? 'bg-[#4A7729] text-white border border-[#4A7729] shadow-md' 
                                        : 'bg-white text-gray-400 border border-gray-300 hover:border-[#4A7729]'
                                    }
                                `}
                            >
                                {day.label}
                            </button>
                        ))}
                    </div>
                    {errors.days && <span className="text-xs text-red-500 mt-1 block">Selecciona al menos un día</span>}
                </div>

                <div className="flex justify-end gap-3 pt-4 sticky bottom-0 bg-white border-t border-gray-50 mt-4">
                    <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button type="submit" className="bg-[#4A7729] text-white hover:bg-[#3d6321]">Guardar Sucursal</Button>
                </div>
            </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}