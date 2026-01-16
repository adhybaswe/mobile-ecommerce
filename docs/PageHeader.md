# PageHeader Component

A reusable header component for consistent page headers across the application.

## Features

- **Centered title** with optional subtitle
- **Optional back button** with circular background
- **Custom right element** support (icons, buttons, etc.)
- **Two variants**: default (white background) and primary (colored background)
- **Responsive design** with proper spacing and alignment

## Usage

### Basic Header (No Back Button)

```tsx
import { PageHeader } from '../../components/common/PageHeader';

<PageHeader title="Messages" />
```

### Header with Back Button

```tsx
<PageHeader 
    title="Cart" 
    showBackButton 
/>
```

### Header with Custom Back Action

```tsx
<PageHeader 
    title="Cart" 
    showBackButton 
    onBackPress={() => router.push('/(tabs)')} 
/>
```

### Primary Variant (Colored Background)

```tsx
<PageHeader 
    title="Chat" 
    variant="primary" 
/>
```

### Header with Subtitle

```tsx
<PageHeader 
    title="Profile" 
    subtitle="Manage your account"
    showBackButton 
/>
```

### Header with Right Element

```tsx
<PageHeader 
    title="Settings" 
    showBackButton
    rightElement={
        <TouchableOpacity onPress={handleSave}>
            <Ionicons name="checkmark" size={24} color={Colors.primary} />
        </TouchableOpacity>
    }
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | The main title text |
| `showBackButton` | `boolean` | `false` | Whether to show the back button |
| `onBackPress` | `() => void` | `router.back()` | Custom back button handler |
| `rightElement` | `ReactNode` | `undefined` | Custom element to display on the right |
| `variant` | `'default' \| 'primary'` | `'default'` | Header style variant |
| `subtitle` | `string` | `undefined` | Optional subtitle below the title |

## Variants

### Default
- White background
- Dark text
- Light gray back button background
- Subtle border at bottom

### Primary
- Primary color background (navy blue)
- White text
- White back button background with primary icon
- No border

## Design Notes

- The header uses a **3-column layout** (left, center, right) for perfect alignment
- Back button is **40x40px circular** for a modern look
- Title is **centered** and truncates with ellipsis if too long
- Consistent spacing using theme constants
- Integrates seamlessly with SafeAreaView

## Examples in the App

- **Messages Page**: Primary variant, no back button
- **Cart Page**: Default variant with back button
- **Profile Page**: Can use default variant with custom right element
