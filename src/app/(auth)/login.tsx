import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/common/Button';
import { useLogin } from '../../hooks/useApi';
import { useAuthStore } from '../../features/auth/authStore';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../../constants/colors';

export default function LoginScreen() {
    const [username, setUsername] = useState('mor_2314');
    const [password, setPassword] = useState('83r5^_');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const loginMutation = useLogin();
    const { login } = useAuthStore();

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please enter email and password');
            return;
        }

        try {
            const response = await loginMutation.mutateAsync({ username, password });
            await login(response.token);
            router.replace('/(tabs)');
        } catch (error) {
            Alert.alert('Login Failed', 'Invalid credentials. Try: mor_2314 / 83r5^_');
        }
    };

    const handleSocialLogin = (provider: string) => {
        Alert.alert('Coming Soon', `${provider} login will be available soon!`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.content}>
                        {/* Header */}
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => router.replace('/(tabs)')} style={styles.backButton}>
                                <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
                            </TouchableOpacity>
                            <Text style={styles.title}>Sign In</Text>
                            <Text style={styles.subtitle}>Hi! Welcome back, you've been missed</Text>
                        </View>

                        {/* Email Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="example@gmail.com"
                                placeholderTextColor="#9ca3af"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                            />
                        </View>

                        {/* Password Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Password</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="••••••••••••••••"
                                    placeholderTextColor="#9ca3af"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity
                                    onPress={() => setShowPassword(!showPassword)}
                                    style={styles.eyeIcon}
                                >
                                    <Ionicons
                                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                                        size={22}
                                        color="#6b7280"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Forgot Password */}
                        <TouchableOpacity
                            style={styles.forgotPassword}
                            onPress={() => Alert.alert('Forgot Password', 'Password reset feature coming soon!')}
                        >
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        {/* Sign In Button */}
                        <Button
                            title="Sign In"
                            onPress={handleLogin}
                            loading={loginMutation.isPending}
                            style={styles.signInButton}
                        />

                        {/* Divider */}
                        <View style={styles.dividerContainer}>
                            <View style={styles.divider} />
                            <Text style={styles.dividerText}>Or sign in with</Text>
                            <View style={styles.divider} />
                        </View>

                        {/* Social Login Buttons */}
                        <View style={styles.socialContainer}>
                            <TouchableOpacity
                                style={styles.socialButton}
                                onPress={() => handleSocialLogin('Apple')}
                            >
                                <Ionicons name="logo-apple" size={24} color="#000000" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.socialButton}
                                onPress={() => handleSocialLogin('Google')}
                            >
                                <Ionicons name="logo-google" size={24} color="#000000" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.socialButton}
                                onPress={() => handleSocialLogin('Facebook')}
                            >
                                <Ionicons name="logo-facebook" size={24} color="#000000" />
                            </TouchableOpacity>
                        </View>

                        {/* Sign Up Link */}
                        <View style={styles.signUpContainer}>
                            <Text style={styles.signUpText}>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                                <Text style={styles.signUpLink}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.xxxl,
        paddingBottom: Spacing.xl,
        justifyContent: 'center',
    },
    header: {
        marginBottom: Spacing.xxl,
        alignItems: 'center',
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 1,
    },

    title: {
        fontSize: FontSizes.huge,
        fontWeight: '700',
        color: Colors.textPrimary,
        marginBottom: Spacing.sm,
    },
    subtitle: {
        fontSize: FontSizes.base,
        color: Colors.textTertiary,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: Spacing.xl - 4,
    },
    label: {
        fontSize: FontSizes.base,
        fontWeight: '500',
        color: Colors.textPrimary,
        marginBottom: Spacing.sm,
    },
    input: {
        backgroundColor: Colors.inputBackground,
        borderWidth: 0,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.lg,
        paddingVertical: 14,
        fontSize: FontSizes.base,
        color: Colors.inputText,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.inputBackground,
        borderRadius: BorderRadius.md,
        paddingRight: Spacing.md,
    },
    passwordInput: {
        flex: 1,
        paddingHorizontal: Spacing.lg,
        paddingVertical: 14,
        fontSize: FontSizes.base,
        color: Colors.inputText,
    },
    eyeIcon: {
        padding: 4,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: Spacing.xl,
    },
    forgotPasswordText: {
        fontSize: FontSizes.md,
        color: Colors.textSecondary,
        textDecorationLine: 'underline',
    },
    signInButton: {
        marginBottom: Spacing.xl,
        borderRadius: BorderRadius.full,
        paddingVertical: Spacing.lg,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.divider,
    },
    dividerText: {
        marginHorizontal: Spacing.lg,
        fontSize: FontSizes.md,
        color: Colors.textTertiary,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: Spacing.lg,
        marginBottom: Spacing.xxl,
    },
    socialButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: Colors.background,
        borderWidth: 1,
        borderColor: Colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.small,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: Spacing.xl,
    },
    signUpText: {
        fontSize: FontSizes.md,
        color: Colors.textSecondary,
    },
    signUpLink: {
        fontSize: FontSizes.md,
        color: Colors.textPrimary,
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
    demoBox: {
        backgroundColor: '#eff6ff',
        borderWidth: 1,
        borderColor: '#bfdbfe',
        borderRadius: BorderRadius.md,
        padding: Spacing.lg,
        marginTop: Spacing.sm,
    },
    demoTitle: {
        fontSize: FontSizes.sm,
        color: '#1e40af',
        fontWeight: '600',
        marginBottom: 4,
    },
    demoText: {
        fontSize: FontSizes.sm,
        color: '#1d4ed8',
        lineHeight: 20,
    },
});
