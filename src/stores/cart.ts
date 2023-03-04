import { defineStore } from "pinia";
import type { CartItem } from "@/models/cartItem";

export type CartState = {
    cartItems: CartItem[];
}

export const useCartStore = defineStore('cart', {
    state: () => ({
        cartItems: []
    } as CartState),
    getters: {
        getCartItems: (state: CartState) => state.cartItems
    },
    actions: {
        addToCart(newProductToAdd: CartItem) {
            const isCartItemExists = !!this.cartItems.find(cartItem => cartItem.id === newProductToAdd.id);

            if (isCartItemExists) {
                this.cartItems = this.cartItems.map(
                    cartItem => {
                        const newCartItem = newProductToAdd.id === cartItem.id ?
                            { ...cartItem, orderAmount: cartItem.orderAmount + newProductToAdd.orderAmount } :
                            cartItem;
                        return newCartItem;
                    }
                );
            } else {
                this.cartItems.push(newProductToAdd);
            }
        }
    }
})