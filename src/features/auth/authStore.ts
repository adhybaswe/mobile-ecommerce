import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

interface User {
    username: string;
    name?: string;
}

interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    login: (token: string, username: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    user: null,
    isAuthenticated: false,

    login: async (token: string, username: string) => {
        try {
            await SecureStore.setItemAsync(TOKEN_KEY, token);
            const user: User = { username, name: username };
            await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
            set({ token, user, isAuthenticated: true });
        } catch (error) {
            // Error saving token
        }
    },

    logout: async () => {
        try {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
            await SecureStore.deleteItemAsync(USER_KEY);
            set({ token: null, user: null, isAuthenticated: false });
        } catch (error) {
            // Error removing token
        }
    },

    checkAuth: async () => {
        try {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            const userStr = await SecureStore.getItemAsync(USER_KEY);
            if (token && userStr) {
                const user = JSON.parse(userStr);
                set({ token, user, isAuthenticated: true });
            }
        } catch (error) {
            // Error checking auth
        }
    },
}));

