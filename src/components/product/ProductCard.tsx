import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/format';
import { useRouter } from 'expo-router';
import { useWishlistStore } from '../../features/wishlist/wishlistStore';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../../constants/colors';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const router = useRouter();
    const { addItem, removeItem, isInWishlist } = useWishlistStore();
    const inWishlist = isInWishlist(product.id);

    const handlePress = () => {
        router.push(`/product/${product.id}`);
    };

    const handleWishlistToggle = (e: any) => {
        e.stopPropagation();
        if (inWishlist) {
            removeItem(product.id);
        } else {
            addItem(product);
        }
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            style={styles.card}
            activeOpacity={0.7}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: product.image }}
                    style={styles.image}
                    resizeMode="contain"
                />
                <TouchableOpacity
                    style={styles.wishlistButton}
                    onPress={handleWishlistToggle}
                    activeOpacity={0.7}
                >
                    <Ionicons
                        name={inWishlist ? "heart" : "heart-outline"}
                        size={20}
                        color={inWishlist ? Colors.wishlist : Colors.textSecondary}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Text style={styles.category}>{product.category.toUpperCase()}</Text>

                <Text style={styles.title} numberOfLines={2}>
                    {product.title}
                </Text>

                <View style={styles.footer}>
                    <Text style={styles.price}>
                        {formatCurrency(product.price)}
                    </Text>

                    <View style={styles.rating}>
                        <Text style={styles.star}>★</Text>
                        <Text style={styles.ratingText}>
                            {product.rating.rate} ({product.rating.count})
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.cardBackground,
        borderRadius: BorderRadius.md,
        padding: Spacing.lg,
        marginBottom: Spacing.lg,
        ...Shadows.small,
        borderWidth: 1,
        borderColor: Colors.cardBorder,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: Spacing.md,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 192,
        borderRadius: BorderRadius.sm,
    },
    wishlistButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.medium,
    },
    content: {
        gap: Spacing.sm,
    },
    category: {
        fontSize: FontSizes.xs,
        color: Colors.textSecondary,
        letterSpacing: 0.5,
    },
    title: {
        fontSize: FontSizes.lg,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Spacing.sm,
    },
    price: {
        fontSize: FontSizes.xxl,
        fontWeight: 'bold',
        color: Colors.price,
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    star: {
        color: Colors.rating,
        marginRight: 4,
    },
    ratingText: {
        fontSize: FontSizes.md,
        color: Colors.textSecondary,
    },
});

