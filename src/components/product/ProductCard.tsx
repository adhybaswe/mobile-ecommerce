import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/format';
import { useRouter } from 'expo-router';
import { useWishlistStore } from '../../features/wishlist/wishlistStore';
import { Colors } from '../../constants/colors';

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
                        color={inWishlist ? "#ef4444" : "#6b7280"}
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
    imageContainer: {
        alignItems: 'center',
        marginBottom: 12,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 192,
        borderRadius: 8,
    },
    wishlistButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    content: {
        gap: 8,
    },
    category: {
        fontSize: 12,
        color: '#6b7280',
        letterSpacing: 0.5,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    price: {
        fontSize: 20,
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
        fontSize: 14,
        color: Colors.textSecondary,
    },
});

