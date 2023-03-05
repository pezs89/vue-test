import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia, type Store } from 'pinia'
import { useCartStore, type CartState } from '@/stores/Cart';
import type { CartItem } from '@/models/CartItem';

describe('Cart Store Test', () => {
    let store: Store<"cart", CartState, {
        getCartItems: (state: CartState) => CartItem[];
        getCartItemsCount: (state: CartState) => number;
        getCartTotal: (state: CartState) => number;
    }, { addToCart(cartItem: CartItem): void, removeProduct(id: string): void }>;

    beforeEach(() => {
        setActivePinia(createPinia());
        store = useCartStore();
    });

    it('test adding a new city', () => {
        store.addToCart({ id: '1', name: 'CartItem', orderAmount: 3, price: 4 } as CartItem);

        expect(store.getCartItems.length).toEqual(1);
        expect(store.getCartItemsCount).toEqual(3);
        expect(store.getCartTotal).toEqual(12);
    });

    it('test adding a new city', () => {
        store.addToCart({ id: '1', name: 'CartItem', orderAmount: 3, price: 4 } as CartItem);
        store.addToCart({ id: '2', name: 'CartItem', orderAmount: 2, price: 3 } as CartItem);
        store.removeProduct('1');

        expect(store.getCartItems[0]).toEqual(
            { id: '2', name: 'CartItem', orderAmount: 2, price: 3 }
        );
        expect(store.getCartItemsCount).toEqual(2);
        expect(store.getCartTotal).toEqual(6);
    });
})