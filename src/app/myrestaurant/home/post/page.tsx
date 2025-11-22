import React from 'react';
import FoodPublishForm from '@/components/forms/vacancy/FoodPublishForm';

export default function CreateProductPage() {
  return (
    <main className='flex flex-col items-center py-10 min-h-screen bg-gray-50'>
        <div className='w-full max-w-4xl flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm'>
            <FoodPublishForm />
        </div>
    </main>
  );
}