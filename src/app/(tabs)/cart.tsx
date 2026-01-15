import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCartStore } from '../../features/cart/cartStore';
import { CartItemCard } from '../../components/cart/CartItemCard';
import { Button } from '../../components/common/Button';
import { formatCurrency } from '../../utils/format';
import { CustomBottomNav } from '../../components/navigation/CustomBottomNav';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../../constants/colors';

export default function CartScreen() {
    const router = useRouter();
    const { items, getTotal } = useCartStore();
    const total = getTotal();

    if (items.length === 0) {
        return (
            <SafeAreaView style={styles.container} edges={['top']}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Cart</Text>
                </View>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyEmoji}>🛒</Text>
                    <Text style={styles.emptyTitle}>Your cart is empty</Text>
                    <Text style={styles.emptySubtitle}>
                        Add some products to get started
                    </Text>
                    <Button
                        title="Start Shopping"
                        onPress={() => router.push('/(tabs)')}
                    />
                </View>
                <CustomBottomNav />
            </SafeAreaView>
        );
    }

    const handleCheckout = () => {
        router.push('/checkout');
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Cart</Text>
                <View style={styles.headerRight} />
            </View>
            <View style={styles.content}>
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <CartItemCard item={item} />}
                    contentContainerStyle={styles.listContent}
                />

                <View style={styles.footer}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalAmount}>
                            {formatCurrency(total)}
                        </Text>
                    </View>

                    <Button
                        title="Proceed to Checkout"
                        onPress={handleCheckout}
                        size="lg"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.xl - 6,
        paddingTop: Spacing.lg,
        paddingBottom: Spacing.md,
        backgroundColor: Colors.background,
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
    },
    headerTitle: {
        fontSize: FontSizes.xxxl,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    headerRight: {
        width: 40,
    },
    content: {
        flex: 1,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Spacing.xl,
    },
    emptyEmoji: {
        fontSize: 60,
        marginBottom: Spacing.lg,
    },
    emptyTitle: {
        fontSize: FontSizes.xxxl,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: Spacing.sm,
    },
    emptySubtitle: {
        fontSize: FontSizes.lg,
        color: Colors.textSecondary,
        marginBottom: Spacing.xl,
        textAlign: 'center',
    },
    listContent: {
        padding: Spacing.lg,
        paddingBottom: 120,
    },
    footer: {
        backgroundColor: Colors.background,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        padding: Spacing.lg,
        ...Shadows.medium,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    totalLabel: {
        fontSize: FontSizes.xl,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
    totalAmount: {
        fontSize: FontSizes.xxxl,
        fontWeight: 'bold',
        color: Colors.price,
    },
});

