import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CartItem from '../CartItem.vue'
import type { CartItem as CartItemModel } from '@/models/CartItem';
import VueMaterialIcons from '@/plugins/VueMaterialIcons';
import Close from 'vue-material-design-icons/Close.vue';

describe('CartItem.vue test', () => {
    it('renders the CartItem', () => {
        const wrapper = mount(CartItem,
            { props: { item: { name: 'CartItem1', id: '1', orderAmount: 2, price: 3 } as CartItemModel } });
        expect(wrapper.find('.cart-item__name').text()).toContain('CartItem1');
        expect(wrapper.find('.cart-item__amount').text()).toContain('2');
        expect(wrapper.find('.cart-item__price').text()).toContain('3');
    });

    it('check the button emits the correct value', () => {
        const wrapper = mount(CartItem,
            {
                global: { plugins: [VueMaterialIcons] },
                props: { item: { name: 'CartItem1', id: '1', orderAmount: 2, price: 3 } as CartItemModel }
            });
        wrapper.findComponent(Close).trigger('click');
        expect(wrapper.emitted('removeCartItem')?.[0]).toEqual(['1']);
    });
})