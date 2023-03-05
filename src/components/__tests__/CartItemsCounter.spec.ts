import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CartItemsCounter from '../CartItemsCounter.vue'

describe('CartItemsCounter.vue test', () => {
    it('renders the counter with the text 1', () => {
        const wrapper = mount(CartItemsCounter, { props: { itemsCount: 1 } });
        expect(wrapper.text()).toContain('1');
    });

    it('renders the counter with the text 1', () => {
        const wrapper = mount(CartItemsCounter, { props: { itemsCount: 10 } });
        expect(wrapper.text()).toContain('9+');
    });
})