import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'outline';
    loading?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
    title,
    variant = 'primary',
    loading = false,
    size = 'md',
    disabled,
    style,
    ...props
}) => {
    const variantStyles = {
        primary: styles.primaryButton,
        secondary: styles.secondaryButton,
        outline: styles.outlineButton,
    };

    const sizeStyles = {
        sm: styles.smallButton,
        md: styles.mediumButton,
        lg: styles.largeButton,
    };

    const textVariantStyles = {
        primary: styles.primaryText,
        secondary: styles.secondaryText,
        outline: styles.outlineText,
    };

    const textSizeStyles = {
        sm: styles.smallText,
        md: styles.mediumText,
        lg: styles.largeText,
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                variantStyles[variant],
                sizeStyles[size],
                (disabled || loading) && styles.disabled,
                style,
            ]}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'outline' ? Colors.primary : Colors.textWhite} />
            ) : (
                <Text style={[styles.text, textVariantStyles[variant], textSizeStyles[size]]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryButton: {
        backgroundColor: Colors.primary,
    },
    secondaryButton: {
        backgroundColor: Colors.primaryLight,
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    smallButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    mediumButton: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    largeButton: {
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        fontWeight: '600',
    },
    primaryText: {
        color: Colors.textWhite,
    },
    secondaryText: {
        color: Colors.textWhite,
    },
    outlineText: {
        color: Colors.primary,
    },
    smallText: {
        fontSize: 14,
    },
    mediumText: {
        fontSize: 16,
    },
    largeText: {
        fontSize: 18,
    },
});
