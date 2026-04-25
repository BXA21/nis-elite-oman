import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ALTIMA_PARTS, Part } from '@/data/parts';

interface ProductState {
  products: Part[];
  addProduct: (p: Omit<Part, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Part>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, inStock: boolean) => void;
}

export const useProducts = create<ProductState>()(
  persist(
    (set, get) => ({
      products: ALTIMA_PARTS,

      addProduct: (p) => {
        const newPart: Part = {
          ...p,
          id: `part-${Date.now()}`,
        };
        set((state) => ({ products: [...state.products, newPart] }));
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({ products: state.products.filter((p) => p.id !== id) }));
      },

      updateStock: (id, inStock) => {
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, inStock } : p)),
        }));
      },
    }),
    {
      name: 'niselite-products',
    }
  )
);
