import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/common/Button';
import { Colors, FontSizes, Spacing, BorderRadius } from '../constants/colors';

export default function CheckoutSuccessScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.replace('/(tabs)')}
                >
                    <Ionicons name="arrow-back" size={24} color="#111827" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Payment</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Content */}
            <View style={styles.content}>
                {/* Success Icon */}
                <View style={styles.iconContainer}>
                    <Ionicons name="checkmark" size={64} color="#ffffff" />
                </View>

                {/* Title */}
                <Text style={styles.title}>Payment Successful!</Text>

                {/* Message */}
                <Text style={styles.message}>Thank you for your purchase.</Text>
            </View>

            {/* Bottom Buttons */}
            <View style={styles.bottomContainer}>
                <Button
                    title="View Order"
                    onPress={() => router.replace('/(tabs)/profile')}
                    style={styles.viewOrderButton}
                />

                <TouchableOpacity
                    style={styles.receiptButton}
                    onPress={() => router.replace('/(tabs)/profile')}
                >
                    <Text style={styles.receiptButtonText}>View E-Receipt</Text>
                </TouchableOpacity>
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
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Colors.backgroundGray,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.backgroundLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: FontSizes.xl,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
    placeholder: {
        width: 40,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Spacing.xl,
    },
    iconContainer: {
        width: 120,
        height: 120,
        backgroundColor: Colors.backgroundSlate,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.xxl,
    },
    title: {
        fontSize: FontSizes.xxxl,
        fontWeight: '700',
        color: Colors.textPrimary,
        marginBottom: Spacing.md,
        textAlign: 'center',
    },
    message: {
        fontSize: FontSizes.base,
        color: Colors.textTertiary,
        textAlign: 'center',
    },
    bottomContainer: {
        paddingHorizontal: Spacing.xl,
        paddingBottom: Spacing.xxl,
        gap: Spacing.lg,
    },
    viewOrderButton: {
        paddingVertical: Spacing.lg,
    },
    receiptButton: {
        alignItems: 'center',
        paddingVertical: Spacing.lg,
    },
    receiptButtonText: {
        fontSize: FontSizes.lg,
        fontWeight: '600',
        color: Colors.backgroundSlate,
    },
});
