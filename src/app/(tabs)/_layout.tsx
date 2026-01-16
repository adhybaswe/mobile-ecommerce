import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCartStore } from '../../features/cart/cartStore';
import { useAuthStore } from '../../features/auth/authStore';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';

export default function TabsLayout() {
    const itemCount = useCartStore((state) => state.getItemCount());
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const router = useRouter();

    const handleHeaderRightPress = () => {
        if (isAuthenticated) {
            router.push('/(tabs)/cart');
        } else {
            router.push('/(auth)/login');
        }
    };

    const renderHeaderRight = () => (
        <TouchableOpacity
            onPress={handleHeaderRightPress}
            style={{ marginRight: 16 }}
        >
            {isAuthenticated ? (
                <View>
                    <Ionicons name="cart" size={24} color={Colors.textWhite} />
                    {itemCount > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>
                                {itemCount > 9 ? '9+' : itemCount}
                            </Text>
                        </View>
                    )}
                </View>
            ) : (
                <Text style={{ color: Colors.textWhite, fontWeight: 'bold', fontSize: 16 }}>
                    Login
                </Text>
            )}
        </TouchableOpacity>
    );

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.textTertiary,
                tabBarStyle: {
                    display: 'none', // Hide default tab bar
                },
                headerShown: true,
                headerStyle: {
                    backgroundColor: Colors.primary,
                },
                headerTintColor: Colors.textWhite,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerRight: renderHeaderRight,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Shop',
                    headerShown: false, // Hide header for homepage
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: 'Cart',
                    headerShown: false,
                    href: null, // Hide from tab bar
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title: 'Favorites',
                    headerShown: false,
                    href: null, // Hide from tab bar
                }}
            />
            <Tabs.Screen
                name="messages"
                options={{
                    title: 'Messages',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="chatbubbles" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: Colors.badge,
        borderRadius: 10,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeText: {
        color: Colors.textWhite,
        fontSize: 12,
        fontWeight: 'bold',
    },
});
