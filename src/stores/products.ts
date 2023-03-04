import { defineStore } from 'pinia';

import type { Product } from '@/models/product';
import { useCartStore } from './cart';

export type ProductsSate = {
    products: Product[];
    loading: boolean;
    error: string | undefined;
}

export const useProductsStore = defineStore('product', {
    state: () => ({
        products: [],
        loading: false,
        error: undefined
    } as ProductsSate),
    getters: {
        getProducts: (state: ProductsSate) => {
            const cartStore = useCartStore();
            const newState = state.products.map(product => {
                const existingCartItem = cartStore.cartItems.find(cartItem => cartItem.id === product.id);
                if (existingCartItem) {
                    return { ...product, availableAmount: product.availableAmount - existingCartItem.orderAmount }
                }
                return product;
            })
            return [...newState]
        }
    },
    actions: {
        async fetchProducts() {
            this.loading = true;
            try {
                this.products = await fetch('https://63c10327716562671870f959.mockapi.io/products').then(response => response.json());
            } catch (error: any) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        }
    }
})
