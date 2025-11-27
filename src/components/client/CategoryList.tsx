'use client';

import { 
  Cup,          
  ChefHat,      
  Donut,        
  Wineglass,    
  Fire,         
  HamburgerMenu,
  Bottle,
  
} from '@solar-icons/react';

// Mapeo de las categorías exactas del Backend a Iconos y Nombres cortos para UI
const CATEGORY_MAP = [
    { fullName: "Cafetería / Panadería", shortName: 'Café/Pan', icon: Cup },
    { fullName: "Comida corrida / Casera", shortName: 'Casera', icon: ChefHat },
    { fullName: "Tortas, tacos y antojitos", shortName: 'Antojitos', icon: HamburgerMenu },
    { fullName: "Carnes frías y embutidos", shortName: 'Embutidos', icon: Fire },
    //{ fullName: "Frutas y verduras", shortName: 'Frutas', icon: Apple },
    { fullName: "Lácteos (leche, queso, yogur)", shortName: 'Lácteos', icon: Bottle },
    { fullName: "Platillos preparados", shortName: 'Preparados', icon: ChefHat },
    //{ fullName: "Pescados y mariscos", shortName: 'Mariscos', icon: FishAlt },
    { fullName: "Snacks y botanas", shortName: 'Snacks', icon: Donut },
    { fullName: "Bebidas (incluye alcohol y no alcohol)", shortName: 'Bebidas', icon: Wineglass },
];

interface CategoryListProps {
    selectedCategory: string | null;
    onSelectCategory: (category: string | null) => void;
}

export function CategoryList({ selectedCategory, onSelectCategory }: CategoryListProps) {
  
  const handleClick = (categoryFullName: string) => {
      if (selectedCategory === categoryFullName) {
          onSelectCategory(null);
      } else {
          onSelectCategory(categoryFullName);
      }
  };

  return (
    <div className="space-y-2">
        <h3 className="font-bold text-gray-800 text-sm px-1">Categorías</h3>
        
        <div className="flex gap-4 overflow-x-auto pb-2 px-1 scrollbar-hide">
            {CATEGORY_MAP.map((cat) => {
                const isSelected = selectedCategory === cat.fullName;
                
                return (
                    <button 
                        key={cat.fullName} 
                        onClick={() => handleClick(cat.fullName)}
                        className="flex flex-col items-center gap-1 min-w-[64px] group transition-all"
                    >
                        <div className={`
                            w-12 h-12 rounded-full flex items-center justify-center shadow-sm transition-colors
                            ${isSelected 
                                ? 'bg-[#3d7547] ring-2 ring-[#529A60] ring-offset-1' 
                                : 'bg-[#529A60] group-hover:bg-[#468753]'
                            }
                        `}>
                            <cat.icon className="text-white w-6 h-6" />
                        </div>
                        <span className={`
                            text-xs font-medium text-center transition-colors line-clamp-2 max-w-[70px] leading-tight
                            ${isSelected ? 'text-[#529A60] font-bold' : 'text-gray-600'}
                        `}>
                            {cat.shortName}
                        </span>
                    </button>
                );
            })}
        </div>
    </div>
  );
}