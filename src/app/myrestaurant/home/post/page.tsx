import React from 'react'
import VacancyPublishForm from '@/components/forms/vacancy/VacancyPublishForm';

export default function VacancyFormPage()  {
  return (
    <main className='flex flex-col bg-accent z-0 items-center py-13 m-0'>
        <div className='w-7/12 align-center flex flex-col bg-white !z-0 rounded-lg border-1 border-zinc-300 pb-12'>
            <VacancyPublishForm />
        </div>
    </main>
  )
}
