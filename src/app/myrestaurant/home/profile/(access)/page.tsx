'use client';

import { useState } from 'react';
import TitleSection from '@/components/common/TitleSection';
import { ConfigRow } from '@/components/settings/ConfigRow';
import { UserCircle } from '@solar-icons/react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner'; // 1. Importamos toast

export default function AccessDataPage() {
  const [isEditing, setIsEditing] = useState(false);

  // Estado del formulario
  const [form, setForm] = useState({
    nombre: 'Pedro',
    correo: 'Holasoyelcorreo@gmail.com',
    contrasena: '',         
    confirmContrasena: '',  
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Configuración del Header
  const sectionConfig = {
    access: {
      icon: <UserCircle size={24} weight="Bold" />,
      title: 'DATOS DE ACCESO',
      description: 'Consulte la información de sus datos de acceso',
    },
  };

  // --- VALIDACIONES DE CONTRASEÑA ---
  const getPasswordErrors = (pw: string) => {
    const errs: string[] = [];
    if (pw.length < 8) errs.push('Mínimo 8 caracteres');
    if (!/[A-Z]/.test(pw)) errs.push('Una mayúscula');
    if (!/[a-z]/.test(pw)) errs.push('Una minúscula');
    if (!/[0-9]/.test(pw)) errs.push('Un número');
    return errs;
  };

  // Manejador de cambios
  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  // Guardar Cambios
  const handleSave = () => {
    const newErrors: Record<string, string> = {};

    // 1. Validar campos básicos
    if (!form.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!form.correo.trim()) newErrors.correo = 'El correo es requerido';

    // 2. Validar contraseña SOLO si el usuario escribió algo
    if (form.contrasena) {
        const pwIssues = getPasswordErrors(form.contrasena);
        if (pwIssues.length > 0) {
            newErrors.contrasena = `La contraseña debe tener: ${pwIssues.join(', ')}`;
        }
        
        if (form.contrasena !== form.confirmContrasena) {
            newErrors.confirmContrasena = 'Las contraseñas no coinciden';
        }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulación de guardado en consola
    console.log('Datos actualizados:', {
        nombre: form.nombre,
        correo: form.correo,
        nuevaContrasena: form.contrasena || 'No se cambió'
    });

    // 2. Disparamos la alerta de éxito
    toast.success("Cambios guardados", {
      description: "Se han guardado los cambios modificados.",
      duration: 3000,
      // Los colores los maneja automáticamente 'richColors' del Layout
    });

    // Limpiamos campos de contraseña y salimos de edición
    setForm(prev => ({ ...prev, contrasena: '', confirmContrasena: '' }));
    setIsEditing(false);
    setErrors({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
    setForm(prev => ({ ...prev, contrasena: '', confirmContrasena: '' })); 
  };

  return (
    <div className="mr-20 space-y-8 p-4 md:p-6">
      
      <TitleSection sections={sectionConfig} currentSection="access" />

      <div className={`
        rounded-xl border bg-white overflow-hidden transition-all duration-300 shadow-sm
        ${isEditing ? 'border-[#4A7729] ring-1 ring-[#4A7729]/20' : 'border-[#4A7729]/60'}
      `}>
        
        {/* HEADER TARJETA */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-[#FAFAFA]">
            <h3 className="text-base font-bold text-gray-800">Datos de Acceso</h3>
            
            {!isEditing ? (
                <Button 
                    variant="primary" 
                    onClick={() => setIsEditing(true)}
                    className="text-[#008BD8] border-[#008BD8] bg-white hover:bg-blue-50 h-9 px-6 font-medium"
                >
                    Editar
                </Button>
            ) : (
                <div className="flex gap-3">
                    <Button 
                        variant="ghost" 
                        onClick={handleCancel}
                        className="text-gray-500 hover:text-gray-700 h-9 hover:bg-gray-200"
                    >
                        Cancelar
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleSave}
                        className="bg-[#4A7729] text-white hover:bg-[#3d6321] h-9 px-6"
                    >
                        Guardar
                    </Button>
                </div>
            )}
        </div>

        {/* BODY TARJETA */}
        <div className="p-4 space-y-2">
            
            {/* Nombre */}
            <div className="px-4">
                <ConfigRow
                    title="Nombre"
                    valueinput={form.nombre}
                    isTitle={false}
                    placeholder="Tu nombre"
                    isEditable={isEditing}
                    editInput={isEditing}
                    onValueChange={(v) => handleChange('nombre', v)}
                    externalError={errors.nombre}
                />
            </div>

            {/* Correo */}
            <div className="px-4">
                <ConfigRow
                    title="Correo"
                    valueinput={form.correo}
                    isTitle={false}
                    placeholder="Tu correo electrónico"
                    isEditable={isEditing}
                    editInput={isEditing}
                    onValueChange={(v) => handleChange('correo', v)}
                    externalError={errors.correo}
                />
            </div>

            {/* LOGICA DE CONTRASEÑA */}
            {!isEditing ? (
                <div className="px-4">
                    <ConfigRow
                        title="Contraseña"
                        valueinput="***********"
                        isTitle={false}
                        placeholder=""
                        isEditable={false}
                        editInput={false}
                        onValueChange={() => {}}
                    />
                </div>
            ) : (
                <>
                    <div className="px-4">
                        <ConfigRow
                            title="Nueva Contraseña"
                            valueinput={form.contrasena}
                            isTitle={false}
                            placeholder="Ingresa nueva contraseña"
                            isEditable={true}
                            editInput={true}
                            // type="password" // Descomenta esto si tu ConfigRow lo soporta
                            onValueChange={(v) => handleChange('contrasena', v)}
                            externalError={errors.contrasena}
                        />
                    </div>
                    <div className="px-4">
                        <ConfigRow
                            title="Confirmar"
                            valueinput={form.confirmContrasena}
                            isTitle={false}
                            placeholder="Repite la contraseña"
                            isEditable={true}
                            editInput={true}
                            // type="password" // Descomenta esto si tu ConfigRow lo soporta
                            onValueChange={(v) => handleChange('confirmContrasena', v)}
                            externalError={errors.confirmContrasena}
                        />
                    </div>
                </>
            )}

        </div>
      </div>
    </div>
  );
}