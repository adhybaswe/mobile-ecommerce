# Theme System Guide

## Overview
This app uses a centralized theme system located in `/src/constants/colors.ts`. All colors, spacing, font sizes, and other design tokens are defined in one place.

## How to Change the Primary Color

To change the primary color throughout the entire app, simply update the `primary` color in `/src/constants/colors.ts`:

```typescript
export const Colors = {
    primary: '#1f2937',  // Change this value
    // ...
}
```

All components that use `Colors.primary` will automatically update.

## Available Theme Tokens

### Colors
```typescript
import { Colors } from '@/constants/colors';

// Primary colors
Colors.primary           // Main brand color
Colors.primaryLight      // Lighter variant
Colors.primaryDark       // Darker variant

// Text colors
Colors.textPrimary       // Primary text
Colors.textSecondary     // Secondary text
Colors.textTertiary      // Tertiary text
Colors.textWhite         // White text

// Background colors
Colors.background        // Main background
Colors.backgroundGray    // Gray background
Colors.backgroundLight   // Light gray background
Colors.backgroundDark    // Dark background
Colors.backgroundSlate   // Slate background

// Status colors
Colors.success           // Success/green
Colors.error             // Error/red
Colors.warning           // Warning/orange
Colors.info              // Info/blue

// Special colors
Colors.rating            // Star rating (gold)
Colors.badge             // Badge/notification (pink)
Colors.wishlist          // Wishlist heart (red)

// Navigation
Colors.navBar            // Bottom nav background
Colors.navBarActive      // Active nav item
Colors.navBarInactive    // Inactive nav icon

// Input colors
Colors.inputBackground   // Input field background
Colors.inputBorder       // Input field border
Colors.inputText         // Input text
Colors.inputPlaceholder  // Placeholder text

// And many more...
```

### Spacing
```typescript
import { Spacing } from '@/constants/colors';

Spacing.xs    // 4
Spacing.sm    // 8
Spacing.md    // 12
Spacing.lg    // 16
Spacing.xl    // 24
Spacing.xxl   // 32
Spacing.xxxl  // 40
```

### Font Sizes
```typescript
import { FontSizes } from '@/constants/colors';

FontSizes.xs    // 12
FontSizes.sm    // 13
FontSizes.md    // 14
FontSizes.base  // 15
FontSizes.lg    // 16
FontSizes.xl    // 18
FontSizes.xxl   // 20
FontSizes.xxxl  // 24
FontSizes.huge  // 28
```

### Border Radius
```typescript
import { BorderRadius } from '@/constants/colors';

BorderRadius.sm      // 8
BorderRadius.md      // 12
BorderRadius.lg      // 16
BorderRadius.xl      // 20
BorderRadius.xxl     // 32
BorderRadius.full    // 100 (for pill-shaped buttons)
BorderRadius.circle  // 9999 (for perfect circles)
```

### Shadows
```typescript
import { Shadows } from '@/constants/colors';

// Use shadow presets in your styles
const styles = StyleSheet.create({
    card: {
        ...Shadows.medium,  // Applies shadow properties
    },
});
```

## Usage Examples

### Example 1: Using Colors in Styles
```typescript
import { StyleSheet } from 'react-native';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/colors';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        padding: Spacing.lg,
    },
    title: {
        fontSize: FontSizes.xxxl,
        color: Colors.textPrimary,
        marginBottom: Spacing.md,
    },
    button: {
        backgroundColor: Colors.primary,
        borderRadius: BorderRadius.full,
        padding: Spacing.lg,
    },
    buttonText: {
        color: Colors.textWhite,
        fontSize: FontSizes.lg,
    },
});
```

### Example 2: Using Colors in JSX
```typescript
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

<Ionicons 
    name="heart" 
    size={24} 
    color={Colors.wishlist} 
/>
```

### Example 3: Conditional Colors
```typescript
import { Colors } from '@/constants/colors';

<Ionicons 
    name="heart" 
    size={24} 
    color={isActive ? Colors.error : Colors.textSecondary} 
/>
```

## Migration from Hardcoded Colors

### Before (Hardcoded):
```typescript
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderColor: '#e5e7eb',
    },
    text: {
        color: '#111827',
    },
});
```

### After (Using Theme):
```typescript
import { Colors } from '@/constants/colors';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        borderColor: Colors.border,
    },
    text: {
        color: Colors.textPrimary,
    },
});
```

## Best Practices

1. **Always use theme tokens** instead of hardcoded colors
2. **Use semantic color names** (e.g., `Colors.textPrimary` instead of `Colors.primary` for text)
3. **Update the theme file** when you need to change colors globally
4. **Add new colors to the theme** if you need a new color that will be reused
5. **Use the shadow presets** for consistent shadows across the app

## Common Color Mappings

| Old Hardcoded | New Theme Token |
|---------------|-----------------|
| `#ffffff` | `Colors.background` or `Colors.textWhite` |
| `#111827` | `Colors.textPrimary` or `Colors.primaryDark` |
| `#1f2937` | `Colors.primary` |
| `#374151` | `Colors.primaryLight` |
| `#6b7280` | `Colors.textSecondary` |
| `#9ca3af` | `Colors.textTertiary` |
| `#f3f4f6` | `Colors.backgroundGray` |
| `#f9fafb` | `Colors.backgroundLight` |
| `#e5e7eb` | `Colors.border` |
| `#ef4444` | `Colors.error` or `Colors.wishlist` |
| `#10b981` | `Colors.success` |

## Changing Theme Colors

To change your app's color scheme:

1. Open `/src/constants/colors.ts`
2. Update the color values in the `Colors` object
3. Save the file
4. The app will hot-reload with the new colors

Example - Changing to a blue theme:
```typescript
export const Colors = {
    primary: '#2563eb',           // Blue
    primaryLight: '#3b82f6',      // Light blue
    primaryDark: '#1e40af',       // Dark blue
    // ... rest stays the same
};
```
