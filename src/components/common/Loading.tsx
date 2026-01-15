import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

interface LoadingProps {
    size?: 'small' | 'large';
    color?: string;
}

export const Loading: React.FC<LoadingProps> = ({
    size = 'large',
    color = '#6366f1'
}) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={size} color={color} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
