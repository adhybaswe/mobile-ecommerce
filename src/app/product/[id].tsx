import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useProduct } from '../../hooks/useApi';
import { useCartStore } from '../../features/cart/cartStore';
import { useWishlistStore } from '../../features/wishlist/wishlistStore';
import { useAuthStore } from '../../features/auth/authStore';
import { Loading } from '../../components/common/Loading';
import { ErrorState } from '../../components/common/ErrorState';
import { formatCurrency } from '../../utils/format';
import { Colors, BorderRadius, Spacing } from '../../constants/colors';

// Mock color options for the color selector
const COLOR_OPTIONS = [
    { id: 1, name: 'Teal', color: '#2D5F5D' },
    { id: 2, name: 'Black', color: '#1F2937' },
    { id: 3, name: 'Brown', color: '#78350F' },
    { id: 4, name: 'Purple', color: '#5B21B6' },
    { id: 5, name: 'Olive', color: '#65734B' },
];

export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    const { data: product, isLoading, error, refetch } = useProduct(Number(id));
    const addItem = useCartStore((state) => state.addItem);
    const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

    const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    const inWishlist = product ? isInWishlist(product.id) : false;

    if (isLoading) {
        return <Loading />;
    }

    if (error || !product) {
        return (
            <ErrorState
                message="Failed to load product details"
                onRetry={() => refetch()}
            />
        );
    }

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            router.push('/(auth)/login');
            return;
        }

        addItem(product);
        Alert.alert(
            'Added to Cart',
            `${product.title} has been added to your cart`,
            [
                { text: 'Continue Shopping', style: 'cancel' },
                {
                    text: 'View Cart',
                    onPress: () => router.push('/(tabs)/cart'),
                },
            ]
        );
    };

    const handleWishlistToggle = () => {
        if (inWishlist) {
            removeFromWishlist(product.id);
            Alert.alert('Removed from Wishlist', `${product.title} has been removed from your wishlist`);
        } else {
            addToWishlist(product);
            Alert.alert('Added to Wishlist', `${product.title} has been added to your wishlist`);
        }
    };

    // Truncate description for collapsed state
    const truncatedDescription = product.description.length > 120
        ? product.description.substring(0, 120) + '...'
        : product.description;

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Product Details</Text>
                <TouchableOpacity onPress={handleWishlistToggle} style={styles.iconButton}>
                    <Ionicons
                        name={inWishlist ? "heart" : "heart-outline"}
                        size={24}
                        color={inWishlist ? Colors.error : Colors.textPrimary}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Product Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: product.image }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                {/* Product Details Card */}
                <View style={styles.detailsCard}>
                    {/* Category */}
                    <Text style={styles.category}>{product.category}</Text>

                    {/* Title and Rating */}
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>{product.title}</Text>
                        <TouchableOpacity
                            style={styles.ratingBadge}
                            onPress={() => router.push('/product/reviews')}
                        >
                            <Ionicons name="star" size={16} color={Colors.rating} />
                            <Text style={styles.ratingText}>{product.rating.rate}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Product Details Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Product Details</Text>
                        <Text style={styles.description}>
                            {isDescriptionExpanded ? product.description : truncatedDescription}
                            {product.description.length > 120 && (
                                <Text
                                    style={styles.readMore}
                                    onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                                >
                                    {isDescriptionExpanded ? ' Read less' : ' Read more'}
                                </Text>
                            )}
                        </Text>
                    </View>

                    {/* Color Selector */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            Select Color: <Text style={styles.selectedColorName}>{selectedColor.name}</Text>
                        </Text>
                        <View style={styles.colorOptions}>
                            {COLOR_OPTIONS.map((colorOption) => (
                                <TouchableOpacity
                                    key={colorOption.id}
                                    style={[
                                        styles.colorCircle,
                                        { backgroundColor: colorOption.color },
                                        selectedColor.id === colorOption.id && styles.selectedColorCircle,
                                    ]}
                                    onPress={() => setSelectedColor(colorOption)}
                                >
                                    {selectedColor.id === colorOption.id && (
                                        <Ionicons name="checkmark" size={20} color="#fff" />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Footer with Price and Add to Cart */}
            <View style={styles.footer}>
                <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>Total Price</Text>
                    <Text style={styles.price}>{formatCurrency(product.price)}</Text>
                </View>
                <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                    <Ionicons name="bag-handle-outline" size={20} color="#fff" />
                    <Text style={styles.addToCartText}>Add to Cart</Text>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        backgroundColor: '#fff',
    },
    iconButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
    content: {
        flex: 1,
    },
    imageContainer: {
        backgroundColor: Colors.backgroundLight,
        paddingVertical: 40,
        paddingHorizontal: Spacing.xl,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 280,
    },
    detailsCard: {
        backgroundColor: '#fff',
        borderTopLeftRadius: BorderRadius.xl,
        borderTopRightRadius: BorderRadius.xl,
        paddingTop: Spacing.xl,
        paddingHorizontal: Spacing.lg,
        paddingBottom: Spacing.xxl,
        marginTop: -20,
    },
    category: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: Spacing.sm,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.lg,
    },
    title: {
        flex: 1,
        fontSize: 22,
        fontWeight: '700',
        color: Colors.textPrimary,
        marginRight: Spacing.md,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF9E6',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: BorderRadius.sm,
        gap: 4,
    },
    ratingText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
    section: {
        marginBottom: Spacing.xl,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.textPrimary,
        marginBottom: Spacing.md,
    },
    selectedColorName: {
        fontWeight: '400',
        color: Colors.textSecondary,
    },
    description: {
        fontSize: 14,
        color: Colors.textSecondary,
        lineHeight: 22,
    },
    readMore: {
        color: Colors.primary,
        fontWeight: '600',
    },
    colorOptions: {
        flexDirection: 'row',
        gap: Spacing.md,
    },
    colorCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedColorCircle: {
        borderWidth: 3,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.lg,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: Colors.borderLight,
        gap: Spacing.md,
    },
    priceContainer: {
        flex: 1,
    },
    priceLabel: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginBottom: 4,
    },
    price: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
    addToCartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.lg,
        paddingHorizontal: Spacing.xl,
        borderRadius: BorderRadius.lg,
        gap: Spacing.sm,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    addToCartText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});
