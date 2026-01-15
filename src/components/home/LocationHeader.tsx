import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LocationHeaderProps {
    location?: string;
    onLocationPress?: () => void;
    onNotificationPress?: () => void;
}

export const LocationHeader: React.FC<LocationHeaderProps> = ({
    location = "New York, USA",
    onLocationPress,
    onNotificationPress
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.locationContainer}>
                <Text style={styles.locationLabel}>Location</Text>
                <TouchableOpacity
                    style={styles.locationButton}
                    onPress={onLocationPress}
                >
                    <Ionicons name="location" size={16} color="#374151" />
                    <Text style={styles.locationText}>{location}</Text>
                    <Ionicons name="chevron-down" size={16} color="#374151" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.notificationButton}
                onPress={onNotificationPress}
            >
                <Ionicons name="notifications-outline" size={24} color="#1f2937" />
                <View style={styles.notificationBadge} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingTop: 16,
        paddingBottom: 12,
        backgroundColor: '#fff',
    },
    locationContainer: {
        flex: 1,
    },
    locationLabel: {
        fontSize: 12,
        color: '#9ca3af',
        marginBottom: 4,
    },
    locationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    locationText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1f2937',
    },
    notificationButton: {
        position: 'relative',
        padding: 8,
    },
    notificationBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ef4444',
    },
});
