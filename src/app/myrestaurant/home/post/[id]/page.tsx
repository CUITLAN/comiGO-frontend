import React from 'react';
import FoodPublishForm from '@/components/forms/vacancy/FoodPublishForm';
import { DataVacancies } from '@/data/testDataVacancies';
import { FoodPublishFormType } from '@/components/tables/schemas/foodPublishEschema';
import { notFound } from 'next/navigation';

interface PageProps {
    params: {
        id: string;
    }
}

export default function EditProductPage({ params }: PageProps) {
    // 1. Buscamos el elemento en nuestra "Base de Datos" local
    // Convertimos el id a número porque en DataVacancies el id es número
    const vacancy = DataVacancies.find(v => v.id === Number(params.id));

    if (!vacancy) {
        return notFound(); // Muestra la página 404 si no existe el ID
    }

    // 2. Mapeamos los datos de Vacancy -> FoodPublishFormType
    // Esto es necesario porque tu interfaz de base de datos es ligeramente diferente a la del formulario
    const initialData: FoodPublishFormType = {
        productName: vacancy.productName,
        foodType: vacancy.foodType,
        category: vacancy.category as string,
        // Simulamos el ID de la sucursal basándonos en el nombre, 
        // en un caso real esto vendría directo de la BD
        branchId: vacancy.branch === 'Sucursal Centro' ? 'branch-1' : 
                  vacancy.branch === 'Sucursal Norte' ? 'branch-2' : 'branch-1',
        portions: vacancy.portions,
        description: vacancy.description,
        price: vacancy.price,
        elaborationDate: vacancy.elaborationDate,
        pickupStartTime: vacancy.pickupStartTime,
        pickupEndTime: vacancy.pickupEndTime,
        deadlineDate: vacancy.deadlineDate,
        finalOffer: vacancy.finalOffer,
        productImage: vacancy.productImage || null,
        // Campos que requiere el form pero no están en Vacancy directamente o son extra
        pickupTimeType: '', 
    };

    return (
        <main className='flex flex-col items-center py-10 min-h-screen bg-gray-50'>
            <div className='w-full max-w-4xl flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm'>
                {/* 3. Renderizamos el formulario en modo EDICIÓN */}
                <FoodPublishForm initialData={initialData} isEditing={true} />
            </div>
        </main>
    );
}