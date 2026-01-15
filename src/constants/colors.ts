/**
 * App-wide color palette and theme system
 * Update colors here to change the entire app's color scheme
 */

export const Colors = {
    // ========================================
    // PRIMARY COLORS (Main brand colors)
    // ========================================
    primary: '#144366',           // Main brand color (dark navy blue)
    primaryLight: '#1e5a8e',      // Lighter variant (navy blue)
    primaryDark: '#0f3451',       // Darker variant (deep navy)

    // ========================================
    // ACCENT COLORS
    // ========================================
    accent: '#144366',            // Accent color (dark navy blue)
    accentLight: '#374151',       // Lighter accent

    // ========================================
    // TEXT COLORS
    // ========================================
    textPrimary: '#111827',       // Primary text (dark)
    textSecondary: '#6b7280',     // Secondary text (gray)
    textTertiary: '#9ca3af',      // Tertiary text (light gray)
    textWhite: '#ffffff',         // White text
    textMuted: '#374151',         // Muted text

    // ========================================
    // BACKGROUND COLORS
    // ========================================
    background: '#ffffff',        // Main background (white)
    backgroundGray: '#f3f4f6',    // Gray background
    backgroundLight: '#f9fafb',   // Light gray background
    backgroundDark: '#1f2937',    // Dark background
    backgroundSlate: '#475569',   // Slate background

    // ========================================
    // UI ELEMENT COLORS
    // ========================================
    border: '#e5e7eb',            // Border color
    borderLight: '#f3f4f6',       // Light border
    divider: '#e5e7eb',           // Divider color
    shadow: '#000000',            // Shadow color
    overlay: 'rgba(0, 0, 0, 0.5)', // Overlay/backdrop

    // ========================================
    // STATUS COLORS
    // ========================================
    success: '#10b981',           // Success/green
    successLight: '#dcfce7',      // Light success background
    error: '#ef4444',             // Error/red
    errorDark: '#dc2626',         // Dark error
    warning: '#f59e0b',           // Warning/orange
    info: '#3b82f6',              // Info/blue
    infoLight: '#6366f1',         // Light info/indigo

    // ========================================
    // SPECIAL/SEMANTIC COLORS
    // ========================================
    price: '#1f2937',             // Price text
    rating: '#fbbf24',            // Star rating (gold)
    badge: '#ec4899',             // Badge/notification (pink)
    wishlist: '#ef4444',          // Wishlist heart (red)

    // ========================================
    // NAVIGATION COLORS
    // ========================================
    navBar: '#144366',            // Bottom nav background (uses primary)
    navBarActive: '#1e5a8e',      // Active nav item background (uses primaryLight)
    navBarInactive: '#fff',       // Inactive nav icon
    navBarText: '#ffffff',        // Nav text/icon (active)

    // ========================================
    // BUTTON COLORS (for reference)
    // ========================================
    buttonPrimary: '#1f2937',     // Primary button (uses primary)
    buttonSecondary: '#374151',   // Secondary button (uses primaryLight)
    buttonText: '#ffffff',        // Button text
    buttonOutline: '#1f2937',     // Outline button border

    // ========================================
    // INPUT COLORS
    // ========================================
    inputBackground: '#f3f4f6',   // Input field background
    inputBorder: '#e5e7eb',       // Input field border
    inputText: '#111827',         // Input text
    inputPlaceholder: '#9ca3af',  // Placeholder text

    // ========================================
    // CARD COLORS
    // ========================================
    cardBackground: '#ffffff',    // Card background
    cardBorder: '#f3f4f6',        // Card border
    cardShadow: '#000000',        // Card shadow
};

/**
 * Theme spacing constants
 */
export const Spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 40,
};

/**
 * Theme font sizes
 */
export const FontSizes = {
    xs: 12,
    sm: 13,
    md: 14,
    base: 15,
    lg: 16,
    xl: 18,
    xxl: 20,
    xxxl: 24,
    huge: 28,
};

/**
 * Theme border radius
 */
export const BorderRadius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 32,
    full: 100,
    circle: 9999,
};

/**
 * Shadow presets
 */
export const Shadows = {
    small: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    medium: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    large: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
};

