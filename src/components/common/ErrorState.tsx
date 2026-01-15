import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from './Button';

interface ErrorStateProps {
    message?: string;
    onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
    message = 'Something went wrong',
    onRetry
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.emoji}>😕</Text>
            <Text style={styles.title}>Oops!</Text>
            <Text style={styles.message}>{message}</Text>
            {onRetry && (
                <Button title="Try Again" onPress={onRetry} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    emoji: {
        fontSize: 60,
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 8,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        color: '#6b7280',
        marginBottom: 24,
        textAlign: 'center',
    },
});
