import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../../types';

interface WishlistState {
    items: Product[];
    addItem: (product: Product) => void;
    removeItem: (productId: number) => void;
    isInWishlist: (productId: number) => boolean;
    clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product) => {
                const { items } = get();
                const exists = items.find((item) => item.id === product.id);

                if (!exists) {
                    set({ items: [...items, product] });
                }
            },
            removeItem: (productId) => {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== productId),
                }));
            },
            isInWishlist: (productId) => {
                const { items } = get();
                return items.some((item) => item.id === productId);
            },
            clearWishlist: () => set({ items: [] }),
        }),
        {
            name: 'wishlist-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
