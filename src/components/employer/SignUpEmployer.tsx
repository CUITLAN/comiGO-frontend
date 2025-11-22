'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employerSchema, EmployerFormType } from '@/validations/employerSchema';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';

// --- IMPORTACIÓN DE PASOS ---
// Asegúrate de que las rutas coincidan con tu estructura de carpetas actual
import RestaurantDetailsStep from './RestaurantDetailsStep';
import AccessInfoStep from './accessinfostep';
import AddImageStep from '../ui/Addimage';     // Según tu ruta
import LocationStep from '../ui/locationstep'; // Según tu ruta
import RestaurantVisual from '../ui/RestaurantVisual'; // El nuevo componente visual

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
      // Paso 3
      restaurantDescription: '',
      restaurantImages: [null, null, null], 
      // Paso 4
      restaurantAddress: '',
      restaurantLocation: { lat: 19.4326, lng: -99.1332 },
    },
  });

  // Extraemos métodos necesarios
  const { control, handleSubmit, trigger, setValue, formState: { errors } } = methods;

  const onSubmit = (data: EmployerFormType) => {
    console.log("--- REGISTRO FINALIZADO ---");
    // Limpiamos las imágenes nulas antes de enviar
    const cleanData = {
        ...data,
        restaurantImages: data.restaurantImages?.filter(img => img !== null)
    };
    console.log(cleanData);
    // Aquí iría tu llamada al backend
  };

  // --- LÓGICA SIGUIENTE ---
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
        'employerEmail', 'accountPassword', 'accountPasswordConfirm',
        'employerMobilePhone' // Importante validar el móvil si es requerido
      ];
    } else if (currentStep === 3) {
       // Paso 3: Descripción
       fieldsToValidate = ['restaurantDescription'];
    } else if (currentStep === 4) {
       // Paso 4: Dirección y Mapa
       fieldsToValidate = ['restaurantAddress', 'restaurantLocation'];
    }
    // Paso 5: No requiere validación para entrar, solo para salir (submit)

    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid) {
      if (currentStep < 5) { // Ahora el límite es 5
          onStepChange(currentStep + 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
          // Estamos en el paso 5 y dimos "Finalizar"
          handleSubmit(onSubmit)();
      }
    }
  };

  // --- LÓGICA ATRÁS (Faltaba esta función en tu snippet) ---
  const handlePrevStep = () => {
    onStepChange(currentStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalSteps = 5;

  return (
    <FormProvider {...methods}>
        {/* CAMBIO DE ESTILO: 
           Usamos max-w-4xl para que la tarjeta visual (Paso 5) tenga espacio suficiente.
           'max-w-5/6' no es clase estándar de Tailwind, uso w-11/12 max-w-4xl que es equivalente y seguro.
        */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-11/12 max-w-4xl space-y-6">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-6 gap-3">
            {/* Ajusté el nombre de la imagen para coincidir con tu snippet */}
            <Image src="/ComiGo-Logo.png" alt="ComiGo" width={80} height={80} />
            
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-[var(--color-titulos)]">
                  {currentStep === 1 && 'Detalles de tu Negocio'}
                  {currentStep === 2 && 'Información de Acceso'}
                  {currentStep === 3 && 'Únete a la Comunidad'}
                  {currentStep === 4 && 'Ubicación'}
                  {currentStep === 5 && 'Confirma tu Registro'}
              </h2>
              <p className="text-zinc-500 text-sm mt-1">
                  Paso {currentStep} de {totalSteps}
              </p>
            </div>
            
            {/* Barra de Progreso */}
            <div className="w-full max-w-md bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden mx-auto">
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
            {currentStep === 4 && <LocationStep control={control} setValue={setValue} errors={errors} />}
            {/* NUEVO PASO 5 */}
            {currentStep === 5 && <RestaurantVisual />}
        </div>

        {/* Botones */}
        <div className="mt-8 flex flex-col space-y-4 max-w-md mx-auto"> {/* Centramos los botones */}
              <div className="flex gap-3">
                  {currentStep > 1 && (
                      <Button 
                        type="button"
                        onClick={handlePrevStep}
                        variant="primary" // Cambié a outline para mejor UX visual
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