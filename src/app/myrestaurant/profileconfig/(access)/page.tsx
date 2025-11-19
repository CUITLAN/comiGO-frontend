'use client';

import React from 'react';
import {useState} from 'react';
import TitleSection from '@/components/common/TitleSection';
import {ConfigRow} from '@/components/settings/ConfigRow';
import {UserCircle} from '@solar-icons/react';
import {Button} from '@/components/ui/button';

export default function Page(){

    const [isEditingPersonal, setIsEditingPersonal] = useState(false);
    const[isEditingGeneral,setIsEditingGeneral]=useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   
    //Conectar con la API para poder acceder a los datos del contacto de la empresa

    const [form, setForm] = useState({
        nombres: 'Pedro',
        apellidos: 'Benajmin Parques',
        puesto: 'Líder de recursos humanos',
        celular: '4421234567',
        telfijo: '4421234567',
        correo: 'pedro.benjamin@example.com',
        contrasena: 'password123',
    });

    const [personalErrors, setPersonalErrors] = useState<Record<string, string>>({});
    const sectionConfig = {
        profile: {
            title: 'DATOS DE ACCESO',
            icon: <UserCircle size={24} weight="Bold" />,
            description: 'Consulte la información de sus datos de acceso',
        },
    };

    const handleChange = (key: string, value: string) => {
    // Validar solo números para celular y telfijo
    if ((key === 'celular' || key === 'telfijo') && /\D/.test(value)) {
        setPersonalErrors((e) => ({
            ...e,
            [key]: 'Solo se permiten números',
        }));
        return;
    }

    setForm((prev) => ({ ...prev, [key]: value }));
    setPersonalErrors((e) => ({ ...e, [key]: '' }));
};

   const validatePersonalFields = () => {
    const errors: Record<string, string> = {};
    const keys = Object.keys(form) as (keyof typeof form)[];

    keys.forEach((k) => {
        const raw = form[k];
        const v = typeof raw === 'string' ? raw.trim() : raw;

        // Validación de campo vacío
        if (!v || (typeof v === 'string' && v === '')) {
            errors[k] = 'No puede quedar vacío';
        }

        // Validación de solo números para celular y teléfono fijo
        if ((k === 'celular' || k === 'telfijo') && /\D/.test(v)) {
            errors[k] = 'Debe contener solo números';
        }
    });

    return errors;
};

    const handleSavePersonal = () => {
        const errors = validatePersonalFields();
        if (Object.keys(errors).length > 0) {
            setPersonalErrors(errors);
            return;
        }
        setForm((prev) => ({
            ...prev,
            nombres: prev.nombres.trim(),
            apellidos: prev.apellidos.trim(),
            puesto: prev.puesto.trim(),
            celular: prev.celular.trim(),
            telfijo: prev.telfijo.trim(),
        }));

        // Aquí iría la llamada API para guardar
        console.log('Saving company data:', form);
        setPersonalErrors({});
        setIsEditingPersonal(false);
    };

    const handleSaveGeneral = () =>{
        const errors = validatePersonalFields();
        if (Object.keys(errors).length > 0) {
            setPersonalErrors(errors);
            return;
        }
        setForm((prev) => ({
            ...prev,
            correo: prev.correo.trim(),
            contrasena: prev.contrasena.trim(),
        }));

        // Aquí iría la llamada API para guardar
        console.log('Saving company data:', form);
        setPersonalErrors({});
        setIsEditingGeneral(false);
    };

    return (
        <div className='mr-20 space-y-6 p-4 md:p-6'>
            <TitleSection sections={sectionConfig} currentSection='profile' />
            <div className='rounded-lg border border-zinc-300 shadow-sm'>
                <ConfigRow
                    title='Información general'
                    valueinput=''
                    isTitle={true}
                    placeholder=''
                    isEditable={true}
                    editInput={false}
                    onEditClick={() => {
                        setPersonalErrors({})
                        setIsEditingPersonal((s) => !s)
                    }}
                />
                <ConfigRow
                    title='Nombres'
                    valueinput={form.nombres}
                    placeholder=''
                    isEditable={isEditingPersonal}
                    editInput={isEditingPersonal}
                    onValueChange={(v) => handleChange('nombres', v)}
                    externalError={personalErrors.nombres}
                />
                <ConfigRow
                    title='Apellidos'
                    valueinput={form.apellidos}
                    placeholder=''
                    isEditable={isEditingPersonal}
                    editInput={isEditingPersonal}
                    onValueChange={(v) => handleChange('apellidos', v)}
                    externalError={personalErrors.apellidos}
                />
                <ConfigRow
                    title='Puesto'
                    valueinput={form.puesto}
                    placeholder=''
                    isEditable={isEditingPersonal}
                    editInput={isEditingPersonal}
                    onValueChange={(v) => handleChange('puesto', v)}
                    externalError={personalErrors.puesto}
                />
                <ConfigRow
                    title='Celular'
                    valueinput={form.celular}   
                    placeholder=''
                    isEditable={isEditingPersonal}
                    editInput={isEditingPersonal}
                    onValueChange={(v) => handleChange('celular', v)}
                    externalError={personalErrors.celular}
                />
                <ConfigRow
                    title='Teléfono fijo'
                    valueinput={form.telfijo}
                    placeholder=''
                    isEditable={isEditingPersonal}
                    editInput={isEditingPersonal}
                    onValueChange={(v) => handleChange('telfijo', v)}
                    externalError={personalErrors.telfijo}
                />
                {isEditingPersonal && (
                    <div className='flex justify-end px-6 pb-4 pt-2'>
                        <Button variant='primary' onClick={() => { handleSavePersonal() }}>
                            Guardar Cambios
                        </Button>
                    </div>
                )}
            </div>
            <div className='rounded-lg border border-zinc-300 shadow-sm'>
                <ConfigRow
                    title='Información de acceso' // (Título sugerido)
                    valueinput=''
                    isTitle={true}
                    placeholder=''
                    isEditable={true}
                    editInput={false}
                    onEditClick={() => {
                        setPersonalErrors({})
                        // Resetea los campos al entrar o salir del modo edición
                        setConfirmPassword('');
                        setShowPassword(false);
                        setShowConfirmPassword(false);
                        setIsEditingGeneral((s) => !s)
                    }}
                />
                <ConfigRow
                    title='Correo electrónico'
                    valueinput={form.correo}
                    placeholder='ejemplo@correo.com'
                    isEditable={isEditingGeneral}
                    editInput={isEditingGeneral}
                    onValueChange={(v) => handleChange('correo', v)}
                    externalError={personalErrors.correo}
                />
                <ConfigRow
                    title='Contraseña'
                    inputType='password'
                    valueinput={form.contrasena}
                    isEditable={isEditingGeneral}
                    editInput={isEditingGeneral}
                    onValueChange={(v) => handleChange('contrasena', v)}
                    externalError={personalErrors.contrasena}
                    
                    
                />

                
                {isEditingGeneral && (
                    <ConfigRow
                        title='Repite Contraseña'
                        valueinput={confirmPassword}
                        placeholder='Repite tu contraseña'
                        isEditable={true} 
                        editInput={true}
                        onValueChange={(v) => setConfirmPassword(v)}
                        inputType='password'
                    />
                )}
                
                {isEditingGeneral && (
                    <div className='flex flex-wrap items-center justify-end gap-x-4 gap-y-2 px-6 pb-4 pt-2'>
                        
                        <Button variant='primary' onClick={() => { handleSaveGeneral() }}>
                            Guardar Cambios
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}