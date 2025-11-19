'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employerSchema, EmployerFormType } from '@/validations/employerSchema';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';

// Pasos
import RestaurantDetailsStep from './RestaurantDetailsStep';
import AccessInfoStep from './accessinfostep';
import AddImageStep from '../ui/Addimage';

interface SignUpEmployerProps {
  currentStep: number;
  onStepChange: (step: number) => void;
}

export default function SignUpEmployer({ currentStep, onStepChange }: SignUpEmployerProps) {

  const methods = useForm<EmployerFormType>({
    resolver: zodResolver(employerSchema),
    mode: 'onChange',
    defaultValues: {
      // Paso 1
      restaurantName: '',
      restaurantType: '',
      numBranches: 1,
      openingTime: '',
      closingTime: '',
      socialMedia: '',
      restaurantPhone: { code: '+52', number: '' },
      // Paso 2
      employerName: '',
      employerLastName: '',
      positionWithinTheCompany: '',
      employerEmail: '',
      accountPassword: '',
      accountPasswordConfirm: '',
      employerMobilePhone: { code: '+52', number: '' },
      employerLandlinePhone: { code: '+52', number: '' },
      // Paso 3 (Nuevos Defaults)
      restaurantDescription: '',
      restaurantImages: [null, null, null], 
    },
  });

  // Extraemos setValue y trigger para pasarlos al componente de imágenes
  const { control, handleSubmit, trigger, setValue, formState: { errors } } = methods;

  const onSubmit = (data: EmployerFormType) => {
    console.log("--- REGISTRO FINALIZADO ---");
    // Aquí limpiamos el array de imágenes de 'nulls' antes de enviar si es necesario
    const cleanData = {
        ...data,
        restaurantImages: data.restaurantImages?.filter(img => img !== null)
    };
    console.log(cleanData);
  };

  const handleNextStep = async () => {
    let fieldsToValidate: (keyof EmployerFormType)[] = [];
    
    if (currentStep === 1) {
      fieldsToValidate = [
        'restaurantName', 'restaurantType', 'numBranches', 
        'openingTime', 'closingTime', 'restaurantPhone'
      ];
    } else if (currentStep === 2) {
      fieldsToValidate = [
        'employerName', 'employerLastName', 'positionWithinTheCompany', 
        'employerEmail', 'accountPassword', 'accountPasswordConfirm'
        
      ];
    } else if (currentStep === 3) {
       // Paso 3: Validar descripción (imágenes son opcionales en el schema pero el usuario DEBE subir al menos 1 si así lo decides en lógica)
       fieldsToValidate = ['restaurantDescription'];
    }

    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid) {
      onStepChange(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    onStepChange(currentStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalSteps = 3; // AHORA SON 3 PASOS

  return (
    <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-5/6 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-6 gap-3">
            <Image src="/Comigo-Logo.png" alt="ComiGo" width={200} height={200} />
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-[var(--color-titulos)]">
                  {currentStep === 1 && 'Detalles de tu Negocio'}
                  {currentStep === 2 && 'Información de Acceso'}
                  {currentStep === 3 && 'Únete a la Comunidad'}
              </h2>
              <p className="text-zinc-500 text-sm mt-1">
                  Paso {currentStep} de {totalSteps}
              </p>
            </div>
            
            {/* Barra de Progreso */}
            <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                    className="bg-[#4A7729] h-full transition-all duration-300 ease-in-out" 
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
            </div>
        </div>
        
        {/* Contenedor de Pasos */}
        <div className="min-h-[400px]"> 
            {currentStep === 1 && <RestaurantDetailsStep control={control} errors={errors} />}
            {currentStep === 2 && <AccessInfoStep control={control} />}
            {currentStep === 3 && <AddImageStep control={control} setValue={setValue} trigger={trigger} />}
        </div>

        {/* Botones */}
        <div className="mt-8 flex flex-col space-y-4">
              <div className="flex gap-3">
                  {currentStep > 1 && (
                      <Button 
                        type="button"
                        onClick={handlePrevStep}
                        variant="primary"
                        className="flex-1 h-12 border-zinc-300 text-zinc-700 hover:bg-zinc-50"
                      >
                        Atrás
                      </Button>
                  )}

                  {currentStep < totalSteps ? (
                      <Button 
                        type="button" 
                        onClick={handleNextStep}
                        className="flex-1 h-12 bg-[#0088CC] hover:bg-[#0077B3] text-white rounded-lg font-bold text-base transition-colors"
                      >
                        Continuar
                      </Button>
                  ) : (
                      <Button 
                        type="submit" 
                        className="flex-1 h-12 bg-[#4A7729] hover:bg-[#3a611f] text-white rounded-lg font-bold text-base transition-colors"
                      >
                        Finalizar Registro
                      </Button>
                  )}
              </div>

              <div className="flex justify-center pt-2">
                  <p className="text-sm text-zinc-600">
                    ¿Ya tienes una cuenta? 
                    <Link href="/login" className="text-[#4A7729] font-bold ml-1 hover:underline">
                      Iniciar Sesión
                    </Link>
                  </p>
              </div>
        </div>
      </form>
    </FormProvider>
  );
}