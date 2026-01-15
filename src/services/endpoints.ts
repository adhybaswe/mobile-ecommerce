import { api } from './api';
import { Product, AuthResponse, LoginCredentials } from '../types';

export const endpoints = {
    // Products
    getProducts: () => api.get<Product[]>('/products'),
    getProduct: (id: number) => api.get<Product>(`/products/${id}`),
    getCategories: () => api.get<string[]>('/products/categories'),
    getProductsByCategory: (category: string) =>
        api.get<Product[]>(`/products/category/${category}`),

    // Auth (dummy)
    login: (credentials: LoginCredentials) =>
        api.post<AuthResponse>('/auth/login', credentials),
};
