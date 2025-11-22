'use client';

import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from '@/components/forms/FormInput';
import { Button } from '@/components/ui/button';

interface NewPasswordStepProps {
  onNext: () => void;
}

export default function NewPasswordStep({ onNext }: NewPasswordStepProps) {
  const methods = useForm<{ password: string; confirmPassword: string }>({
    defaultValues: { password: '', confirmPassword: '' },
    mode: 'onChange', // Cambiado a onChange para feedback más rápido
  });

  const { control, handleSubmit, setError, clearErrors, watch } = methods;

  // Tu lógica de validación original
  const getPasswordErrors = (pw: string) => {
    const errors: string[] = [];
    if (!pw || pw.length < 8) errors.push('Mínimo 8 caracteres');
    if (!/[A-Z]/.test(pw)) errors.push('Requiere mayúscula');
    if (!/[a-z]/.test(pw)) errors.push('Requiere minúscula');
    if (!/[0-9]/.test(pw)) errors.push('Requiere número');
    return errors;
  };

  React.useEffect(() => {
    const subscription = watch((value) => {
      const pw = value.password ?? '';
      const cpw = value.confirmPassword ?? '';

      const pwErrors = getPasswordErrors(pw);
      if (pwErrors.length > 0) {
        setError('password', { type: 'manual', message: pwErrors.join('. ') });
      } else {
        clearErrors('password');
      }

      if (cpw && pw !== cpw) {
        setError('confirmPassword', { type: 'manual', message: 'Las contraseñas no coinciden' });
      } else {
        const confirmErrors = getPasswordErrors(cpw);
        if (cpw && confirmErrors.length > 0) {
          setError('confirmPassword', { type: 'manual', message: confirmErrors.join('. ') });
        } else {
          if (!cpw || pw === cpw) clearErrors('confirmPassword');
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setError, clearErrors]);

  const onSubmit = (data: { password: string; confirmPassword: string }) => {
      const pwErrors = getPasswordErrors(data.password);
      if (pwErrors.length > 0) {
        setError('password', { type: 'manual', message: pwErrors.join('. ') });
        return;
      }
      if (data.password !== data.confirmPassword) {
        setError('confirmPassword', { type: 'manual', message: 'Las contraseñas no coinciden' });
        return;
      }
      
      console.log('Contraseña actualizada');
      onNext();
  };

  return (
    <div className='h-full w-full max-w-2xl space-y-8 rounded-md border border-gray-300 bg-white px-12 py-6 shadow-sm animate-in fade-in slide-in-from-right-8 duration-500'>
        <div className="flex flex-col items-center gap-4">
           <img src="/recovery.png" alt="Restablecer" className="scale-100"/>
           <h1 className="text-3xl font-medium text-center uppercase">Restablece tu contraseña</h1>
           <p className="text-center text-gray-500">Elige una nueva contraseña para tu cuenta</p>
        </div>

        <FormProvider {...methods}> 
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
              <div className="space-y-6">
                <FormInput
                  control={control}
                  name="password"
                  label="Nueva Contraseña"
                  type="password"
                  maxChars={50}
                />
                <FormInput
                  control={control}
                  name="confirmPassword"
                  label="Confirma tu contraseña"
                  type="password"
                  maxChars={50}
                />
              </div>
              <div className="items-center text-center mt-8">
                <Button type="submit" className="w-full bg-[#0088CC] hover:bg-[#0077B3]">
                    Continuar
                </Button>
              </div>
            </form>
        </FormProvider>
    </div>
  );
}