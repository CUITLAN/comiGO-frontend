'use client';

import { 
  Cup,          
  ChefHat,      
  Donut,        
  Wineglass,    
  Fire,         
} from '@solar-icons/react';

// Asegúrate que los nombres coincidan con los datos en dummyFoodData
const categories = [
    { id: 1, name: 'Cafetería', icon: Cup },
    { id: 2, name: 'Carnes', icon: ChefHat }, // Cambié 'Comida' por 'Carnes' para coincidir con el dato de ejemplo
    { id: 3, name: 'Panadería', icon: Donut }, 
    { id: 4, name: 'Bebidas', icon: Wineglass },
    { id: 5, name: 'Mexicana', icon: Fire },     
    { id: 6, name: 'Otros', icon: ChefHat },
];

interface CategoryListProps {
    selectedCategory: string | null;
    onSelectCategory: (category: string | null) => void;
}

export function CategoryList({ selectedCategory, onSelectCategory }: CategoryListProps) {
  
  const handleClick = (categoryName: string) => {
      // Si ya está seleccionada, la deseleccionamos (filtro toggle)
      if (selectedCategory === categoryName) {
          onSelectCategory(null);
      } else {
          onSelectCategory(categoryName);
      }
  };

  return (
    <div className="space-y-2">
        <h3 className="font-bold text-gray-800 text-sm px-1">Categorías</h3>
        
        <div className="flex gap-4 overflow-x-auto pb-2 px-1 scrollbar-hide">
            {categories.map((cat) => {
                const isSelected = selectedCategory === cat.name;
                
                return (
                    <button 
                        key={cat.id} 
                        onClick={() => handleClick(cat.name)}
                        className="flex flex-col items-center gap-1 min-w-[64px] group transition-all"
                    >
                        <div className={`
                            w-12 h-12 rounded-full flex items-center justify-center shadow-sm transition-colors
                            ${isSelected 
                                ? 'bg-[#3d7547] ring-2 ring-[#529A60] ring-offset-1' // Estado Activo
                                : 'bg-[#529A60] group-hover:bg-[#468753]' // Estado Inactivo
                            }
                        `}>
                            <cat.icon className="text-white w-6 h-6" />
                        </div>
                        <span className={`
                            text-xs font-medium text-center transition-colors
                            ${isSelected ? 'text-[#529A60] font-bold' : 'text-gray-600'}
                        `}>
                            {cat.name}
                        </span>
                    </button>
                );
            })}
        </div>
    </div>
  );
}