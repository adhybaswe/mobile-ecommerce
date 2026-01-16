import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PageHeader } from '../../components/common/PageHeader';
import { Colors, BorderRadius, Spacing } from '../../constants/colors';

// Dummy review data
const DUMMY_REVIEWS = [
    {
        id: 1,
        userName: 'Michael Chen',
        userAvatar: '👨‍💼',
        rating: 5.0,
        date: '11 months ago',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
        images: [],
        verified: true,
    },
    {
        id: 2,
        userName: 'Emma Rodriguez',
        userAvatar: '👩‍💼',
        rating: 5.0,
        date: '11 months ago',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
        images: ['🏠', '🪑'],
        verified: true,
    },
    {
        id: 3,
        userName: 'David Thompson',
        userAvatar: '👨‍🦰',
        rating: 4.0,
        date: '10 months ago',
        comment: 'Great product! Really satisfied with the quality and design. Would definitely recommend.',
        images: [],
        verified: false,
    },
    {
        id: 4,
        userName: 'Olivia Williams',
        userAvatar: '👩‍🦱',
        rating: 5.0,
        date: '9 months ago',
        comment: 'Absolutely love it! Exceeded my expectations in every way.',
        images: ['📦'],
        verified: true,
    },
];

// Rating distribution data
const RATING_DISTRIBUTION = [
    { stars: 5, count: 85, percentage: 0.79 },
    { stars: 4, count: 15, percentage: 0.14 },
    { stars: 3, count: 5, percentage: 0.05 },
    { stars: 2, count: 2, percentage: 0.02 },
    { stars: 1, count: 0, percentage: 0 },
];

export default function ReviewsScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [activeFilter, setActiveFilter] = useState<'verified' | 'latest' | null>('verified');
    const [searchQuery, setSearchQuery] = useState('');

    const averageRating = 4.5;
    const totalReviews = 107;

    const renderStars = (rating: number, size: number = 16) => {
        const stars = [];
        const fullStars = Math.floor(rating);

        for (let i = 0; i < 5; i++) {
            stars.push(
                <Ionicons
                    key={i}
                    name={i < fullStars ? 'star' : 'star-outline'}
                    size={size}
                    color={Colors.rating}
                />
            );
        }
        return stars;
    };

    const renderRatingBar = (stars: number, percentage: number) => (
        <View key={stars} style={styles.ratingBarRow}>
            <Text style={styles.ratingBarLabel}>{stars}</Text>
            <View style={styles.ratingBarContainer}>
                <View style={[styles.ratingBarFill, { width: `${percentage * 100}%` }]} />
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <PageHeader title="Review" showBackButton />

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Rating Summary */}
                <View style={styles.ratingSummary}>
                    <View style={styles.averageRatingSection}>
                        <Text style={styles.averageRatingText}>{averageRating}</Text>
                        <View style={styles.starsRow}>
                            {renderStars(averageRating, 24)}
                        </View>
                        <Text style={styles.totalReviewsText}>({totalReviews} Reviews)</Text>
                    </View>

                    <View style={styles.ratingDistribution}>
                        {RATING_DISTRIBUTION.map((item) => renderRatingBar(item.stars, item.percentage))}
                    </View>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search-outline" size={20} color={Colors.textSecondary} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search in reviews"
                        placeholderTextColor={Colors.inputPlaceholder}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                {/* Filter Buttons */}
                <View style={styles.filterContainer}>
                    <TouchableOpacity style={styles.filterButton}>
                        <Ionicons name="options-outline" size={16} color={Colors.textPrimary} />
                        <Text style={styles.filterButtonText}>Filter</Text>
                        <Ionicons name="chevron-down" size={16} color={Colors.textPrimary} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.filterChip,
                            activeFilter === 'verified' && styles.filterChipActive,
                        ]}
                        onPress={() => setActiveFilter(activeFilter === 'verified' ? null : 'verified')}
                    >
                        <Text
                            style={[
                                styles.filterChipText,
                                activeFilter === 'verified' && styles.filterChipTextActive,
                            ]}
                        >
                            Verified
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.filterChip,
                            activeFilter === 'latest' && styles.filterChipActive,
                        ]}
                        onPress={() => setActiveFilter(activeFilter === 'latest' ? null : 'latest')}
                    >
                        <Text
                            style={[
                                styles.filterChipText,
                                activeFilter === 'latest' && styles.filterChipTextActive,
                            ]}
                        >
                            Latest
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.detailedReviewsButton}>
                        <Text style={styles.detailedReviewsText}>Detailed Reviews</Text>
                    </TouchableOpacity>
                </View>

                {/* Reviews List */}
                <View style={styles.reviewsList}>
                    {DUMMY_REVIEWS.map((review) => (
                        <View key={review.id} style={styles.reviewCard}>
                            <View style={styles.reviewHeader}>
                                <View style={styles.reviewerInfo}>
                                    <View style={styles.avatar}>
                                        <Text style={styles.avatarText}>{review.userAvatar}</Text>
                                    </View>
                                    <View style={styles.reviewerDetails}>
                                        <View style={styles.reviewerNameRow}>
                                            <Text style={styles.reviewerName}>{review.userName}</Text>
                                            {review.verified && (
                                                <View style={styles.verifiedBadge}>
                                                    <Ionicons name="checkmark-circle" size={16} color={Colors.info} />
                                                </View>
                                            )}
                                        </View>
                                        <Text style={styles.reviewDate}>{review.date}</Text>
                                    </View>
                                </View>
                            </View>

                            <Text style={styles.reviewComment}>{review.comment}</Text>

                            <View style={styles.reviewFooter}>
                                <View style={styles.reviewStars}>
                                    {renderStars(review.rating, 18)}
                                    <Text style={styles.reviewRatingText}>{review.rating}</Text>
                                </View>
                            </View>

                            {review.images.length > 0 && (
                                <View style={styles.reviewImages}>
                                    {review.images.map((image, index) => (
                                        <View key={index} style={styles.reviewImage}>
                                            <Text style={styles.reviewImageEmoji}>{image}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Write Review Button */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.writeReviewButton}
                    onPress={() => router.push('/product/write-review')}
                >
                    <Text style={styles.writeReviewText}>Write Review</Text>
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
    ratingSummary: {
        backgroundColor: '#fff',
        padding: Spacing.xl,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    averageRatingSection: {
        alignItems: 'center',
        flex: 1,
    },
    averageRatingText: {
        fontSize: 48,
        fontWeight: '700',
        color: Colors.textPrimary,
        marginBottom: Spacing.sm,
    },
    starsRow: {
        flexDirection: 'row',
        gap: 4,
        marginBottom: Spacing.sm,
    },
    totalReviewsText: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    ratingDistribution: {
        flex: 1,
        gap: 8,
    },
    ratingBarRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    ratingBarLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.textPrimary,
        width: 12,
    },
    ratingBarContainer: {
        flex: 1,
        height: 8,
        backgroundColor: Colors.backgroundGray,
        borderRadius: 4,
        overflow: 'hidden',
    },
    ratingBarFill: {
        height: '100%',
        backgroundColor: Colors.primary,
        borderRadius: 4,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.backgroundGray,
        marginHorizontal: Spacing.lg,
        marginTop: Spacing.lg,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.md,
        gap: Spacing.sm,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: Colors.textPrimary,
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.lg,
        gap: Spacing.sm,
        flexWrap: 'wrap',
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.sm,
        backgroundColor: '#fff',
        gap: 4,
    },
    filterButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.textPrimary,
    },
    filterChip: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.xl,
        backgroundColor: '#fff',
    },
    filterChipActive: {
        backgroundColor: Colors.primary,
    },
    filterChipText: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.textPrimary,
    },
    filterChipTextActive: {
        color: '#fff',
    },
    detailedReviewsButton: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
    },
    detailedReviewsText: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.textPrimary,
    },
    reviewsList: {
        paddingHorizontal: Spacing.lg,
        gap: Spacing.lg,
        paddingBottom: Spacing.xxl,
    },
    reviewCard: {
        backgroundColor: '#fff',
        padding: Spacing.lg,
        borderRadius: BorderRadius.md,
    },
    reviewHeader: {
        marginBottom: Spacing.md,
    },
    reviewerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.backgroundGray,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    avatarText: {
        fontSize: 24,
    },
    reviewerDetails: {
        flex: 1,
    },
    reviewerNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    reviewerName: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
    verifiedBadge: {
        width: 16,
        height: 16,
    },
    reviewDate: {
        fontSize: 13,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    reviewComment: {
        fontSize: 14,
        color: Colors.textSecondary,
        lineHeight: 20,
        marginBottom: Spacing.md,
    },
    reviewFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reviewStars: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    reviewRatingText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
    reviewImages: {
        flexDirection: 'row',
        gap: Spacing.sm,
        marginTop: Spacing.md,
    },
    reviewImage: {
        width: 100,
        height: 100,
        borderRadius: BorderRadius.sm,
        backgroundColor: Colors.backgroundGray,
        alignItems: 'center',
        justifyContent: 'center',
    },
    reviewImageEmoji: {
        fontSize: 40,
    },
    footer: {
        padding: Spacing.lg,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: Colors.borderLight,
    },
    writeReviewButton: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.lg,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    writeReviewText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});
