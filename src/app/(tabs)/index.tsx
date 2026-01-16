import React from 'react';
import { View, FlatList, RefreshControl, StyleSheet, useWindowDimensions, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useProducts } from '../../hooks/useApi';
import { ProductCard } from '../../components/product/ProductCard';
import { Loading } from '../../components/common/Loading';
import { ErrorState } from '../../components/common/ErrorState';
import { LocationHeader } from '../../components/home/LocationHeader';
import { SearchBar } from '../../components/home/SearchBar';
import { BannerSlideshow } from '../../components/home/BannerSlideshow';
import { CategorySection } from '../../components/home/CategorySection';
import { CustomBottomNav } from '../../components/navigation/CustomBottomNav';

export default function HomeScreen() {
    const router = useRouter();
    const { data: products, isLoading, error, refetch, isRefetching } = useProducts();
    const { width } = useWindowDimensions();

    const cardWidth = (width - 32 - 16) / 2;

    const handleNotificationPress = () => {
        router.push('/(tabs)/notifications');
    };

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return (
            <ErrorState
                message="Failed to load products. Please try again."
                onRetry={() => refetch()}
            />
        );
    }

    const renderHeader = () => (
        <View>
            <SearchBar />
            <BannerSlideshow />
            <CategorySection />
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>All Products</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <LocationHeader onNotificationPress={handleNotificationPress} />
            <FlatList
                data={products}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ width: cardWidth }}>
                        <ProductCard product={item} />
                    </View>
                )}
                ListHeaderComponent={renderHeader}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefetching}
                        onRefresh={refetch}
                        tintColor="#374151"
                    />
                }
                showsVerticalScrollIndicator={false}
            />
            <CustomBottomNav />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 100,
    },
    columnWrapper: {
        gap: 16,
        marginBottom: 16,
    },
    sectionHeader: {
        paddingVertical: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1f2937',
    },
});
