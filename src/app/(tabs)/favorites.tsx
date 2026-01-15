import React from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomBottomNav } from '../../components/navigation/CustomBottomNav';
import { useWishlistStore } from '../../features/wishlist/wishlistStore';
import { ProductCard } from '../../components/product/ProductCard';

export default function FavoritesScreen() {
    const { items } = useWishlistStore();
    const { width } = useWindowDimensions();
    const cardWidth = (width - 32 - 16) / 2;

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Wishlist</Text>
            </View>
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
        backgroundColor: '#fff',
    },
    header: {
        paddingHorizontal: 18,
        paddingTop: 16,
        paddingBottom: 12,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    emptyEmoji: {
        fontSize: 60,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6b7280',
    },
    listContent: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 100,
    },
    columnWrapper: {
        gap: 16,
        marginBottom: 16,
    },
});
