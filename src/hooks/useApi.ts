import { useQuery, useMutation } from '@tanstack/react-query';
import { endpoints } from '../services';
import { LoginCredentials } from '../types';

export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await endpoints.getProducts();
            return response.data;
        },
    });
};

export const useProduct = (id: number) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const response = await endpoints.getProduct(id);
            return response.data;
        },
        enabled: !!id,
    });
};

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await endpoints.getCategories();
            return response.data;
        },
    });
};

export const useLogin = () => {
    return useMutation({
        mutationFn: async (credentials: LoginCredentials) => {
            const response = await endpoints.login(credentials);
            return response.data;
        },
    });
};
