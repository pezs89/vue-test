import VueMaterialIcons from '@/plugins/VueMaterialIcons'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import CartView from '../CartView.vue'
import CartItem from '@/components/CartItem.vue'
import CurrentViewHeader from '@/components/CurrentViewHeader.vue'

describe('CartView.vue Test with filled data store', () => {
    let wrapper: any = null;

    beforeEach(() => {
        wrapper = mount(CartView, {
            global: {
                components: {
                    CurrentViewHeader,
                    CartItem
                },
                plugins: [
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
    })

    afterEach(() => {
        wrapper.unmount()
    })

    it('displays the list of CartItems with the total price', () => {
        expect(wrapper.getComponent(CurrentViewHeader).exists()).toBeDefined();
        expect(wrapper.findAllComponents(CartItem)).toBeDefined();
        expect(wrapper.find('.cart-container__total').text()).toEqual('Total: €12');
    });

    it('displays an empty cart', async () => {
        wrapper.findAllComponents(CartItem)[0].vm.$emit('removeCartItem', '1');
        await wrapper.vm.$nextTick();
        expect(wrapper.findAllComponents(CartItem).length).toBe(0);
    });
})