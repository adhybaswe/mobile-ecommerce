# 📄 Product Requirement Document (PRD)

## Project Name
**React Native E-Commerce Mobile App (Portfolio Project)**

## Purpose
The purpose of this project is to build a **production-ready e-commerce mobile application** using **React Native and Expo** as a **professional portfolio project**.

This project is designed to demonstrate:
- Clean and scalable mobile app architecture
- Integration with a real public API (Fake Store API)
- Proper separation between server state and client state
- Modern data fetching and state management patterns
- Polished UI/UX similar to real-world applications

The project focuses on **frontend excellence**, not backend implementation.

---

## Target Audience
- Potential clients and employers
- Startups or small businesses looking for mobile app developers
- Product owners who need prototypes or MVPs
- Technical recruiters and hiring managers

---

## Tech Stack

### Core Technologies
- **React Native**
- **Expo (Managed Workflow)**
- **TypeScript**

### State Management & Data Fetching
- **React Query** — for server state (API data)
- **Zustand** — for client state (cart, authentication session)

### Networking
- **Axios**
- **Fake Store API** (`https://fakestoreapi.com`)

### UI & Utilities
- Custom Theme System (Colors, Spacing, FontSizes, Shadows)
- Standard React Native StyleSheet API
- Expo SecureStore
- Expo Router

---

## API Specification (Fake Store API)

### Base URL
```
https://fakestoreapi.com
```

### Endpoints Used

| Feature | Method | Endpoint |
|-------|--------|----------|
| Product list | GET | /products |
| Product detail | GET | /products/:id |
| Categories | GET | /products/categories |
| Login (dummy) | POST | /auth/login |

---

## Functional Requirements

### 1. Authentication (Dummy)
**Goal:** Simulate a realistic authentication flow

**Features:**
- User can log in using dummy credentials
- Authentication token is stored securely using SecureStore
- User session persists after app restart
- Logout clears session data

> Note: No real backend validation is required

---

### 2. Home / Product Listing

**Features:**
- Fetch product list from API
- Display product image, title, and price
- Pull-to-refresh functionality
- Skeleton loading while fetching data
- Error and empty states

**Acceptance Criteria:**
- Data is fetched using React Query
- UI remains responsive during loading

---

### 3. Product Detail Screen

**Features:**
- Fetch product detail by ID
- Display product images, description, and price
- Add-to-cart action

**Acceptance Criteria:**
- Data is fetched using a dedicated query
- Loading and error states are handled properly

---

### 4. Cart Management

**State Type:** Client state (Zustand)

**Features:**
- Add product to cart
- Remove product from cart
- Update product quantity
- Calculate total price
- Optional cart persistence

**Acceptance Criteria:**
- Cart state does not trigger unnecessary API refetch
- Cart state is consistent across all screens

---

### 5. Checkout (Simulation)

**Features:**
- Display order summary
- Display total price
- Fake success confirmation screen

**Acceptance Criteria:**
- No real payment processing
- Cart is cleared after successful checkout

---

### 6. Wishlist / Favorites
**Features:**
- Add/remove products from favorites
- Favorites are persisted locally
- Dedicated Favorites screen accessible via bottom nav

---

### 7. Theme System
**Features:**
- Centralized color management (Colors.ts)
- Standardized spacing and typography tokens
- Reusable shadow presets
- Design can be updated globally from a single file

---

## Non-Functional Requirements

### Performance
- API caching and request deduplication using React Query
- Minimized unnecessary re-renders

### Code Quality
- Feature-based architecture
- No excessive use of `any` type
- Reusable and well-documented components

### User Experience
- Consistent spacing and typography
- Clear loading, empty, and error states

---

## Folder Structure

```
src/
├── app/
│   ├── (auth)/
│   ├── (tabs)/
│   ├── product/
│   └── _layout.tsx
│
├── components/
│   ├── common/
│   ├── product/
│   └── cart/
│
├── features/
│   ├── auth/
│   ├── product/
│   └── cart/
│
├── services/
│   ├── api.ts
│   └── endpoints.ts
│
├── hooks/
├── utils/
├── constants/
├── types/
└── assets/
```

---

## State Management Strategy

### React Query (Server State)
- Product list
- Product detail
- Categories

### Zustand (Client State)
- Authentication session
- Shopping cart

---

## Screens & Navigation

### Public Screens
- Login
- Register (UI only)

### Authenticated Screens
- Home (Product list)
- Product detail
- Cart
- Checkout
- Profile

---

## Demo & Portfolio Requirements

### Demo Video (Mandatory)
- Duration: 30–60 seconds
- Flow:
  1. Home screen
  2. Product detail
  3. Add to cart
  4. Checkout success

### Screenshots
- Home screen
- Product detail screen
- Cart screen

---

## Success Criteria (Portfolio Perspective)

- Codebase is easy to read and understand
- Scalable and maintainable architecture
- UI looks like a real production app
- Professional presentation for potential clients and employers

---

## Out of Scope

- Real payment gateway integration
- Push notifications
- Admin dashboard
- Custom backend development

---

## Future Enhancements (Optional)

- Pagination or infinite scroll
- Real payment gateway integration
- Dark mode support
- Unit and integration testing

---

## Summary

This project is designed as a **high-quality React Native portfolio application** that mirrors real-world e-commerce workflows, emphasizes **frontend best practices**, and is ready to be showcased to potential clients and employers.