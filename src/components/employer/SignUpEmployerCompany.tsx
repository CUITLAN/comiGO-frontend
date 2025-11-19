'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employerSchema, EmployerFormType } from '@/validations/employerSchema';
import { Button } from '../ui/button';
import Link from 'next/link';
import ImageUploadStep from './ImageUploadSignUp';
import EmployerDetailsStep from './RestaurantDetailsStep';
import Stepper from '@/components/common/Stepper';
import CompanyDetails from './CompanyDetails';
import { CompanyFormType, companySchema } from '@/validations/companySchema';

export default function SignUpEmployerCompany() {
  const [step, setStep] = useState(1);

  const methods = useForm<CompanyFormType>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: '',
      companyEmail: '',
      companySector: '',
      companyDescription: '',
      companyInvestmentCountry: '',
      companyEmlpoyeesNumber: '',
      companyRFC: '',
      companyRazonSocial: '',
      companyAddressCountry: '',
      companyAddressState: '',
      companyAddressMunicipality: '',
      companyAddressColonia: '',
      companyAddressStreet: '',
      companyAddressZip: '',
      companyAddressNo: '',
    },
    mode: 'onSubmit'
  });

  const { control, handleSubmit, setValue, trigger } = methods;

  const onSubmit = (data: CompanyFormType) => {
    console.log(data);
  };


  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-2xl w-[866px] rounded-lg bg-zinc-50 p-8 shadow-xl">
        <h2 className="mb-8 text-xl text-center text-[var(--uaq-selected-hover)]">Completa el registro de la empresa</h2>
        <p className="mb-6 text-center leading-5">
          Por favor, completa l a información general, fiscal y de ubicación de tu empresa para continuar con el registro
        </p>
            <CompanyDetails control={control} />
              <Button type="submit" className='mt-[15px] mx-auto block'>
                Registrarse
              </Button>
      </form>
    </FormProvider>
  );
}
