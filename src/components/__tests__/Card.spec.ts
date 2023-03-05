import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Card from '../Card.vue';
import type { Product } from '@/models/Product';
import { ErrorMessage, Field, Form } from 'vee-validate';
import flushPromises from 'flush-promises';
import waitForExpect from 'wait-for-expect';

describe('Card.vue test', () => {
    it('renders the Card', () => {
        const wrapper = mount(Card,
            {
                components: { Field, Form, ErrorMessage },
                props: {
                    product: { name: 'Product1', id: '1', availableAmount: 2, price: 3, img: '' } as Product,
                    originalAmount: 2
                },
            });
        expect(wrapper.find('.card__name').text()).toContain('Product1');
        expect(wrapper.find('.card__available').text()).toContain('2');
        expect(wrapper.find('.card__price').text()).toContain('3');
    });

    it('renders the ErrorMessage with the message of "Only 2 available"', async () => {
        const wrapper = mount(Card,
            {
                components: { Field, Form, ErrorMessage },
                props: {
                    product: { name: 'Product1', id: '1', availableAmount: 2, price: 3, img: '' } as Product,
                    originalAmount: 2
                },
            });
        const input = wrapper.find('input')
        input.setValue('100');
        input.trigger('change');

        await flushPromises();
        await waitForExpect(() => {
            expect(wrapper.find('.card__error-message').text()).toEqual('Only 2 available');
        });
    });

    it('renders the ErrorMessage with the message of "Invalid number"', async () => {
        const wrapper = mount(Card,
            {
                components: { Field, Form, ErrorMessage },
                props: {
                    product: { name: 'Product1', id: '1', availableAmount: 2, price: 3, img: '' } as Product,
                    originalAmount: 2
                },
            });
        const input = wrapper.find('input')
        input.setValue('NotNumber');
        input.trigger('change');

        await flushPromises();
        await waitForExpect(() => {
            expect(wrapper.find('.card__error-message').text()).toEqual('Invalid number');
        });
    });

    it('renders the ErrorMessage with the message of "This field is required"', async () => {
        const wrapper = mount(Card,
            {
                components: { Field, Form, ErrorMessage },
                props: {
                    product: { name: 'Product1', id: '1', availableAmount: 2, price: 3, img: '' } as Product,
                    originalAmount: 2
                },
            });
        const input = wrapper.find('input')
        input.setValue('0');
        input.trigger('change');

        await flushPromises();
        await waitForExpect(() => {
            expect(wrapper.find('.card__error-message').text()).toEqual('This field is required');
        });
    });

    it('renders the ErrorMessage with the message of "The min amount is 2"', async () => {
        const wrapper = mount(Card,
            {
                components: { Field, Form, ErrorMessage },
                props: {
                    product: { name: 'Product1', id: '1', availableAmount: 3, price: 3, img: '', minOrderAmount: 2 } as Product,
                    originalAmount: 3
                },
            });
        const input = wrapper.find('input')
        input.setValue('1');
        input.trigger('change');

        await flushPromises();
        await waitForExpect(() => {
            expect(wrapper.find('.card__error-message').text()).toEqual('The min amount is 2');
        });
    });
})