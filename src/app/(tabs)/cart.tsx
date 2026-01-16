import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCartStore } from '../../features/cart/cartStore';
import { CartItemCard } from '../../components/cart/CartItemCard';
import { Button } from '../../components/common/Button';
import { PageHeader } from '../../components/common/PageHeader';
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
                <PageHeader title="Cart" />
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
            <PageHeader title="Cart" showBackButton />
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

