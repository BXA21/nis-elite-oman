import { create } from 'zustand';

interface CompareState {
    selections: string[]; // Store ModelYear IDs or Trim IDs
    addCompare: (id: string) => void;
    removeCompare: (id: string) => void;
    toggleCompare: (id: string) => void;
    clearCompare: () => void;
}

export const useCompare = create<CompareState>((set) => ({
    selections: [],
    addCompare: (id) => set((state) => {
        if (state.selections.length >= 4) return state; // Max 4 comparisons
        return { selections: [...new Set([...state.selections, id])] };
    }),
    removeCompare: (id) => set((state) => ({ selections: state.selections.filter((sel) => sel !== id) })),
    toggleCompare: (id) => set((state) => {
        const isCompare = state.selections.includes(id);
        if (isCompare) {
            return { selections: state.selections.filter((sel) => sel !== id) };
        }
        if (state.selections.length >= 4) return state; // Max 4
        return { selections: [...state.selections, id] };
    }),
    clearCompare: () => set({ selections: [] }),
}));
