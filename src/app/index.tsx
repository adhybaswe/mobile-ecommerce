import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useAuthStore } from '../features/auth/authStore';

export default function Index() {
    return <Redirect href="/(tabs)" />;
}
