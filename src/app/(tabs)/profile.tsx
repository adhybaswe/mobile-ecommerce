import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PageHeader } from '../../components/common/PageHeader';
import { CustomBottomNav } from '../../components/navigation/CustomBottomNav';
import { useAuthStore } from '../../features/auth/authStore';
import { Colors, FontSizes, Spacing, BorderRadius } from '../../constants/colors';

type MenuItem = {
    id: string;
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    route?: string;
    action?: () => void;
};

export default function ProfileScreen() {
    const router = useRouter();
    const { user, logout } = useAuthStore();

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

    const menuItems: MenuItem[] = [
        { id: 'profile', icon: 'person-outline', label: 'Your profile', route: '/profile/edit' },
        { id: 'address', icon: 'location-outline', label: 'Manage Address', route: '/profile/addresses' },
        { id: 'payment', icon: 'card-outline', label: 'Payment Methods', route: '/profile/payment' },
        { id: 'orders', icon: 'receipt-outline', label: 'My Orders', route: '/profile/orders' },
        { id: 'coupons', icon: 'pricetag-outline', label: 'My Coupons', route: '/profile/coupons' },
        { id: 'settings', icon: 'settings-outline', label: 'Settings', route: '/profile/settings' },
        { id: 'help', icon: 'help-circle-outline', label: 'Help Center', route: '/profile/help' },
        { id: 'privacy', icon: 'lock-closed-outline', label: 'Privacy Policy', route: '/profile/privacy' },
        { id: 'logout', icon: 'log-out-outline', label: 'Logout', action: handleLogout },
    ];

    const handleMenuPress = (item: MenuItem) => {
        if (item.action) {
            item.action();
        } else {
            // For now, just log the action since routes don't exist yet
            console.log('Navigate to:', item.route);
            // router.push(item.route);
        }
    };

    // Get user initials for avatar
    const getUserInitials = () => {
        if (!user?.name) return 'U';
        const names = user.name.split('_');
        if (names.length >= 2) {
            return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
        }
        return user.name.charAt(0).toUpperCase();
    };

    // Format username for display
    const getDisplayName = () => {
        if (!user?.name) return 'User';
        // Convert username like "mor_2314" to "Mor 2314"
        return user.name.split('_').map(part =>
            part.charAt(0).toUpperCase() + part.slice(1)
        ).join(' ');
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <PageHeader title="Profile" />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Profile Header */}
                <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{getUserInitials()}</Text>
                        </View>
                        <View style={styles.editBadge}>
                            <Ionicons name="create-outline" size={16} color={Colors.textWhite} />
                        </View>
                    </View>
                    <Text style={styles.userName}>{getDisplayName()}</Text>
                </View>

                {/* Menu Items */}
                <View style={styles.menuContainer}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.menuItem,
                                index === menuItems.length - 1 && styles.menuItemLast
                            ]}
                            onPress={() => handleMenuPress(item)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.menuItemLeft}>
                                <Ionicons
                                    name={item.icon}
                                    size={24}
                                    color={item.id === 'logout' ? Colors.error : Colors.textSecondary}
                                />
                                <Text style={[
                                    styles.menuItemText,
                                    item.id === 'logout' && styles.logoutText
                                ]}>{item.label}</Text>
                            </View>
                            <Ionicons
                                name="chevron-forward"
                                size={20}
                                color={Colors.textSecondary}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <CustomBottomNav />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.xxl,
        paddingBottom: 100,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: Spacing.xxl,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: Spacing.lg,
    },
    avatar: {
        width: 120,
        height: 120,
        backgroundColor: Colors.textSecondary,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: 40,
        color: Colors.textWhite,
        fontWeight: 'bold',
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 36,
        height: 36,
        backgroundColor: Colors.textPrimary,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: Colors.background,
    },
    userName: {
        fontSize: FontSizes.xxxl,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    menuContainer: {
        backgroundColor: Colors.background,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: Spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: Colors.divider,
    },
    menuItemLast: {
        borderBottomWidth: 0,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
    },
    menuItemText: {
        fontSize: FontSizes.lg,
        color: Colors.textPrimary,
        fontWeight: '500',
    },
    logoutText: {
        color: Colors.error,
    },
});

