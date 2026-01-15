# Color Standardization

## Overview
Standardized all colors across the app to use a centralized color palette based on the dark theme from the bottom navigation.

## Primary Color Scheme
The app now uses a **dark gray theme** as the primary color:
- **Primary**: `#1f2937` (dark gray - matches bottom nav)
- **Primary Light**: `#374151` (lighter gray - for active states)
- **Primary Dark**: `#111827` (darkest gray)

This replaces the previous inconsistent use of:
- ❌ `#6366f1` (indigo/purple - old primary)
- ❌ `#ec4899` (pink - old secondary)

## Changes Made

### 1. **Created Colors Constant** (`src/constants/colors.ts`)
Centralized color palette with:
- Primary colors (dark theme)
- Text colors
- Background colors
- UI colors (borders, dividers)
- Status colors (success, error, warning, info)
- Special colors (price, rating, badge)
- Navigation colors

### 2. **Updated Components**

#### **Button Component** (`src/components/common/Button.tsx`)
- ✅ Primary button: Dark gray (`#1f2937`)
- ✅ Secondary button: Lighter gray (`#374151`)
- ✅ Outline button: Dark gray border
- ✅ Loading indicator: Uses theme colors

#### **ProductCard** (`src/components/product/ProductCard.tsx`)
- ✅ Price color: Dark gray (`#1f2937`)
- ✅ Title color: Dark gray
- ✅ Rating text: Gray (`#6b7280`)
- ✅ Star color: Gold (`#fbbf24`)

#### **Cart Page** (`src/app/(tabs)/cart.tsx`)
- ✅ Total amount: Dark gray (`#1f2937`)

#### **Profile Page** (`src/app/(tabs)/profile.tsx`)
- ✅ Avatar background: Dark gray (`#1f2937`)

### 3. **Consistent Color Usage**

| Element | Color | Hex Code |
|---------|-------|----------|
| Primary buttons | Primary | `#1f2937` |
| Secondary buttons | Primary Light | `#374151` |
| Bottom nav bar | Primary | `#1f2937` |
| Bottom nav active | Primary Light | `#374151` |
| Product price | Primary | `#1f2937` |
| Profile avatar | Primary | `#1f2937` |
| Text primary | Primary | `#1f2937` |
| Text secondary | Gray | `#6b7280` |
| Text light | Light Gray | `#9ca3af` |

## Benefits

### ✅ **Visual Consistency**
- All interactive elements use the same dark gray theme
- Buttons, prices, and accents match the bottom navigation
- Professional, cohesive look throughout the app

### ✅ **Easy Maintenance**
- Single source of truth for colors
- Update colors in one place (`colors.ts`)
- No more hunting for hardcoded color values

### ✅ **Better Theming**
- Foundation for future theme support (light/dark mode)
- Easy to create color variants
- Scalable color system

### ✅ **Brand Identity**
- Consistent dark, modern aesthetic
- Matches the reference design
- Professional appearance

## How to Use

Import colors in any component:
```typescript
import { Colors } from '../../constants/colors';

// Use in styles
const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
    },
    text: {
        color: Colors.textPrimary,
    },
});
```

## Future Enhancements
1. Add theme variants (light/dark mode)
2. Add brand color variations
3. Support user-customizable themes
4. Add semantic color names (e.g., `Colors.button.primary`)
