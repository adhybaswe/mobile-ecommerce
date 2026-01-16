import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { CustomBottomNav } from '../../components/navigation/CustomBottomNav';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../../constants/colors';

interface ChatMessage {
    id: string;
    name: string;
    message: string;
    time: string;
    avatar: string;
    unread?: boolean;
}

const MOCK_CHATS: ChatMessage[] = [
    {
        id: '1',
        name: 'Jessica Martinez',
        message: 'Perfect, will check it',
        time: '09:34 PM',
        avatar: '👩🏻',
    },
    {
        id: '2',
        name: 'Rachel Kim',
        message: 'Thanks',
        time: '09:34 PM',
        avatar: '👩🏼',
    },
    {
        id: '3',
        name: 'Amanda Foster',
        message: 'Welcome!',
        time: '09:34 PM',
        avatar: '👩🏽',
    },
    {
        id: '4',
        name: 'Sophie Bennett',
        message: 'Good Morning!',
        time: '09:34 PM',
        avatar: '👩🏻‍💼',
    },
    {
        id: '5',
        name: 'Marcus Johnson',
        message: 'Share Image Please!',
        time: '09:34 PM',
        avatar: '👨🏾',
    },
    {
        id: '6',
        name: 'Isabella Cooper',
        message: 'Thanks!',
        time: '09:34 PM',
        avatar: '👩🏼‍🦰',
    },
    {
        id: '7',
        name: 'Ryan Patterson',
        message: 'See you tomorrow',
        time: '08:15 PM',
        avatar: '👨🏻',
    },
];

export default function MessagesScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredChats = MOCK_CHATS.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderChatItem = ({ item }: { item: ChatMessage }) => (
        <TouchableOpacity
            style={styles.chatItem}
            onPress={() => {
                router.push(`/chat/${item.id}`);
            }}
        >
            <View style={styles.avatarContainer}>
                <Text style={styles.avatarEmoji}>{item.avatar}</Text>
            </View>
            <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                    <Text style={styles.chatName}>{item.name}</Text>
                    <Text style={styles.chatTime}>{item.time}</Text>
                </View>
                <Text style={styles.chatMessage} numberOfLines={1}>
                    {item.message}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Page Title */}
            <View style={styles.titleContainer}>
                <Text style={styles.pageTitle}>Messages</Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Ionicons name="search-outline" size={20} color={Colors.textTertiary} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search conversations"
                        placeholderTextColor={Colors.inputPlaceholder}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            {/* Chat List */}
            <View style={styles.chatListContainer}>
                <FlatList
                    data={filteredChats}
                    renderItem={renderChatItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.chatList}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            {/* Bottom Navigation */}
            <CustomBottomNav />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    titleContainer: {
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.md,
        paddingBottom: Spacing.sm,
    },
    pageTitle: {
        fontSize: FontSizes.xxxl,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    searchContainer: {
        paddingHorizontal: Spacing.lg,
        paddingBottom: Spacing.lg,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.backgroundGray,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.md,
        height: 48,
        gap: Spacing.sm,
    },
    searchInput: {
        flex: 1,
        fontSize: FontSizes.md,
        color: Colors.textPrimary,
    },
    chatListContainer: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingBottom: 80, // Space for bottom nav
    },
    chatList: {
        paddingTop: Spacing.md,
    },
    chatItem: {
        flexDirection: 'row',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        backgroundColor: Colors.background,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderLight,
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: BorderRadius.circle,
        backgroundColor: Colors.backgroundGray,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    avatarEmoji: {
        fontSize: 28,
    },
    chatContent: {
        flex: 1,
        justifyContent: 'center',
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.xs,
    },
    chatName: {
        fontSize: FontSizes.lg,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
    chatTime: {
        fontSize: FontSizes.sm,
        color: Colors.textSecondary,
    },
    chatMessage: {
        fontSize: FontSizes.md,
        color: Colors.textSecondary,
    },
});
