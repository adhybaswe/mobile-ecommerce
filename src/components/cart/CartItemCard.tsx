import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CartItem } from '../../types';
import { formatCurrency } from '../../utils/format';
import { useCartStore } from '../../features/cart/cartStore';

interface CartItemCardProps {
    item: CartItem;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
    const { updateQuantity, removeItem } = useCartStore();

    return (
        <View style={styles.card}>
            <Image
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode="contain"
            />

            <View style={styles.details}>
                <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                </Text>

                <Text style={styles.price}>
                    {formatCurrency(item.price)}
                </Text>

                <View style={styles.actions}>
                    <View style={styles.quantityControl}>
                        <TouchableOpacity
                            onPress={() => updateQuantity(item.id, item.quantity - 1)}
                            style={styles.quantityButton}
                        >
                            <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>

                        <Text style={styles.quantityText}>
                            {item.quantity}
                        </Text>

                        <TouchableOpacity
                            onPress={() => updateQuantity(item.id, item.quantity + 1)}
                            style={styles.quantityButton}
                        >
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={() => removeItem(item.id)}
                        style={styles.removeButton}
                    >
                        <Text style={styles.removeText}>Remove</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#f3f4f6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    details: {
        flex: 1,
        marginLeft: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6366f1',
        marginBottom: 8,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        borderRadius: 8,
    },
    quantityButton: {
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    quantityButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#374151',
    },
    quantityText: {
        paddingHorizontal: 16,
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    removeButton: {
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    removeText: {
        color: '#dc2626',
        fontWeight: '600',
    },
});
