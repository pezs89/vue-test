import { defineStore } from "pinia";
import type { CartItem } from "@/models/CartItem";


export type CartState = {
    cartItems: CartItem[];
}

export const useCartStore = defineStore('cart', {
    state: () => ({
        cartItems: []
    } as CartState),
    getters: {
        getCartItems: (state: CartState) => state.cartItems,
        getCartItemsCount: (state: CartState) => state.cartItems
            .reduce(
                (accumulator, currentCurtItem) => {
                    accumulator += currentCurtItem.orderAmount;
                    return accumulator;
                }, 0),
        getCartTotal: (state: CartState) => state.cartItems
            .reduce((acc, currentItem) => acc += currentItem.orderAmount * currentItem.price, 0)
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
        },
        removeProduct(id: string) {
            this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== id);
        }
    }
})