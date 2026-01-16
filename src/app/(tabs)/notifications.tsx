import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { PageHeader } from '../../components/common/PageHeader';
import { Colors, FontSizes, Spacing, BorderRadius } from '../../constants/colors';

interface Notification {
    id: string;
    type: 'order' | 'sale' | 'review' | 'payment';
    title: string;
    description: string;
    time: string;
    isRead: boolean;
}

const notificationsData: { today: Notification[]; yesterday: Notification[] } = {
    today: [
        {
            id: '1',
            type: 'order',
            title: 'Order Shipped',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            time: '1h',
            isRead: false,
        },
        {
            id: '2',
            type: 'sale',
            title: 'Flash Sale Alert',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            time: '1h',
            isRead: false,
        },
        {
            id: '3',
            type: 'review',
            title: 'Product Review Request',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis',
            time: '1h',
            isRead: true,
        },
    ],
    yesterday: [
        {
            id: '4',
            type: 'order',
            title: 'Order Shipped',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            time: '1d',
            isRead: true,
        },
        {
            id: '5',
            type: 'payment',
            title: 'New Paypal Added',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            time: '1d',
            isRead: true,
        },
        {
            id: '6',
            type: 'sale',
            title: 'Flash Sale Alert',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            time: '1d',
            isRead: true,
        },
    ],
};

const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
        case 'order':
            return 'cube-outline';
        case 'sale':
            return 'pricetag-outline';
        case 'review':
            return 'star-outline';
        case 'payment':
            return 'wallet-outline';
        default:
            return 'notifications-outline';
    }
};

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
    return (
        <TouchableOpacity style={styles.notificationItem} activeOpacity={0.7}>
            {/* Icon */}
            <View style={styles.iconContainer}>
                <Ionicons
                    name={getNotificationIcon(notification.type)}
                    size={24}
                    color={Colors.textSecondary}
                />
            </View>

            {/* Content */}
            <View style={styles.notificationContent}>
                <View style={styles.notificationHeader}>
                    <Text style={styles.notificationTitle} numberOfLines={1}>
                        {notification.title}
                    </Text>
                    <Text style={styles.notificationTime}>{notification.time}</Text>
                </View>
                <Text style={styles.notificationDescription} numberOfLines={3}>
                    {notification.description}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default function NotificationsScreen() {
    const unreadCount = notificationsData.today.filter((n) => !n.isRead).length;

    const renderHeaderRight = () => (
        <View style={styles.badge}>
            <Text style={styles.badgeText}>{unreadCount} NEW</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <PageHeader
                title="Notification"
                showBackButton={true}
                rightElement={renderHeaderRight()}
            />

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Today Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>TODAY</Text>
                        <TouchableOpacity activeOpacity={0.7}>
                            <Text style={styles.markAsRead}>Mark all as read</Text>
                        </TouchableOpacity>
                    </View>

                    {notificationsData.today.map((notification) => (
                        <NotificationItem key={notification.id} notification={notification} />
                    ))}
                </View>

                {/* Yesterday Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>YESTERDAY</Text>
                        <TouchableOpacity activeOpacity={0.7}>
                            <Text style={styles.markAsRead}>Mark all as read</Text>
                        </TouchableOpacity>
                    </View>

                    {notificationsData.yesterday.map((notification) => (
                        <NotificationItem key={notification.id} notification={notification} />
                    ))}
                </View>

                {/* Bottom spacing */}
                <View style={{ height: Spacing.xl }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollView: {
        flex: 1,
    },
    badge: {
        backgroundColor: Colors.primary,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.full,
    },
    badgeText: {
        color: Colors.textWhite,
        fontSize: FontSizes.xs,
        fontWeight: 'bold',
    },
    section: {
        marginTop: Spacing.lg,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
        marginBottom: Spacing.md,
    },
    sectionTitle: {
        fontSize: FontSizes.xs,
        fontWeight: '600',
        color: Colors.textTertiary,
        letterSpacing: 0.5,
    },
    markAsRead: {
        fontSize: FontSizes.xs,
        color: Colors.textSecondary,
        fontWeight: '500',
    },
    notificationItem: {
        flexDirection: 'row',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        backgroundColor: Colors.background,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: BorderRadius.md,
        backgroundColor: Colors.backgroundGray,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    notificationContent: {
        flex: 1,
    },
    notificationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.xs,
    },
    notificationTitle: {
        flex: 1,
        fontSize: FontSizes.lg,
        fontWeight: '600',
        color: Colors.textPrimary,
        marginRight: Spacing.sm,
    },
    notificationTime: {
        fontSize: FontSizes.sm,
        color: Colors.textTertiary,
    },
    notificationDescription: {
        fontSize: FontSizes.sm,
        color: Colors.textSecondary,
        lineHeight: 20,
    },
});
