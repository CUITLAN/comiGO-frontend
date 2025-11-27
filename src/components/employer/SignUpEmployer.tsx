'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employerSchema, EmployerFormType } from '@/validations/employerSchema';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'sonner';
import { cleanPhoneNumber } from '@/lib/utils';
import { useRouter } from 'next/navigation';

// --- IMPORTACIÓN DE PASOS ---
import RestaurantDetailsStep from './RestaurantDetailsStep';
import AccessInfoStep from './accessinfostep';
import AddImageStep from '../ui/Addimage';     
import LocationStep from '../ui/locationstep'; 
import RestaurantVisual from '../ui/RestaurantVisual'; 

interface SignUpEmployerProps {
  currentStep: number;
  onStepChange: (step: number) => void;
}

const API_URL = 'http://localhost:3000/auth/register-restaurant'; 

export default function SignUpEmployer({ currentStep, onStepChange }: SignUpEmployerProps) {
  const router = useRouter();

  const methods = useForm<EmployerFormType>({
    resolver: zodResolver(employerSchema),
    mode: 'onChange',
    defaultValues: {
      restaurantName: '', restaurantType: '', numBranches: 1, openingTime: '09:00', closingTime: '21:00', socialMedia: '', restaurantPhone: { code: '+52', number: '' },
      employerName: '', employerLastName: '', positionWithinTheCompany: '', employerEmail: '', accountPassword: '', accountPasswordConfirm: '', employerMobilePhone: { code: '+52', number: '' }, employerLandlinePhone: { code: '+52', number: '' },
      restaurantDescription: '', restaurantImages: [null, null, null], 
      restaurantAddress: '', restaurantLocation: { lat: 20.5888, lng: -100.3899 },
    },
  });

  // 🚨 CORRECCIÓN: Quitamos handleSubmit de la desestructuración
  const { control, trigger, setValue, formState: { errors } } = methods;

  // --- FUNCIÓN PRINCIPAL DE ENVÍO (Llamada al presionar el botón Finalizar) ---
  const onSubmit = async (data: EmployerFormType) => {
    
    // ⚠️ VALIDACIÓN FINAL COMPLETA antes de enviar
    const allFieldsValid = await trigger();
    if (!allFieldsValid) {
        toast.error("Faltan datos obligatorios. Revisa los pasos anteriores.");
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    
    // 1. Crear el objeto FormData para enviar archivos y JSON juntos
    const formData = new FormData();
    
    const createRegisterDto = () => ({
        restaurantName: data.restaurantName, restaurantType: data.restaurantType, numBranches: data.numBranches, openingTime: data.openingTime, closingTime: data.closingTime, socialMedia: data.socialMedia, restaurantPhone: cleanPhoneNumber(data.restaurantPhone),
        employerName: data.employerName, employerLastName: data.employerLastName, positionWithinTheCompany: data.positionWithinTheCompany, employerEmail: data.employerEmail, accountPassword: data.accountPassword, accountPasswordConfirm: data.accountPasswordConfirm, employerMobilePhone: cleanPhoneNumber(data.employerMobilePhone), employerLandlinePhone: cleanPhoneNumber(data.employerLandlinePhone),
        restaurantDescription: data.restaurantDescription, restaurantAddress: data.restaurantAddress, latitude: data.restaurantLocation.lat, longitude: data.restaurantLocation.lng,
    });

    const jsonDto = JSON.stringify(createRegisterDto());
    formData.append('dto', jsonDto); 
    
    const files = data.restaurantImages?.filter(img => img instanceof File) || [];
    
    if (files.length > 0) {
        formData.append('logoFile', files[0]); 
    }
    for (let i = 1; i < files.length; i++) {
        formData.append('galleryFiles', files[i]); 
    }

    // 4. Llamada a la API
    toast.promise(
        axios.post(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', 
            }
        }),
        {
            loading: 'Creando tu restaurante y subiendo imágenes...',
            success: (res) => {
                methods.reset();
                
                // REDIRECCIÓN SOLICITADA TRAS EL SUBMIT EXITOSO
                router.push('/login'); 
                
                return `Registro exitoso! Ya puedes iniciar sesión.`;
            },
            error: (err) => {
                console.error("❌ ERROR API:", err.response?.data || err);
                return `Error al registrar: ${err.response?.data?.message || 'Revisa tu conexión o credenciales S3.'}`;
            },
        }
    );
  };

  // --- LÓGICA DE AVANCE (Solo valida y avanza, no hace submit) ---
  const handleNextStep = async () => {
    let fieldsToValidate: (keyof EmployerFormType)[] = [];
    
    if (currentStep === 1) {
      fieldsToValidate = ['restaurantName', 'restaurantType', 'numBranches', 'openingTime', 'closingTime', 'restaurantPhone'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['employerName', 'employerLastName', 'positionWithinTheCompany', 'employerEmail', 'accountPassword', 'accountPasswordConfirm', 'employerMobilePhone'];
    } else if (currentStep === 3) {
       fieldsToValidate = ['restaurantDescription'];
    } else if (currentStep === 4) {
       fieldsToValidate = ['restaurantAddress', 'restaurantLocation'];
    }

    const isStepValid = await trigger(fieldsToValidate as any);

    if (isStepValid) {
      if (currentStep < totalSteps) { 
          onStepChange(currentStep + 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
        // Si hay errores, forzamos el scroll hacia arriba para que se vean
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // --- LÓGICA ATRÁS ---
  const handlePrevStep = () => {
    onStepChange(currentStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalSteps = 5;
  const isFinalStep = currentStep === totalSteps;

  return (
    <FormProvider {...methods}>
        {/* 🚨 CORRECCIÓN: Usamos methods.handleSubmit en lugar de handleSubmit desestructurado */}
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-11/12 max-w-4xl space-y-6">
        
        {/* Header (Mismo código que compartiste) */}
        <div className="flex flex-col items-center mb-6 gap-3">
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
            {currentStep === 5 && <RestaurantVisual />}
        </div>

        {/* Botones */}
        <div className="mt-8 flex flex-col space-y-4 max-w-md mx-auto">
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
                  
                  {/* Botón Principal: Condicional entre CONTINUAR y FINALIZAR */}
                  {isFinalStep ? (
                      <Button 
                        type="submit" // Ejecuta el onSubmit al hacer clic en FINALIZAR
                        className="flex-1 h-12 bg-[#4A7729] hover:bg-[#3a611f] text-white rounded-lg font-bold text-base transition-colors"
                      >
                        Finalizar Registro
                      </Button>
                  ) : (
                      <Button 
                        type="button" 
                        onClick={handleNextStep} // Solo avanza, no hace submit
                        className="flex-1 h-12 bg-[#0088CC] hover:bg-[#0077B3] text-white rounded-lg font-bold text-base transition-colors"
                      >
                        Continuar
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