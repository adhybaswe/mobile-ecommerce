import { create } from 'zustand';
import { CartItem, Product } from '../../types';

interface CartState {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    getTotal: () => number;
    getItemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],

    addItem: (product: Product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
            set({
                items: items.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            });
        } else {
            set({
                items: [...items, { ...product, quantity: 1 }],
            });
        }
    },

    removeItem: (productId: number) => {
        set({
            items: get().items.filter((item) => item.id !== productId),
        });
    },

    updateQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
            get().removeItem(productId);
            return;
        }

        set({
            items: get().items.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            ),
        });
    },

    clearCart: () => {
        set({ items: [] });
    },

    getTotal: () => {
        return get().items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    },

    getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
    },
}));
