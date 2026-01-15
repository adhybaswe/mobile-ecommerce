# Architecture Overview

## State Management Philosophy

This application follows a clear separation between **server state** and **client state**, which is a modern best practice in React applications.

### Server State (React Query)

**What is it?**
Data that lives on the server and is fetched/synchronized with the client.

**Examples in this app:**
- Product listings
- Product details
- Categories

**Why React Query?**
- Automatic caching
- Background refetching
- Request deduplication
- Loading and error states
- Optimistic updates support

**Implementation:**
```typescript
// src/hooks/useApi.ts
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await endpoints.getProducts();
      return response.data;
    },
  });
};
```

### Client State (Zustand)

**What is it?**
Data that only exists on the client and doesn't need server synchronization.

**Examples in this app:**
- Shopping cart items
- Authentication session/token
- UI preferences

**Why Zustand?**
- Simple and lightweight
- No boilerplate
- TypeScript-friendly
- Easy to persist data

**Implementation:**
```typescript
// src/features/cart/cartStore.ts
export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (product) => { /* ... */ },
  removeItem: (productId) => { /* ... */ },
  // ...
}));
```

## Folder Structure Rationale

### `/app` - Screens (Expo Router)
File-based routing makes navigation intuitive and automatic.

- `(auth)/` - Grouped route for authentication screens
- `(tabs)/` - Tab-based navigation for main app
- `product/[id].tsx` - Dynamic route for product details

### `/components` - Reusable UI
Organized by domain (common, product, cart) for easy discovery.

### `/features` - Business Logic
Each feature has its own folder with related stores, hooks, and utilities.

### `/services` - External Communication
API client and endpoint definitions separated from business logic.

### `/hooks` - Custom React Hooks
Reusable hooks, especially React Query hooks for data fetching.

### `/types` - TypeScript Definitions
Centralized type definitions for consistency.

## Data Flow

```
User Action
    ↓
Component
    ↓
Hook (useApi/useStore)
    ↓
Service/Store
    ↓
API/State Update
    ↓
Component Re-render
```

## Authentication Flow

1. User enters credentials on login screen
2. `useLogin` mutation sends request to API
3. On success, token is saved to:
   - Zustand store (in-memory)
   - SecureStore (persistent)
4. User is redirected to main app
5. On app restart, token is loaded from SecureStore

## Cart Management

1. User adds product to cart
2. `useCartStore().addItem()` is called
3. Store updates items array
4. All components using cart state re-render
5. Badge on cart tab updates automatically

## API Error Handling

- Axios interceptors catch all errors
- React Query provides `error` state
- `ErrorState` component displays user-friendly messages
- Retry functionality built-in

## Performance Optimizations

1. **React Query Caching**
   - Products cached for 5 minutes
   - Reduces unnecessary API calls

2. **Component Optimization**
   - Functional components with hooks
   - Minimal prop drilling

3. **Image Optimization**
   - `resizeMode="contain"` for proper scaling
   - Lazy loading via FlatList

4. **State Updates**
   - Zustand ensures minimal re-renders
   - Only components using specific state slice re-render

## Security Considerations

1. **Token Storage**
   - Uses Expo SecureStore (encrypted)
   - Never stored in AsyncStorage

2. **API Communication**
   - HTTPS only (Fake Store API uses HTTPS)
   - Timeout configured (10 seconds)

3. **Input Validation**
   - Form validation before submission
   - Type safety with TypeScript

## Testing Strategy (Future)

- **Unit Tests**: Utility functions, formatters
- **Integration Tests**: Store logic, API calls
- **E2E Tests**: Critical user flows (login, checkout)

## Scalability Considerations

This architecture supports:
- Adding new features easily
- Switching to real backend
- Adding more complex state management
- Implementing offline support
- Adding analytics and monitoring
