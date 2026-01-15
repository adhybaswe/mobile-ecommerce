# 🛍️ React Native E-Commerce App

A production-ready e-commerce mobile application built with **React Native**, **Expo**, and **TypeScript** - designed as a professional portfolio project.

## ✨ Features

- 🔐 **Authentication** - Secure login with persistent sessions
- 🏪 **Product Catalog** - Browse products with images, prices, and ratings
- 🛒 **Shopping Cart** - Add, remove, and manage cart items
- 💳 **Checkout Flow** - Simulated checkout process
- 📱 **Responsive UI** - Beautiful, modern design with NativeWind (Tailwind CSS)
- 🔄 **Pull-to-Refresh** - Refresh product listings
- ⚡ **Optimized Performance** - React Query for efficient data fetching
- 💾 **State Management** - Zustand for client state, React Query for server state

## 🛠️ Tech Stack

### Core
- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and tooling
- **TypeScript** - Type-safe development

### State Management & Data Fetching
- **React Query** (@tanstack/react-query) - Server state management
- **Zustand** - Client state management (cart, auth)

### Networking
- **Axios** - HTTP client
- **Fake Store API** - Mock e-commerce API

### UI & Styling
- **NativeWind** - Tailwind CSS for React Native
- **Expo Router** - File-based routing
- **React Native Safe Area Context** - Safe area handling
- **Expo SecureStore** - Secure token storage

## 📁 Project Structure

```
src/
├── app/                    # Expo Router screens
│   ├── (auth)/            # Authentication screens
│   │   └── login.tsx
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Home/Products
│   │   ├── cart.tsx       # Shopping cart
│   │   └── profile.tsx    # User profile
│   ├── product/           # Product detail
│   │   └── [id].tsx
│   ├── checkout.tsx       # Checkout screen
│   ├── checkout-success.tsx
│   ├── _layout.tsx        # Root layout
│   └── index.tsx          # Entry point
│
├── components/            # Reusable components
│   ├── common/           # Common UI components
│   │   ├── Button.tsx
│   │   ├── Loading.tsx
│   │   └── ErrorState.tsx
│   ├── product/          # Product components
│   │   └── ProductCard.tsx
│   └── cart/             # Cart components
│       └── CartItemCard.tsx
│
├── features/             # Feature modules
│   ├── auth/            # Authentication
│   │   └── authStore.ts
│   ├── cart/            # Shopping cart
│   │   └── cartStore.ts
│   └── product/         # Products (future)
│
├── services/            # API services
│   ├── api.ts          # Axios instance
│   └── endpoints.ts    # API endpoints
│
├── hooks/              # Custom hooks
│   └── useApi.ts      # React Query hooks
│
├── utils/             # Utility functions
│   └── format.ts     # Formatting helpers
│
├── constants/        # App constants
│   └── theme.ts     # Design tokens
│
├── types/           # TypeScript types
│   └── index.ts    # Shared types
│
└── assets/         # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v20.19.0 or higher)
- npm or yarn
- Expo Go app (for testing on physical device)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expo-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your device**
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Or press `a` for Android emulator, `i` for iOS simulator

## 📱 Demo Credentials

Use these credentials to test the login functionality:

- **Username:** `mor_2314`
- **Password:** `83r5^_`

## 🎯 Key Features Explained

### State Management Strategy

#### Server State (React Query)
- Product listings
- Product details
- Categories
- Automatic caching and refetching
- Request deduplication

#### Client State (Zustand)
- Shopping cart items
- Authentication session
- User preferences

### API Integration

The app uses the [Fake Store API](https://fakestoreapi.com) for demo purposes:

- `GET /products` - Fetch all products
- `GET /products/:id` - Fetch product details
- `GET /products/categories` - Fetch categories
- `POST /auth/login` - Dummy authentication

### Navigation Flow

```
Index (/)
  ├── Authenticated → (tabs)
  │   ├── Home (Product List)
  │   ├── Cart
  │   └── Profile
  └── Not Authenticated → (auth)/login

Product Detail → /product/[id]
Checkout → /checkout
Success → /checkout-success
```

## 🎨 Design System

The app uses a consistent design system with:

- **Colors:** Indigo primary, Pink secondary
- **Typography:** System fonts with consistent sizing
- **Spacing:** 4px base unit
- **Components:** Reusable, styled with NativeWind

## 📦 Scripts

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web
```

## 🔧 Configuration Files

- **app.json** - Expo configuration
- **babel.config.js** - Babel with NativeWind plugin
- **tailwind.config.js** - Tailwind CSS configuration
- **tsconfig.json** - TypeScript configuration

## 🌟 Best Practices

- ✅ Feature-based folder structure
- ✅ TypeScript for type safety
- ✅ Separation of server and client state
- ✅ Reusable components
- ✅ Consistent error handling
- ✅ Loading and empty states
- ✅ Secure token storage
- ✅ Clean code architecture

## 📝 Future Enhancements

- [ ] Product search and filtering
- [ ] Pagination/infinite scroll
- [ ] Wishlist functionality
- [ ] Dark mode support
- [ ] Order history
- [ ] Product reviews
- [ ] Unit and integration tests
- [ ] CI/CD pipeline

## 🤝 Contributing

This is a portfolio project, but suggestions and feedback are welcome!

## 📄 License

MIT License - feel free to use this project for learning and portfolio purposes.

## 👨‍💻 Author

Built as a professional portfolio project to demonstrate React Native and modern mobile development best practices.

---

**Note:** This app uses a mock API and simulated authentication. No real payments or user data are processed.
