import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../../constants/colors';

interface Message {
    id: string;
    text?: string;
    imageUrl?: string;
    voiceDuration?: string;
    timestamp: string;
    senderId: string;
    senderName: string;
    senderAvatar: string;
}

const MOCK_MESSAGES: Message[] = [
    {
        id: '1',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        timestamp: '08:04 PM',
        senderId: '1',
        senderName: 'Sheila Lemke',
        senderAvatar: '👩🏼',
    },
    {
        id: '2',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        timestamp: '08:04 PM',
        senderId: '2',
        senderName: 'Esther Howard',
        senderAvatar: '👩🏽',
    },
    {
        id: '3',
        imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        timestamp: '08:04 PM',
        senderId: '1',
        senderName: 'Sheila Lemke',
        senderAvatar: '👩🏼',
    },
    {
        id: '4',
        voiceDuration: '0:13',
        timestamp: '08:04 PM',
        senderId: '2',
        senderName: 'Esther Howard',
        senderAvatar: '👩🏽',
    },
];

export default function ChatDetailScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [messageText, setMessageText] = useState('');
    const [messages, setMessages] = useState(MOCK_MESSAGES);

    // Mock user data - in real app, fetch based on params.id
    const chatUser = {
        name: 'Sheila Lemke',
        avatar: '👩🏼',
        status: 'Online',
    };

    const currentUserId = '2'; // Current logged-in user

    const renderMessage = ({ item }: { item: Message }) => {
        const isCurrentUser = item.senderId === currentUserId;

        return (
            <View style={[
                styles.messageContainer,
                isCurrentUser && styles.messageContainerRight
            ]}>
                {/* Avatar for other user */}
                {!isCurrentUser && (
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarEmoji}>{item.senderAvatar}</Text>
                    </View>
                )}

                <View style={[
                    styles.messageContent,
                    isCurrentUser && styles.messageContentRight
                ]}>
                    {/* Text Message */}
                    {item.text && (
                        <View style={[
                            styles.messageBubble,
                            isCurrentUser ? styles.messageBubbleRight : styles.messageBubbleLeft
                        ]}>
                            <Text style={[
                                styles.messageText,
                                isCurrentUser && styles.messageTextRight
                            ]}>
                                {item.text}
                            </Text>
                        </View>
                    )}

                    {/* Image Message */}
                    {item.imageUrl && (
                        <Image
                            source={{ uri: item.imageUrl }}
                            style={styles.messageImage}
                            resizeMode="cover"
                        />
                    )}

                    {/* Voice Message */}
                    {item.voiceDuration && (
                        <View style={[
                            styles.voiceMessage,
                            isCurrentUser && styles.voiceMessageRight
                        ]}>
                            <TouchableOpacity style={styles.playButton}>
                                <Ionicons name="play" size={20} color={Colors.textWhite} />
                            </TouchableOpacity>
                            <View style={styles.waveform}>
                                {[...Array(20)].map((_, i) => (
                                    <View
                                        key={i}
                                        style={[
                                            styles.waveformBar,
                                            { height: Math.random() * 20 + 10 }
                                        ]}
                                    />
                                ))}
                            </View>
                            <Text style={styles.voiceDuration}>{item.voiceDuration}</Text>
                        </View>
                    )}

                    {/* Timestamp and sender info */}
                    <View style={[
                        styles.messageFooter,
                        isCurrentUser && styles.messageFooterRight
                    ]}>
                        <Text style={styles.timestamp}>{item.timestamp}</Text>
                        {!isCurrentUser && (
                            <Text style={styles.senderName}>{item.senderName}</Text>
                        )}
                    </View>
                </View>

                {/* Avatar for current user */}
                {isCurrentUser && (
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarEmoji}>{item.senderAvatar}</Text>
                    </View>
                )}
            </View>
        );
    };

    const handleSend = () => {
        if (messageText.trim()) {
            const newMessage: Message = {
                id: Date.now().toString(),
                text: messageText,
                timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                senderId: currentUserId,
                senderName: 'Esther Howard',
                senderAvatar: '👩🏽',
            };
            setMessages([...messages, newMessage]);
            setMessageText('');
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color={Colors.primary} />
                </TouchableOpacity>

                <View style={styles.userInfo}>
                    <View style={styles.headerAvatar}>
                        <Text style={styles.headerAvatarEmoji}>{chatUser.avatar}</Text>
                    </View>
                    <View>
                        <Text style={styles.userName}>{chatUser.name}</Text>
                        <Text style={styles.userStatus}>{chatUser.status}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.menuButton}>
                    <Ionicons name="ellipsis-vertical" size={24} color={Colors.textWhite} />
                </TouchableOpacity>
            </View>

            {/* Chat Content with Keyboard Avoiding */}
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                {/* Messages List */}
                <FlatList
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.messagesList}
                    style={styles.messagesContainer}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View style={styles.dateHeader}>
                            <Text style={styles.dateText}>TODAY</Text>
                        </View>
                    }
                />

                {/* Input Area - Fixed at Bottom */}
                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.attachButton}>
                        <Ionicons name="add" size={24} color={Colors.textSecondary} />
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        placeholder="Type a message here..."
                        placeholderTextColor={Colors.inputPlaceholder}
                        value={messageText}
                        onChangeText={setMessageText}
                        multiline
                        maxLength={500}
                    />

                    <TouchableOpacity
                        style={styles.voiceButton}
                        onPress={handleSend}
                    >
                        <Ionicons
                            name={messageText.trim() ? "send" : "mic"}
                            size={20}
                            color={Colors.textWhite}
                        />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        backgroundColor: Colors.primary,
        gap: Spacing.md,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.textWhite,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    headerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.backgroundGray,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerAvatarEmoji: {
        fontSize: 20,
    },
    userName: {
        fontSize: FontSizes.lg,
        fontWeight: '600',
        color: Colors.textWhite,
    },
    userStatus: {
        fontSize: FontSizes.sm,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    menuButton: {
        padding: Spacing.xs,
    },
    flex: {
        flex: 1,
    },
    messagesContainer: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
    },
    chatContainer: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
    },
    messagesList: {
        padding: Spacing.lg,
        paddingBottom: Spacing.xl,
    },
    dateHeader: {
        alignItems: 'center',
        marginVertical: Spacing.lg,
    },
    dateText: {
        fontSize: FontSizes.xs,
        fontWeight: '600',
        color: Colors.textSecondary,
        letterSpacing: 1,
    },
    messageContainer: {
        flexDirection: 'row',
        marginBottom: Spacing.lg,
        gap: Spacing.sm,
    },
    messageContainerRight: {
        flexDirection: 'row-reverse',
    },
    avatarContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.backgroundGray,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarEmoji: {
        fontSize: 18,
    },
    messageContent: {
        flex: 1,
        maxWidth: '75%',
    },
    messageContentRight: {
        alignItems: 'flex-end',
    },
    messageBubble: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.xs,
    },
    messageBubbleLeft: {
        backgroundColor: Colors.background,
        alignSelf: 'flex-start',
        ...Shadows.small,
    },
    messageBubbleRight: {
        backgroundColor: Colors.primary,
        alignSelf: 'flex-end',
    },
    messageText: {
        fontSize: FontSizes.md,
        color: Colors.textPrimary,
        lineHeight: 20,
    },
    messageTextRight: {
        color: Colors.textWhite,
    },
    messageImage: {
        width: 200,
        height: 150,
        borderRadius: BorderRadius.md,
        marginBottom: Spacing.xs,
    },
    voiceMessage: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.lg,
        gap: Spacing.sm,
        marginBottom: Spacing.xs,
    },
    voiceMessageRight: {
        alignSelf: 'flex-end',
    },
    playButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.textWhite,
        alignItems: 'center',
        justifyContent: 'center',
    },
    waveform: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        height: 30,
    },
    waveformBar: {
        width: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 1,
    },
    voiceDuration: {
        fontSize: FontSizes.sm,
        color: Colors.textWhite,
        marginLeft: Spacing.xs,
    },
    messageFooter: {
        flexDirection: 'row',
        gap: Spacing.sm,
        marginTop: Spacing.xs,
    },
    messageFooterRight: {
        flexDirection: 'row-reverse',
    },
    timestamp: {
        fontSize: FontSizes.xs,
        color: Colors.textSecondary,
    },
    senderName: {
        fontSize: FontSizes.xs,
        color: Colors.textSecondary,
        fontWeight: '500',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        backgroundColor: Colors.background,
        borderTopWidth: 1,
        borderTopColor: Colors.borderLight,
        gap: Spacing.sm,
    },
    attachButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.backgroundGray,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: Colors.backgroundGray,
        borderRadius: BorderRadius.lg,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm,
        fontSize: FontSizes.md,
        color: Colors.textPrimary,
        maxHeight: 100,
    },
    voiceButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
