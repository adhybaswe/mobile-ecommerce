import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, FontSizes, Spacing } from '../../constants/colors';

interface PageHeaderProps {
    title: string;
    showBackButton?: boolean;
    onBackPress?: () => void;
    rightElement?: ReactNode;
    variant?: 'default' | 'primary'; // default = white bg, primary = colored bg
    subtitle?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    showBackButton = false,
    onBackPress,
    rightElement,
    variant = 'default',
    subtitle,
}) => {
    const router = useRouter();

    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            router.back();
        }
    };

    const isPrimary = variant === 'primary';
    const textColor = isPrimary ? Colors.textWhite : Colors.textPrimary;
    const subtitleColor = isPrimary ? 'rgba(255, 255, 255, 0.8)' : Colors.textSecondary;

    return (
        <View style={[
            styles.container,
            isPrimary && styles.containerPrimary
        ]}>
            {/* Left Section - Back Button */}
            {showBackButton && (
                <TouchableOpacity
                    onPress={handleBackPress}
                    style={[
                        styles.backButton,
                        isPrimary && styles.backButtonPrimary
                    ]}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={isPrimary ? Colors.primary : Colors.textPrimary}
                    />
                </TouchableOpacity>
            )}

            {/* Title & Subtitle Section */}
            <View style={styles.titleSection}>
                <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
                    {title}
                </Text>
                {subtitle && (
                    <Text style={[styles.subtitle, { color: subtitleColor }]} numberOfLines={1}>
                        {subtitle}
                    </Text>
                )}
            </View>

            {/* Right Section - Custom Element */}
            {rightElement && (
                <View style={styles.rightSection}>
                    {rightElement}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.lg,
        paddingBottom: Spacing.md,
        backgroundColor: Colors.background,
    },
    containerPrimary: {
        backgroundColor: Colors.primary,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.backgroundGray,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    backButtonPrimary: {
        backgroundColor: Colors.textWhite,
    },
    titleSection: {
        flex: 1,
    },
    title: {
        fontSize: FontSizes.xxxl,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: FontSizes.sm,
        marginTop: Spacing.xs,
    },
    rightSection: {
        marginLeft: Spacing.md,
    },
});
