'use client';

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
// Opciones simuladas para los selects
const categories = [
    { value: 'cafeteria', label: 'Cafetería' },
    { value: 'restaurant', label: 'Restaurante' },
    { value: 'bakery', label: 'Panadería' },
];

const branches = [
    { value: 'branch-1', label: 'Sucursal Centro' },
    { value: 'branch-2', label: 'Sucursal Norte' },
];

const pickupTypes = [
    { value: 'morning', label: 'Horario Matutino' },
    { value: 'afternoon', label: 'Horario Vespertino' },
    { value: 'flexible', label: 'Horario Flexible' },
];

export default function FoodPublishForm() {
    const methods = useForm<FoodPublishFormType>({
        resolver: zodResolver(foodPublishSchema),
        defaultValues: {
            foodType: 'Platillo',
            productName: '',
            category: '',
            branchId: '',
            portions: 1,
            description: '',
            price: 0,
            elaborationDate: '',
            pickupTimeType: '',
            deadlineDate: '',
            pickupStartTime: '',
            pickupEndTime: '',
            finalOffer: false,
            productImage: null, // Aquí se guardará la imagen
        },
    });

    // Extraemos setValue y trigger para pasarlos al AddImageStep si los necesita
    const { control, handleSubmit, setValue, trigger } = methods;

    const onSubmit = (data: FoodPublishFormType) => {
        console.log('Publicación creada:', data);
        // Aquí tu lógica de API para enviar data + data.productImage
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="px-12 py-10 space-y-8">
                
                {/* HEADER */}
                <div className="text-center space-y-2 mb-8">
                    <h2 className="text-3xl font-bold text-[#4A7729]">Crear publicación</h2>
                    <p className="text-gray-500">Bien, subamos alguno de tus platillos y generemos todas las ventajas</p>
                </div>

                {/* --- SECCIÓN 1: INFORMACIÓN GENERAL --- */}
                <section className="space-y-6">
                    <FormSectionHeader 
                        title="Información general de el platillo" 
                        className="text-[#FF7F40] border-b border-gray-200 pb-2 mb-6 font-semibold text-lg" 
                    />

                    {/* Tipo de Comida (Radio Group) */}
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">La comida sera:</label>
                        <Controller
                            control={control}
                            name="foodType"
                            render={({ field }) => (
                                <RadioGroup 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value} 
                                    className="flex gap-6"
                                >
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
                    <p className="text-xs text-gray-400 -mt-4">
                        Si es un packete, seran 1 o mas productos no especificos mientras que con un platillo es un producto especifico que el usuario debera de recibir
                    </p>

                    {/* Nombre */}
                    <FormInput 
                        control={control} 
                        name="productName" 
                        label="Nombre de el producto*" 
                        type="text"
                        description="Especifica el nombre de el producto tal cual quieras que el usuario lo vea"
                    />

                    {/* Categoría */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Categoria*</label>
                        <select {...methods.register('category')} className="border border-gray-300 rounded-md p-2 bg-gray-50 text-sm focus:ring-[#4A7729] focus:border-[#4A7729]">
                            <option value="">Selecciona una categoría</option>
                            {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                        </select>
                        <p className="text-xs text-gray-400">Define la categoria que mas encaja con el producto</p>
                    </div>

                    {/* Sucursal y Porciones */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="md:col-span-3 flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">Sucursal*</label>
                            <select {...methods.register('branchId')} className="border border-gray-300 rounded-md p-2 bg-gray-50 text-sm w-full focus:ring-[#4A7729] focus:border-[#4A7729]">
                                <option value="">Selecciona sucursal</option>
                                {branches.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                            </select>
                            <p className="text-xs text-gray-400">Selecciona la sucursal en la que quieres publicar el producto</p>
                        </div>
                        <div className="md:col-span-1">
                            <FormInput 
                                control={control} 
                                name="portions" 
                                label="Porciones*" 
                                type="number" 
                                min={1}
                                description="Cantidad de porciones de el producto"
                            />
                        </div>
                    </div>

                    {/* Descripción */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Descripción*</label>
                        <textarea 
                            {...methods.register('description')} 
                            rows={4} 
                            className="border border-gray-300 rounded-md p-2 bg-gray-50 text-sm w-full resize-none focus:ring-[#4A7729] focus:border-[#4A7729]"
                        />
                        <p className="text-xs text-gray-400">Resume de el producto, como lo definirias para el usuario esto es opcional</p>
                    </div>

                    {/* Precio */}
                    <div className="relative">
                        <FormInput 
                            control={control} 
                            name="price" 
                            label="Precio" 
                            type="number"
                            min={0}
                            description="Establece el precio inicial de el producto, Este precio es en el que comenzara a publicarse"
                        />
                    </div>

                    {/* Fecha Elaboración */}
                    <FormInput 
                        control={control} 
                        name="elaborationDate" 
                        label="Cuando elaboraste el producto?" 
                        type="date" 
                        description="Seleccione el dia en el que elaboraste el producto o lo adquiriste en caso de ser producto base"
                    />
                </section>

                {/* --- SECCIÓN 2: HORARIO Y FECHA LÍMITE --- */}
                <section className="space-y-6 mt-8">
                    <FormSectionHeader 
                        title="Horario y fecha limite" 
                        className="text-[#FF7F40] border-b border-gray-200 pb-2 mb-6 font-semibold text-lg" 
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Columna Izquierda */}
                        <div className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">Horario de recogida*</label>
                                <select {...methods.register('pickupTimeType')} className="border border-gray-300 rounded-md p-2 bg-gray-50 text-sm w-full focus:ring-[#4A7729] focus:border-[#4A7729]">
                                    <option value="">Selecciona horario</option>
                                    {pickupTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                                </select>
                                <p className="text-xs text-gray-400">Seleccione el tipo de horario en el que el usuario podra recoger el producto</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">Horario</label>
                                <div className="flex items-center gap-2">
                                    <input type="time" {...methods.register('pickupStartTime')} className="border border-gray-300 rounded-md p-2 bg-gray-50 text-sm w-full focus:ring-[#4A7729] focus:border-[#4A7729]" />
                                    <span>-</span>
                                    <input type="time" {...methods.register('pickupEndTime')} className="border border-gray-300 rounded-md p-2 bg-gray-50 text-sm w-full focus:ring-[#4A7729] focus:border-[#4A7729]" />
                                </div>
                                <p className="text-xs text-gray-400">Seleccione el rango de horas</p>
                            </div>
                        </div>

                        {/* Columna Derecha */}
                        <div className="space-y-4">
                            <FormInput 
                                control={control} 
                                name="deadlineDate" 
                                label="Dia limite" 
                                type="date" 
                                description="Seleccione dia limite de el producto"
                            />

                            {/* Oferta final */}
                            <div className="flex flex-col gap-2 bg-gray-50 p-3 rounded border border-gray-200">
                                <div className="flex items-center space-x-2">
                                    <Controller
                                        control={control}
                                        name="finalOffer"
                                        render={({ field }) => (
                                            <Checkbox 
                                                id="finalOffer" 
                                                checked={field.value} 
                                                onCheckedChange={field.onChange} 
                                            />
                                        )}
                                    />
                                    <Label htmlFor="finalOffer" className="text-sm font-medium text-gray-700 cursor-pointer">
                                        Oferta final
                                    </Label>
                                </div>
                                <p className="text-xs text-gray-400">
                                    Seleccione si quieres ofrecer una oferta final, esta solo se activara faltando 3 horas antes de cerrar tu horario el ultimo dia
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- SECCIÓN 3: IMAGEN (USANDO AddImageStep) --- */}
                <section className="space-y-6 mt-8">
                    <FormSectionHeader 
                        title="Imagen de el producto" 
                        className="text-[#FF7F40] border-b border-gray-200 pb-2 mb-6 font-semibold text-lg" 
                    />
                    
                    <div className="flex flex-col items-center">
                        {/* Aquí integramos tu componente existente. 
                            Le pasamos 'name="productImage"' para que sepa qué campo controlar si soporta esa prop,
                            o confiamos en que use el contexto del formulario.
                        */}
                        <div className="w-full max-w-md">
                             <AddFoodImage 
                                control={control} 
                                setValue={setValue} 
                                trigger={trigger}
                                // Si tu componente AddImageStep soporta una prop 'name' o 'fieldName', úsala aquí.
                                // Por defecto en el ejemplo anterior usaba 'restaurantImages', 
                                // asegúrate de que tu componente AddImageStep sea genérico o apunte a 'productImage'.
                             />
                        </div>
                        
                        <p className="text-xs text-gray-400 text-center mt-4 max-w-lg">
                            Puedes agregar una imagen de el producto si lo deseas. Esto dara mas confianza al cliente de adquirirlo, sin embargo este paso no es obligatorio.
                        </p>
                    </div>
                </section>

                {/* BOTÓN PUBLICAR */}
                <div className="flex justify-end pt-6">
                    <Button type="submit" className="bg-[#4285F4] hover:bg-[#3367D6] text-white px-8 py-2 rounded font-medium">
                        Publicar
                    </Button>
                </div>

            </form>
        </FormProvider>
    );
}