import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

const TOKEN_KEY = 'auth_token';

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    isAuthenticated: false,

    login: async (token: string) => {
        try {
            await SecureStore.setItemAsync(TOKEN_KEY, token);
            set({ token, isAuthenticated: true });
        } catch (error) {
            // Error saving token
        }
    },

    logout: async () => {
        try {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
            set({ token: null, isAuthenticated: false });
        } catch (error) {
            // Error removing token
        }
    },

    checkAuth: async () => {
        try {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            if (token) {
                set({ token, isAuthenticated: true });
            }
        } catch (error) {
            // Error checking auth
        }
    },
}));
