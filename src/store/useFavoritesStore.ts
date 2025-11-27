import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],

      toggleFavorite: (id) => {
        const { favoriteIds } = get();
        const exists = favoriteIds.includes(id);

        if (exists) {
          set({ favoriteIds: favoriteIds.filter((favId) => favId !== id) });
        } else {
          set({ favoriteIds: [...favoriteIds, id] });
        }
      },

      isFavorite: (id) => get().favoriteIds.includes(id),
    }),
    {
      name: 'comigo-favorites-storage',
    }
  )
);