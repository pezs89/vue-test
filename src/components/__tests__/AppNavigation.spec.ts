import type { CartItem } from '@/models/CartItem'
import VueMaterialIcons from '@/plugins/VueMaterialIcons'
import router from '@/router'
import { useCartStore, type CartState } from '@/stores/Cart'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import type { Store } from 'pinia'
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import AppNavigation from '../AppNavigation.vue'
import CartItemsCounter from '../CartItemsCounter.vue'

describe('AppNavigation.vue Test with filled data store', () => {
    let wrapper: any = null;
    let store: Store<"cart", CartState, {
        getCartItems: (state: CartState) => CartItem[];
        getCartItemsCount: (state: CartState) => number;
        getCartTotal: (state: CartState) => number;
    }, { addToCart(cartItem: CartItem): void, removeProduct(id: string): void }>;;

    beforeEach(() => {
        wrapper = mount(AppNavigation, {
            global: {
                components: {
                    CartItemsCounter
                },
                plugins: [
                    router,
                    VueMaterialIcons,
                    createTestingPinia({
                        createSpy: vi.fn,
                        stubActions: false,
                        initialState: {
                            "cart": {
                                cartItems: [{
                                    id: '1',
                                    name: 'CartItem1',
                                    orderAmount: 3,
                                    price: 4
                                }]

                            }
                        }
                    })
                ]
            }
        })

        store = useCartStore();
    })

    afterEach(() => {
        wrapper.unmount()
    })

    it('displays the counter component if CartItems are not empty in the store', () => {
        expect(wrapper.getComponent(CartItemsCounter).exists()).toBeDefined();
    });

    it('the counter component will be not displayed because the CartItems are empty in the store', async () => {
        store.removeProduct('1');
        await wrapper.vm.$nextTick();
        expect(wrapper.findComponent(CartItemsCounter).exists()).toBe(false)
    });
})