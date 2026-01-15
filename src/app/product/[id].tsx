import React from 'react';
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
import { Button } from '../../components/common/Button';
import { formatCurrency } from '../../utils/format';
import { Colors } from '../../constants/colors';

export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    const { data: product, isLoading, error, refetch } = useProduct(Number(id));
    const addItem = useCartStore((state) => state.addItem);
    const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

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

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Product Details</Text>
                <TouchableOpacity onPress={handleWishlistToggle} style={styles.wishlistButton}>
                    <Ionicons
                        name={inWishlist ? "heart" : "heart-outline"}
                        size={24}
                        color={inWishlist ? Colors.error : Colors.textPrimary}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.content}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: product.image }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.details}>
                    <Text style={styles.category}>
                        {product.category.toUpperCase()}
                    </Text>

                    <Text style={styles.title}>
                        {product.title}
                    </Text>

                    <View style={styles.ratingInfo}>
                        <Text style={styles.star}>★</Text>
                        <Text style={styles.ratingValue}>
                            {product.rating.rate}
                        </Text>
                        <Text style={styles.ratingCount}>
                            ({product.rating.count} reviews)
                        </Text>
                    </View>

                    <Text style={styles.price}>
                        {formatCurrency(product.price)}
                    </Text>

                    <View style={styles.descriptionContainer}>
                        <Text style={styles.sectionTitle}>
                            Description
                        </Text>
                        <Text style={styles.description}>
                            {product.description}
                        </Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Add to Cart"
                    onPress={handleAddToCart}
                    size="lg"
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
    wishlistButton: {
        padding: 8,
        marginRight: -8,
    },
    content: {
        flex: 1,
    },
    imageContainer: {
        backgroundColor: '#f9fafb',
        padding: 32,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 320,
    },
    details: {
        padding: 24,
    },
    category: {
        fontSize: 12,
        color: Colors.textSecondary,
        fontWeight: '600',
        letterSpacing: 1,
        marginBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: 16,
    },
    ratingInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    star: {
        color: Colors.rating,
        fontSize: 20,
        marginRight: 4,
    },
    ratingValue: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
    ratingCount: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginLeft: 8,
    },
    price: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.price,
        marginBottom: 24,
    },
    descriptionContainer: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.textPrimary,
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: Colors.textSecondary,
        lineHeight: 24,
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        padding: 16,
        backgroundColor: '#ffffff',
    },
});
