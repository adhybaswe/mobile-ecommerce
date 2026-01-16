import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Category {
    id: string;
    name: string;
    icon: keyof typeof Ionicons.glyphMap;
}

const DUMMY_CATEGORIES: Category[] = [
    { id: '1', name: 'Women', icon: 'woman-outline' },
    { id: '2', name: 'Men', icon: 'man-outline' },
    { id: '3', name: 'Kids', icon: 'happy-outline' },
    { id: '4', name: 'Accessories', icon: 'watch-outline' },
    { id: '5', name: 'Shoes', icon: 'footsteps-outline' },
];

interface CategorySectionProps {
    onCategoryPress?: (category: Category) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onCategoryPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Category</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContainer}
            >
                {DUMMY_CATEGORIES.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={styles.categoryItem}
                        onPress={() => onCategoryPress?.(category)}
                    >
                        <View style={styles.categoryIcon}>
                            <Ionicons name={category.icon} size={28} color="#374151" />
                        </View>
                        <Text style={styles.categoryName}>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    seeAll: {
        fontSize: 14,
        color: '#6b7280',
    },
    categoriesContainer: {
        paddingHorizontal: 16,
        gap: 16,
    },
    categoryItem: {
        alignItems: 'center',
        width: 70,
    },
    categoryIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#e5e7eb',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    categoryName: {
        fontSize: 13,
        color: '#1f2937',
        textAlign: 'center',
    },
});
