import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia, type Store } from 'pinia'
import { useProductsStore, type ProductsSate } from '@/stores/Products';
import type { Product } from '@/models/Product';
import createFetchMock from 'vitest-fetch-mock';
import { useCartStore, type CartState } from '../Cart';
import type { CartItem } from '@/models/CartItem';

describe('Product Store Test', () => {
    const fetchMocker = createFetchMock(vi);
    fetchMocker.enableMocks();

    let store: Store<'products', ProductsSate, {
        getProducts: (state: ProductsSate) => Product[];
    }, { fetchProducts(): Promise<void> }>;
    let cartStore: Store<"cart", CartState, {
        getCartItems: (state: CartState) => CartItem[];
        getCartItemsCount: (state: CartState) => number;
        getCartTotal: (state: CartState) => number;
    }, { addToCart(cartItem: CartItem): void, removeProduct(id: string): void }>;

    beforeEach(() => {
        setActivePinia(createPinia());
        store = useProductsStore();
        cartStore = useCartStore();
    });

    it('will be successfully fetching the products', async () => {
        fetchMocker.mockResponse(JSON.stringify([{ name: 'Product1', id: '1', availableAmount: 10, price: 10, img: '', minOrderAmount: 2 }] as Product[]))
        await store.fetchProducts();
        expect(store.getProducts.length).toEqual(1);
        expect(store.loading).toEqual(false);
    });

    it('will get the updated amount if the item is in the cart', async () => {
        fetchMocker.mockResponse(JSON.stringify([{ name: 'Product1', id: '1', availableAmount: 10, price: 10, img: '', minOrderAmount: 2 }] as Product[]))
        await store.fetchProducts();
        cartStore.addToCart({ id: '1', orderAmount: 2, name: 'Product1', price: 10, img: '' });
        expect(store.getProducts[0].availableAmount).toEqual(8);
        expect(store.loading).toEqual(false);
    });
})