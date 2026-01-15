import React from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '../../components/common/Button';
import { useAuthStore } from '../../features/auth/authStore';
import { CustomBottomNav } from '../../components/navigation/CustomBottomNav';
import { Colors } from '../../constants/colors';

export default function ProfileScreen() {
    const router = useRouter();
    const { logout } = useAuthStore();

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        await logout();
                        router.replace('/(auth)/login');
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>U</Text>
                    </View>
                    <Text style={styles.name}>Demo User</Text>
                    <Text style={styles.email}>demo@example.com</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Account Information
                    </Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Username</Text>
                        <Text style={styles.value}>mor_2314</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Member Since</Text>
                        <Text style={styles.value}>January 2026</Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Button
                        title="Logout"
                        onPress={handleLogout}
                        variant="outline"
                        size="lg"
                    />
                </View>
            </View>
            <CustomBottomNav />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 100,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatar: {
        width: 96,
        height: 96,
        backgroundColor: Colors.primary,
        borderRadius: 48,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    avatarText: {
        fontSize: 36,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 4,
    },
    email: {
        fontSize: 16,
        color: '#6b7280',
    },
    section: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    label: {
        fontSize: 16,
        color: '#6b7280',
    },
    value: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111827',
    },
    separator: {
        height: 1,
        backgroundColor: '#e5e7eb',
        marginVertical: 4,
    },
    footer: {
        marginTop: 'auto',
        marginBottom: 32,
    },
});
