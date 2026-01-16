import React from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PageHeader } from '../../components/common/PageHeader';
import { CustomBottomNav } from '../../components/navigation/CustomBottomNav';
import { useWishlistStore } from '../../features/wishlist/wishlistStore';
import { ProductCard } from '../../components/product/ProductCard';
import { Colors, FontSizes, Spacing } from '../../constants/colors';

export default function FavoritesScreen() {
    const { items } = useWishlistStore();
    const { width } = useWindowDimensions();
    const cardWidth = (width - 32 - 16) / 2;

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <PageHeader title="Wishlist" />
            {items.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyEmoji}>💝</Text>
                    <Text style={styles.title}>Your Wishlist is Empty</Text>
                    <Text style={styles.subtitle}>Save your favorite items here</Text>
                </View>
            ) : (
                <FlatList
                    data={items}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{ width: cardWidth }}>
                            <ProductCard product={item} />
                        </View>
                    )}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
            <CustomBottomNav />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.lg,
    },
    emptyEmoji: {
        fontSize: 60,
        marginBottom: Spacing.lg,
    },
    title: {
        fontSize: FontSizes.xxxl,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: Spacing.sm,
    },
    subtitle: {
        fontSize: FontSizes.lg,
        color: Colors.textSecondary,
    },
    listContent: {
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.lg,
        paddingBottom: 100,
    },
    columnWrapper: {
        gap: 16,
        marginBottom: 16,
    },
});
