# 🚀 Quick Start Guide

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js v20+ installed
- ✅ npm or yarn installed
- ✅ Expo Go app on your phone (optional, for testing on device)

## 1. Install Dependencies (Already Done!)

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

## 2. Start the Development Server

```bash
npm start
```

This will:
- Start the Metro bundler
- Generate a QR code
- Open the Expo Dev Tools in your browser

## 3. Run the App

### Option A: On Your Phone (Recommended)

**Android:**
1. Install "Expo Go" from Google Play Store
2. Open Expo Go
3. Scan the QR code from your terminal

**iOS:**
1. Install "Expo Go" from App Store
2. Open Camera app
3. Scan the QR code
4. Tap the notification to open in Expo Go

### Option B: On Emulator/Simulator

**Android Emulator:**
```bash
npm run android
```

**iOS Simulator (Mac only):**
```bash
npm run ios
```

**Web Browser:**
```bash
npm run web
```

## 4. Test the App

### Login
1. You'll see the login screen
2. Use these credentials:
   - **Username:** `mor_2314`
   - **Password:** `83r5^_`
3. Tap "Sign In"

### Browse Products
1. After login, you'll see the product list
2. Pull down to refresh
3. Tap any product to view details

### Add to Cart
1. On product detail page, tap "Add to Cart"
2. Choose "View Cart" or "Continue Shopping"
3. Cart badge shows item count

### Checkout
1. Go to Cart tab
2. Adjust quantities with +/- buttons
3. Tap "Proceed to Checkout"
4. Review order and tap "Complete Order"
5. See success confirmation

### Logout
1. Go to Profile tab
2. Tap "Logout"
3. Confirm logout

## 5. Development Tips

### Clear Cache
If you encounter issues:
```bash
npx expo start -c
```

### View Logs
- Shake your device to open developer menu
- Enable "Debug Remote JS" for Chrome DevTools
- Or use terminal logs

### Hot Reload
- Changes to code automatically reload
- Shake device and tap "Reload" if needed

## 6. Common Issues & Solutions

### Issue: QR Code Won't Scan
**Solution:** Make sure your phone and computer are on the same WiFi network

### Issue: Metro Bundler Error
**Solution:** 
```bash
rm -rf node_modules
npm install
npx expo start -c
```

### Issue: TypeScript Errors
**Solution:** These are mostly cosmetic NativeWind type warnings. The app will still run fine.

### Issue: "Unable to resolve module"
**Solution:**
```bash
npx expo start -c
```

## 7. Project Structure Quick Reference

```
src/
├── app/              # All screens (Expo Router)
├── components/       # Reusable UI components
├── features/         # Business logic (stores)
├── services/         # API calls
├── hooks/            # Custom React hooks
├── utils/            # Helper functions
├── constants/        # App constants
└── types/            # TypeScript types
```

## 8. Key Files to Know

- `src/app/_layout.tsx` - Root layout with providers
- `src/features/auth/authStore.ts` - Authentication state
- `src/features/cart/cartStore.ts` - Shopping cart state
- `src/services/endpoints.ts` - API endpoints
- `src/hooks/useApi.ts` - Data fetching hooks

## 9. Making Changes

### Add a New Screen
1. Create file in `src/app/`
2. Expo Router automatically creates route
3. Add navigation link from existing screen

### Add a New Component
1. Create in appropriate `src/components/` subfolder
2. Export from component file
3. Import where needed

### Modify Styles
- Use Tailwind classes via `className` prop
- Update `src/constants/theme.ts` for design tokens

### Add API Endpoint
1. Add to `src/services/endpoints.ts`
2. Create React Query hook in `src/hooks/useApi.ts`
3. Use hook in component

## 10. Next Steps

- ✅ Test all features
- ✅ Customize colors and branding
- ✅ Add more products/features
- ✅ Deploy with EAS Build
- ✅ Add to your portfolio

## Need Help?

- Check `README.md` for detailed documentation
- Review `docs/ARCHITECTURE.md` for design decisions
- Review `docs/PRD.md` for requirements

---

**Happy Coding! 🎉**
