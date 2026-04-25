import { create } from 'zustand';
import { Part } from '../data/parts';

export interface CartItem extends Part {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addToCart: (part: Part, quantity?: number) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartCount: () => number;
}

export const useCart = create<CartState>((set, get) => ({
    items: [],
    addToCart: (part, quantity = 1) => {
        set((state) => {
            const existing = state.items.find((item) => item.id === part.id);
            if (existing) {
                return {
                    items: state.items.map((item) =>
                        item.id === part.id ? { ...item, quantity: item.quantity + quantity } : item
                    ),
                };
            }
            return { items: [...state.items, { ...part, quantity }] };
        });
    },
    removeFromCart: (id) => {
        set((state) => ({ items: state.items.filter((item) => item.id !== id) }));
    },
    updateQuantity: (id, quantity) => {
        set((state) => ({
            items: quantity <= 0
                ? state.items.filter((item) => item.id !== id)
                : state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        }));
    },
    clearCart: () => set({ items: [] }),
    getCartTotal: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    getCartCount: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.quantity, 0);
    },
}));
