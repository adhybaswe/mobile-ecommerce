import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCartStore } from '../features/cart/cartStore';
import { Button } from '../components/common/Button';
import { formatCurrency } from '../utils/format';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../constants/colors';

export default function CheckoutScreen() {
    const router = useRouter();
    const { items, getTotal, clearCart } = useCartStore();
    const [isProcessing, setIsProcessing] = useState(false);
    const total = getTotal();

    const handleCheckout = async () => {
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            clearCart();
            setIsProcessing(false);
            router.replace('/checkout-success');
        }, 2000);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Checkout</Text>
                <View style={styles.headerRight} />
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.summaryCard}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>

                    {items.map((item) => (
                        <View key={item.id} style={styles.itemRow}>
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemTitle} numberOfLines={1}>
                                    {item.title}
                                </Text>
                                <Text style={styles.itemQuantity}>
                                    Qty: {item.quantity}
                                </Text>
                            </View>
                            <Text style={styles.itemPrice}>
                                {formatCurrency(item.price * item.quantity)}
                            </Text>
                        </View>
                    ))}

                    <View style={styles.separator} />

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalAmount}>
                            {formatCurrency(total)}
                        </Text>
                    </View>
                </View>

                <View style={styles.demoBox}>
                    <Text style={styles.demoTitle}>Demo Mode</Text>
                    <Text style={styles.demoText}>
                        This is a simulated checkout. No real payment will be processed.
                    </Text>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title={isProcessing ? 'Processing...' : 'Complete Order'}
                    onPress={handleCheckout}
                    loading={isProcessing}
                    size="lg"
                />
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
    scrollView: {
        flex: 1,
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.lg,
    },
    summaryCard: {
        backgroundColor: Colors.cardBackground,
        borderRadius: BorderRadius.md,
        padding: Spacing.lg,
        marginBottom: Spacing.lg,
        ...Shadows.small,
        borderWidth: 1,
        borderColor: Colors.cardBorder,
    },
    sectionTitle: {
        fontSize: FontSizes.xl,
        fontWeight: '600',
        color: Colors.textPrimary,
        marginBottom: Spacing.lg,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: Spacing.sm,
    },
    itemDetails: {
        flex: 1,
    },
    itemTitle: {
        fontSize: FontSizes.lg,
        color: Colors.textPrimary,
    },
    itemQuantity: {
        fontSize: FontSizes.md,
        color: Colors.textSecondary,
    },
    itemPrice: {
        fontSize: FontSizes.lg,
        fontWeight: '600',
        color: Colors.textPrimary,
        marginLeft: Spacing.sm,
    },
    separator: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: Spacing.lg,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: FontSizes.xl,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    totalAmount: {
        fontSize: FontSizes.xxxl,
        fontWeight: 'bold',
        color: Colors.price,
    },
    demoBox: {
        backgroundColor: '#eff6ff',
        borderWidth: 1,
        borderColor: '#bfdbfe',
        borderRadius: BorderRadius.sm,
        padding: Spacing.lg,
        marginBottom: Spacing.xxl,
    },
    demoTitle: {
        fontSize: FontSizes.md,
        color: '#1e40af',
        fontWeight: '500',
        marginBottom: 4,
    },
    demoText: {
        fontSize: FontSizes.md,
        color: '#1d4ed8',
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        padding: Spacing.lg,
        backgroundColor: Colors.background,
    },
});
