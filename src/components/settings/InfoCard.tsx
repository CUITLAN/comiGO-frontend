import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface InfoCardProps {
  avatar: string;
  name: string;
  email: string;
  cellphone?: string; // Lo dejamos opcional para que no te de error si falta
}

export const InfoCard = ({ avatar, name, email, cellphone }: InfoCardProps) => {
  return (
    <div className="flex items-center gap-4 p-2">
      {/* Avatar Circular a la izquierda */}
      <Avatar className="h-16 w-16 border border-gray-200 shadow-sm">
        <AvatarImage src={avatar} alt={name} className="object-cover" />
        <AvatarFallback className="bg-gray-100 text-gray-500 font-bold">
          {name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {/* Texto a la derecha */}
      <div className="flex flex-col justify-center overflow-hidden">
        <h3 className="text-base font-bold text-[#0C3252] truncate">{name}</h3>
        <p className="text-sm text-gray-500 italic truncate">{email}</p>
        {cellphone && <p className="text-xs text-gray-400">{cellphone}</p>}
      </div>
    </div>
  );
};