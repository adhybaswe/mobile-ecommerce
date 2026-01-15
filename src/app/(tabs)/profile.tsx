import React from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '../../components/common/Button';
import { useAuthStore } from '../../features/auth/authStore';
import { CustomBottomNav } from '../../components/navigation/CustomBottomNav';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../../constants/colors';

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
        backgroundColor: Colors.background,
    },
    content: {
        flex: 1,
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.xxl,
        paddingBottom: 100,
    },
    header: {
        alignItems: 'center',
        marginBottom: Spacing.xxl,
    },
    avatar: {
        width: 96,
        height: 96,
        backgroundColor: Colors.primary,
        borderRadius: 48,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.lg,
    },
    avatarText: {
        fontSize: 36,
        color: Colors.textWhite,
        fontWeight: 'bold',
    },
    name: {
        fontSize: FontSizes.xxxl,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: Spacing.xs,
    },
    email: {
        fontSize: FontSizes.lg,
        color: Colors.textSecondary,
    },
    section: {
        backgroundColor: Colors.background,
        borderRadius: BorderRadius.md,
        padding: Spacing.lg,
        marginBottom: Spacing.lg,
        ...Shadows.small,
    },
    sectionTitle: {
        fontSize: FontSizes.xl,
        fontWeight: '600',
        color: Colors.textPrimary,
        marginBottom: Spacing.md,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: Spacing.sm,
    },
    label: {
        fontSize: FontSizes.lg,
        color: Colors.textSecondary,
    },
    value: {
        fontSize: FontSizes.lg,
        fontWeight: '500',
        color: Colors.textPrimary,
    },
    separator: {
        height: 1,
        backgroundColor: Colors.divider,
        marginVertical: Spacing.xs,
    },
    footer: {
        marginTop: 'auto',
        marginBottom: Spacing.xxl,
    },
});
