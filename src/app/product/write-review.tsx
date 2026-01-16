import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PageHeader } from '../../components/common/PageHeader';
import { Colors, BorderRadius, Spacing } from '../../constants/colors';

// Mock product data - in real app, this would come from route params
const MOCK_PRODUCT = {
    id: 1,
    title: 'Mens Casual Premium Slim Fit T-Shirts',
    category: 'Men\'s Clothing',
    quantity: 2,
    price: 180.00,
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
};

export default function WriteReviewScreen() {
    const router = useRouter();
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    const handleSubmit = () => {
        if (rating === 0) {
            Alert.alert('Rating Required', 'Please select a rating before submitting.');
            return;
        }

        if (reviewText.trim().length === 0) {
            Alert.alert('Review Required', 'Please write a review before submitting.');
            return;
        }

        // In a real app, this would submit to an API
        Alert.alert(
            'Review Submitted',
            'Thank you for your review!',
            [
                {
                    text: 'OK',
                    onPress: () => router.back(),
                },
            ]
        );
    };

    const handleCancel = () => {
        if (rating > 0 || reviewText.trim().length > 0) {
            Alert.alert(
                'Discard Review',
                'Are you sure you want to discard your review?',
                [
                    { text: 'Keep Editing', style: 'cancel' },
                    {
                        text: 'Discard',
                        style: 'destructive',
                        onPress: () => router.back(),
                    },
                ]
            );
        } else {
            router.back();
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <PageHeader
                title="Leave Review"
                showBackButton
                onBackPress={handleCancel}
            />

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Product Card */}
                <View style={styles.productCard}>
                    <Image
                        source={{ uri: MOCK_PRODUCT.image }}
                        style={styles.productImage}
                        resizeMode="contain"
                    />
                    <View style={styles.productInfo}>
                        <Text style={styles.productTitle}>{MOCK_PRODUCT.title}</Text>
                        <Text style={styles.productDetails}>
                            {MOCK_PRODUCT.category} | Qty: {MOCK_PRODUCT.quantity} pcs
                        </Text>
                        <Text style={styles.productPrice}>${MOCK_PRODUCT.price.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity style={styles.reorderButton}>
                        <Text style={styles.reorderButtonText}>Re-Order</Text>
                    </TouchableOpacity>
                </View>

                {/* Rating Section */}
                <View style={styles.ratingSection}>
                    <Text style={styles.questionText}>How is your order?</Text>

                    <Text style={styles.ratingLabel}>Your overall rating</Text>

                    <View style={styles.starsContainer}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <TouchableOpacity
                                key={star}
                                onPress={() => setRating(star)}
                                style={styles.starButton}
                            >
                                <Ionicons
                                    name={star <= rating ? 'star' : 'star-outline'}
                                    size={48}
                                    color={star <= rating ? Colors.rating : Colors.textTertiary}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Review Text Section */}
                <View style={styles.reviewSection}>
                    <Text style={styles.sectionTitle}>Add detailed review</Text>
                    <TextInput
                        style={styles.reviewInput}
                        placeholder="Enter here"
                        placeholderTextColor={Colors.inputPlaceholder}
                        multiline
                        numberOfLines={6}
                        textAlignVertical="top"
                        value={reviewText}
                        onChangeText={setReviewText}
                    />
                </View>

                {/* Add Photo Section */}
                <TouchableOpacity style={styles.addPhotoButton}>
                    <Ionicons name="camera-outline" size={24} color={Colors.textSecondary} />
                    <Text style={styles.addPhotoText}>add photo</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Footer Buttons */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
    },
    content: {
        flex: 1,
    },
    productCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        margin: Spacing.lg,
        padding: Spacing.lg,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
    },
    productImage: {
        width: 70,
        height: 70,
        borderRadius: BorderRadius.sm,
        backgroundColor: Colors.backgroundLight,
    },
    productInfo: {
        flex: 1,
        marginLeft: Spacing.md,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.textPrimary,
        marginBottom: 4,
    },
    productDetails: {
        fontSize: 13,
        color: Colors.textSecondary,
        marginBottom: 6,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
    reorderButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.sm,
    },
    reorderButtonText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#fff',
    },
    ratingSection: {
        backgroundColor: '#fff',
        marginHorizontal: Spacing.lg,
        marginBottom: Spacing.lg,
        padding: Spacing.xl,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
    },
    questionText: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.textPrimary,
        marginBottom: Spacing.xl,
        textAlign: 'center',
    },
    ratingLabel: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: Spacing.lg,
    },
    starsContainer: {
        flexDirection: 'row',
        gap: Spacing.sm,
    },
    starButton: {
        padding: 4,
    },
    reviewSection: {
        backgroundColor: '#fff',
        marginHorizontal: Spacing.lg,
        marginBottom: Spacing.lg,
        padding: Spacing.xl,
        borderRadius: BorderRadius.md,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.textPrimary,
        marginBottom: Spacing.md,
    },
    reviewInput: {
        backgroundColor: Colors.backgroundLight,
        borderRadius: BorderRadius.sm,
        padding: Spacing.lg,
        fontSize: 15,
        color: Colors.textPrimary,
        minHeight: 120,
    },
    addPhotoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Spacing.lg,
        marginBottom: Spacing.xxl,
        gap: Spacing.sm,
    },
    addPhotoText: {
        fontSize: 15,
        color: Colors.textSecondary,
    },
    footer: {
        flexDirection: 'row',
        padding: Spacing.lg,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: Colors.borderLight,
        gap: Spacing.md,
    },
    cancelButton: {
        flex: 1,
        paddingVertical: Spacing.lg,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        backgroundColor: Colors.backgroundGray,
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
    submitButton: {
        flex: 1,
        paddingVertical: Spacing.lg,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        backgroundColor: Colors.primary,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});
