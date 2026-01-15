import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native';
import { Colors, BorderRadius } from '../../constants/colors';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 32;

interface Banner {
    id: string;
    title: string;
    subtitle: string;
    buttonText: string;
    image: string;
}

const DUMMY_BANNERS: Banner[] = [
    {
        id: '1',
        title: 'New Collection',
        subtitle: 'Discount 65% for\nthe first transaction',
        buttonText: 'Shop Now',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
    },
    {
        id: '2',
        title: 'Flash Sale',
        subtitle: 'Up to 80% off\nLimited time only',
        buttonText: 'Shop Now',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    },
    {
        id: '3',
        title: 'Best Deals',
        subtitle: 'Special offers\nJust for you',
        buttonText: 'Shop Now',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
    },
];

export const BannerSlideshow: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % DUMMY_BANNERS.length;
            setCurrentIndex(nextIndex);
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        }, 4000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index || 0);
        }
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;

    const renderBanner = ({ item }: { item: Banner }) => (
        <View style={styles.bannerContainer}>
            <View style={styles.banner}>
                <View style={styles.bannerContent}>
                    <Text style={styles.bannerTitle}>{item.title}</Text>
                    <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
                    <TouchableOpacity style={styles.bannerButton}>
                        <Text style={styles.bannerButtonText}>{item.buttonText}</Text>
                    </TouchableOpacity>
                </View>
                <Image source={{ uri: item.image }} style={styles.bannerImage} />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={DUMMY_BANNERS}
                renderItem={renderBanner}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                snapToInterval={BANNER_WIDTH + 16}
                decelerationRate="fast"
                contentContainerStyle={styles.flatListContent}
            />
            <View style={styles.pagination}>
                {DUMMY_BANNERS.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.paginationDot,
                            index === currentIndex && styles.paginationDotActive,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    flatListContent: {
        paddingHorizontal: 16,
    },
    bannerContainer: {
        width: BANNER_WIDTH,
        marginRight: 16,
    },
    banner: {
        backgroundColor: Colors.border,
        borderRadius: BorderRadius.lg,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 160,
        overflow: 'hidden',
    },
    bannerContent: {
        flex: 1,
        justifyContent: 'center',
    },
    bannerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: 8,
    },
    bannerSubtitle: {
        fontSize: 13,
        color: Colors.textSecondary,
        marginBottom: 16,
        lineHeight: 18,
    },
    bannerButton: {
        backgroundColor: Colors.primaryLight,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: BorderRadius.sm,
        alignSelf: 'flex-start',
    },
    bannerButtonText: {
        color: Colors.textWhite,
        fontSize: 13,
        fontWeight: '600',
    },
    bannerImage: {
        width: 180,
        height: 120,
        borderRadius: BorderRadius.md,
        marginLeft: 12,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        gap: 6,
    },
    paginationDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#d1d5db',
    },
    paginationDotActive: {
        width: 20,
        backgroundColor: Colors.primaryLight,
    },
});
