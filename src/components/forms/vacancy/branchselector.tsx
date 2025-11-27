'use client';

import { useEffect, useState } from 'react';
import { useFormContext, Controller, Control } from 'react-hook-form';
import axios from 'axios';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/useAuthStore';
import { MapPoint } from '@solar-icons/react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface Branch {
    id: string;
    name: string;
    address: string;
}

interface BranchSelectorProps {
    // Props para Formulario
    name?: string; 
    control?: Control<any>; 
    
    // Props para Modo Standalone (sin formulario)
    activeBranchId?: string | null;
    onSelect?: (branchId: string) => void;

    // Props Visuales
    label?: string;
    className?: string;
}

export default function BranchSelector({ 
    name, 
    label = "Sucursal", 
    activeBranchId, 
    onSelect,
    className,
    control 
}: BranchSelectorProps) {
    // 1. Intentamos obtener el contexto de RHF
    const formContext = useFormContext();
    const { accessToken } = useAuthStore();
    
    // Si pasas 'control' manual lo usa, si no, intenta usar el del contexto
    const effectiveControl = control || formContext?.control;
    
    const [branches, setBranches] = useState<Branch[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 2. Cargar Sucursales
    useEffect(() => {
        const fetchBranches = async () => {
            if (!accessToken) return;
            setIsLoading(true);
            try {
                const res = await axios.get(`${API_BASE_URL}/branches/my-branches`, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                setBranches(res.data);
                setError(null);
            } catch (err) {
                console.error("Error obteniendo sucursales", err);
                setError("Error al cargar sucursales");
            } finally {
                setIsLoading(false);
            }
        };
        fetchBranches();
    }, [accessToken]);

    // 3. Renderizado del Select (Reutilizable)
    // Acepta props nativas para compatibilidad con RHF (...field)
    const SelectInput = ({ value, onChange, onBlur, name, ref }: any) => (
        <div className={`relative ${className}`}>
            <select
                name={name}
                ref={ref}
                onBlur={onBlur}
                value={value || ""} // Maneja nulos
                onChange={onChange}
                className="w-full border border-gray-300 rounded-md p-2 pl-9 bg-gray-50 text-sm focus:ring-[#4A7729] focus:border-[#4A7729] outline-none transition-all appearance-none text-gray-700 cursor-pointer disabled:opacity-50"
                disabled={isLoading}
            >
                <option value="" disabled>
                    {isLoading ? "Cargando..." : "Selecciona una sucursal"}
                </option>
                
                {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                        {branch.name}
                    </option>
                ))}
            </select>
            
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <MapPoint size={16} />
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-[10px]">
                ▼
            </div>
        </div>
    );

    return (
        <div className="flex flex-col gap-2 w-full">
            {label && <Label className="text-sm font-medium text-gray-700">{label}</Label>}
            
            {onSelect ? (
                // CASO A: Modo Standalone (Header de Publicaciones)
                <SelectInput 
                    value={activeBranchId} 
                    onChange={(e: any) => onSelect(e.target.value)} 
                />
            ) : (
                // CASO B: Modo Formulario (Crear/Editar Platillo)
                // Es vital que 'name' y 'effectiveControl' existan
                name && effectiveControl ? (
                    <Controller
                        control={effectiveControl}
                        name={name}
                        render={({ field }) => (
                            // Pasamos TODO el objeto field (onChange, onBlur, value, ref)
                            <SelectInput {...field} />
                        )}
                    />
                ) : (
                    <div className="text-red-500 text-xs p-2 bg-red-50 border border-red-100 rounded">
                        Error: BranchSelector requiere estar dentro de un FormProvider o recibir props de control.
                    </div>
                )
            )}
            
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}