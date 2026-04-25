import { create } from 'zustand';

interface FavoritesState {
    favorites: string[]; // Store ModelYear IDs or Trim IDs
    addFavorite: (id: string) => void;
    removeFavorite: (id: string) => void;
    toggleFavorite: (id: string) => void;
}

export const useFavorites = create<FavoritesState>((set) => ({
    favorites: [],
    addFavorite: (id) => set((state) => ({ favorites: [...new Set([...state.favorites, id])] })),
    removeFavorite: (id) => set((state) => ({ favorites: state.favorites.filter((fav) => fav !== id) })),
    toggleFavorite: (id) => set((state) => {
        const isFav = state.favorites.includes(id);
        if (isFav) {
            return { favorites: state.favorites.filter((fav) => fav !== id) };
        }
        return { favorites: [...state.favorites, id] };
    }),
}));
