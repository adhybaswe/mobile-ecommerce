import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '../features/auth/authStore';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            staleTime: 5 * 60 * 1000, // 5 minutes
            refetchOnWindowFocus: false,
        },
    },
});

export default function RootLayout() {
    const checkAuth = useAuthStore((state) => state.checkAuth);

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{ headerShown: false }} />
        </QueryClientProvider>
    );
}
