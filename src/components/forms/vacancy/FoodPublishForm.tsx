'use client';

import { useState, useEffect } from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FoodPublishFormType } from '@/components/tables/schemas/foodPublishEschema';
import { foodPublishSchema } from '@/components/tables/schemas/foodPublishEschema';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/forms/FormInput';
import FormSectionHeader from './FormSectionHeader'; 
import AddFoodImage from '@/components/ui/AddFoodImage';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox'; 
import { RadioGroupItem, RadioGroup } from '@/components/ui/RadioGroupItem';
import { toast } from 'sonner'; 
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore'; 
import { PRODUCT_CATEGORIES } from '@/interfaces/ProductCategory';
import BranchSelector from './branchselector';

const API_URL = 'http://localhost:3000/products';

interface FoodPublishFormProps {
    initialData?: FoodPublishFormType;
    isEditing?: boolean;
}

export default function FoodPublishForm({ initialData, isEditing = false }: FoodPublishFormProps) {
    const router = useRouter();
    const { accessToken, user } = useAuthStore();
    
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const lastDay = new Date(year, now.getMonth() + 1, 0).getDate();
    const minDate = `${year}-${month}-01`;       
    const maxDate = `${year}-${month}-${lastDay}`; 

    const methods = useForm<FoodPublishFormType>({
        resolver: zodResolver(foodPublishSchema),
        defaultValues: initialData || {
            foodType: 'Platillo', productName: '', category: '', branchId: '', portions: 1, description: '', price: 0, elaborationDate: '', pickupTimeType: '', deadlineDate: '', pickupStartTime: '', pickupEndTime: '', finalOffer: false, productImage: null,
        },
    });

    const { control, handleSubmit, setValue, trigger, register, reset } = methods;

    const onSubmit = async (data: FoodPublishFormType) => {
        
        if (!accessToken || !user || user.role !== 'restaurant_admin') {
            toast.error("Acceso denegado", { description: "Debes ser administrador." });
            router.replace('/login');
            return;
        }

        // 1. Construir FormData campo por campo (Como en Bruno)
        const formData = new FormData();
        
        // Campos de Texto (Mapeo Frontend -> Backend)
        formData.append('branchId', data.branchId);
        formData.append('name', data.productName); // productName -> name
        formData.append('description', data.description);
        formData.append('type', data.foodType);    // foodType -> type
        formData.append('category', data.category);
        formData.append('price', data.price.toString());
        formData.append('portionsAvailable', data.portions.toString()); // portions -> portionsAvailable
        
        formData.append('elaborationDate', data.elaborationDate);
        formData.append('deadlineDate', data.deadlineDate);
        formData.append('pickupStartTime', data.pickupStartTime);
        formData.append('pickupEndTime', data.pickupEndTime);
        formData.append('hasFinalOffer', String(data.finalOffer));
        
        // Archivo
        if (data.productImage instanceof File) {
            formData.append('file', data.productImage);
        }
        
        const url = isEditing ? `${API_URL}/${initialData?.id}` : API_URL;
        const method = isEditing ? axios.patch : axios.post;

        toast.promise(
            method(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`,
                }
            }),
            {
                loading: isEditing ? 'Guardando...' : 'Publicando...',
                success: (res) => {
                    if (!isEditing) reset();
                    router.push('/myrestaurant/home/publications'); 
                    return isEditing ? "Actualizado!" : "Comida creada exitosamente!";
                },
                error: (err) => {
                    console.error("❌ ERROR API:", err.response?.data || err);
                    return `Error: ${err.response?.data?.message || 'Fallo al conectar.'}`;
                },
            }
        );
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="px-12 py-10 space-y-8">
                
                <div className="text-center space-y-2 mb-8">
                    <h2 className="text-3xl font-bold text-[#4A7729]">
                        {isEditing ? 'Editar publicación' : 'Crear publicación'}
                    </h2>
                    <p className="text-gray-500">
                        {isEditing ? 'Modifica los detalles.' : 'Bien, subamos alguno de tus platillos.'}
                    </p>
                </div>

                <section className="space-y-6">
                    <FormSectionHeader title="Información general de el platillo" className="text-[#FF7F40] border-b border-gray-200 pb-2 mb-6 font-semibold text-lg" />

                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">La comida sera:</label>
                        <Controller
                            control={control}
                            name="foodType"
                            render={({ field }) => (
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Packete" id="packete" />
                                        <Label htmlFor="packete" className="cursor-pointer">Packete</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Platillo" id="platillo" />
                                        <Label htmlFor="platillo" className="cursor-pointer">Platillo</Label>
                                    </div>
                                </RadioGroup>
                            )}
                        />
                    </div>

                    <FormInput control={control} name="productName" label="Nombre de el producto*" type="text" description="Especifica el nombre de el producto" />

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Categoria*</label>
                        <select {...register('category')} className="border border-gray-300 rounded-md p-2 bg-gray-50 text-sm focus:ring-[#4A7729] focus:border-[#4A7729]">
                            <option value="">Selecciona una categoría</option>
                            {PRODUCT_CATEGORIES.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="md:col-span-3 flex flex-col gap-2">
                            <BranchSelector name="branchId" label="Sucursal*" />
                        </div>
                        <div className="md:col-span-1">
                            <FormInput control={control} name="portions" label="Porciones*" type="number" min={1} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Descripción*</label>
                        <textarea {...register('description')} rows={4} className="border border-gray-300 rounded-md p-2 bg-gray-50 text-sm w-full resize-none focus:ring-[#4A7729] focus:border-[#4A7729]" />
                    </div>

                    <div className="relative">
                        <FormInput control={control} name="price" label="Precio" type="number" min={0} />
                    </div>

                    <FormInput control={control} name="elaborationDate" label="Cuando elaboraste el producto?" type="date" min={minDate} max={maxDate} />
                </section>

                <section className="space-y-6 mt-8">
                    <FormSectionHeader title="Horario y fecha limite" className="text-[#FF7F40] border-b border-gray-200 pb-2 mb-6 font-semibold text-lg" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">Horario de recogida</label>
                                <div className="flex items-center gap-2">
                                    <input type="time" {...register('pickupStartTime')} className="border border-gray-300 rounded-md p-2 bg-gray-50 text-sm w-full" />
                                    <span>-</span>
                                    <input type="time" {...register('pickupEndTime')} className="border border-gray-300 rounded-md p-2 bg-gray-50 text-sm w-full" />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <FormInput control={control} name="deadlineDate" label="Dia limite" type="date" min={minDate} max={maxDate} />
                            <div className="flex flex-col gap-2 bg-gray-50 p-3 rounded border border-gray-200">
                                <div className="flex items-center space-x-2">
                                    <Controller control={control} name="finalOffer" render={({ field }) => (
                                        <Checkbox id="finalOffer" checked={field.value} onCheckedChange={field.onChange} />
                                    )} />
                                    <Label htmlFor="finalOffer" className="text-sm font-medium text-gray-700 cursor-pointer">Oferta final</Label>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="space-y-6 mt-8">
                    <FormSectionHeader title="Imagen de el producto" className="text-[#FF7F40] border-b border-gray-200 pb-2 mb-6 font-semibold text-lg" />
                    <div className="flex flex-col items-center">
                        <div className="w-full max-w-md">
                             <AddFoodImage control={control} setValue={setValue} trigger={trigger} />
                        </div>
                    </div>
                </section>

                <div className="flex justify-end pt-6">
                    <Button type="submit" className="bg-[#4285F4] hover:bg-[#3367D6] text-white px-8 py-2 rounded font-medium">
                        {isEditing ? 'Guardar Cambios' : 'Publicar'}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
}