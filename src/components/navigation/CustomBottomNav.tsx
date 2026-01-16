import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { useAuthStore } from '../../features/auth/authStore';
import { useCartStore } from '../../features/cart/cartStore';
import { Colors } from '../../constants/colors';

export const CustomBottomNav: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const itemCount = useCartStore((state) => state.getItemCount());

    const isActive = (path: string) => {
        // Normalize paths for comparison
        const normalizedPathname = pathname.replace(/\/$/, ''); // Remove trailing slash
        const normalizedPath = path.replace(/\/$/, '');

        // Check for exact match
        if (normalizedPathname === normalizedPath) return true;

        // Special case for home/index route
        if (path === '/(tabs)' && (pathname === '/' || pathname === '/(tabs)' || pathname === '/(tabs)/' || pathname === '')) return true;

        // For cart, favorites, profile - check exact match without (tabs) prefix
        const pathnameWithoutTabs = pathname.replace('/(tabs)', '');
        const pathWithoutTabs = path.replace('/(tabs)', '');
        if (pathnameWithoutTabs === pathWithoutTabs) return true;

        return false;
    };

    const navItems = [
        { path: '/(tabs)', icon: 'home-outline', activeIcon: 'home', requiresAuth: false },
        { path: '/(tabs)/cart', icon: 'bag-outline', activeIcon: 'bag', requiresAuth: true, showBadge: true },
        { path: '/(tabs)/favorites', icon: 'heart-outline', activeIcon: 'heart', requiresAuth: true },
        { path: '/(tabs)/messages', icon: 'chatbubble-outline', activeIcon: 'chatbubble', requiresAuth: false },
        { path: '/(tabs)/profile', icon: 'person-outline', activeIcon: 'person', requiresAuth: true },
    ];

    const handleNavPress = (item: typeof navItems[0]) => {
        if (item.requiresAuth && !isAuthenticated) {
            router.push('/(auth)/login');
        } else {
            router.push(item.path as any);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.navBar}>
                {navItems.map((item, index) => {
                    const active = isActive(item.path);
                    const showBadge = item.showBadge && itemCount > 0;

                    return (
                        <TouchableOpacity
                            key={index}
                            style={styles.navItem}
                            onPress={() => handleNavPress(item)}
                        >
                            <View style={[styles.iconContainer, active && styles.iconContainerActive]}>
                                <Ionicons
                                    name={active ? item.activeIcon as any : item.icon as any}
                                    size={24}
                                    color={active ? Colors.navBarText : Colors.navBarInactive}
                                />
                                {showBadge && (
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>
                                            {itemCount > 9 ? '9+' : itemCount}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingBottom: Platform.OS === 'ios' ? 24 : 16,
        backgroundColor: 'transparent',
        pointerEvents: 'box-none',
    },
    navBar: {
        flexDirection: 'row',
        backgroundColor: Colors.navBar,
        borderRadius: 32,
        paddingVertical: 12,
        paddingHorizontal: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
        shadowColor: Colors.shadow,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 48, // Fully rounded
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    iconContainerActive: {
        backgroundColor: Colors.navBarActive,
        borderRadius: 48, // Ensure it stays rounded when active
    },
    badge: {
        position: 'absolute',
        top: 3,
        right: 2,
        backgroundColor: Colors.badge,
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
    },
    badgeText: {
        color: Colors.textWhite,
        fontSize: 12,
        fontWeight: 'bold',
    },
});
