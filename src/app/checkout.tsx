import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCartStore } from '../features/cart/cartStore';
import { Button } from '../components/common/Button';
import { formatCurrency } from '../utils/format';
import { Colors } from '../constants/colors';

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
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        paddingTop: 16,
        paddingBottom: 12,
        backgroundColor: '#fff',
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    headerRight: {
        width: 40,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    summaryCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#f3f4f6',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.textPrimary,
        marginBottom: 16,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    itemDetails: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        color: Colors.textPrimary,
    },
    itemQuantity: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.textPrimary,
        marginLeft: 8,
    },
    separator: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: 16,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    totalAmount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.price,
    },
    demoBox: {
        backgroundColor: '#eff6ff',
        borderWidth: 1,
        borderColor: '#bfdbfe',
        borderRadius: 8,
        padding: 16,
        marginBottom: 24,
    },
    demoTitle: {
        fontSize: 14,
        color: '#1e40af',
        fontWeight: '500',
        marginBottom: 4,
    },
    demoText: {
        fontSize: 14,
        color: '#1d4ed8',
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        padding: 16,
        backgroundColor: '#ffffff',
    },
});
