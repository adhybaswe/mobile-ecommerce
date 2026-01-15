import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomBottomNav } from '../components/navigation/CustomBottomNav';

export default function MessagesScreen() {
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.content}>
                <Text style={styles.title}>Messages</Text>
                <Text style={styles.subtitle}>Your messages will appear here</Text>
            </View>
            <CustomBottomNav />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
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
});
