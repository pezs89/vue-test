import VueMaterialIcons from '@/plugins/VueMaterialIcons'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import type { Store } from 'pinia'
import createFetchMock from 'vitest-fetch-mock';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'

import ProductsView from '../ProductsView.vue'
import CurrentViewHeader from '@/components/CurrentViewHeader.vue'
import Card from '@/components/Card.vue';
import type { Product } from '@/models/Product'
import { useProductsStore, type ProductsSate } from '@/stores/Products';

describe('ProductsView.vue Test with filled data store', () => {
    const fetchMocker = createFetchMock(vi);
    fetchMocker.enableMocks();

    let wrapper: any = null;
    let store: Store<'products', ProductsSate, {
        getProducts: (state: ProductsSate) => Product[];
    }, { fetchProducts(): Promise<void> }>;

    beforeEach(() => {
        wrapper = mount(ProductsView, {
            global: {
                components: {
                    CurrentViewHeader,
                    Card
                },
                plugins: [
                    VueMaterialIcons,
                    createTestingPinia({
                        createSpy: vi.fn,
                        stubActions: false,
                        initialState: {
                            "products": {
                                products: [{
                                    id: '1',
                                    name: 'CartItem1',
                                    minOrderAmount: 3,
                                    availableAmount: 3,
                                    price: 4,
                                    img: ''
                                }] as Product[]
                            }
                        }
                    })
                ]
            }
        })
        fetchMocker.mockResponse(JSON.stringify([{ name: 'Product1', id: '1', availableAmount: 3, price: 10, img: '', minOrderAmount: 2 }] as Product[]))
        store = useProductsStore();
    })

    afterEach(() => {
        wrapper.unmount()
    })

    it('displays the list of Products', () => {
        expect(wrapper.getComponent(CurrentViewHeader).exists()).toBeDefined();
        expect(wrapper.findAllComponents(Card)).toBeDefined();
    });

    it('displays an empty cart', async () => {
        wrapper.findAllComponents(Card)[0].vm.$emit('addToCart', {
            product: {
                id: '1',
                name: 'CartItem1',
                minOrderAmount: 3,
                availableAmount: 3,
                price: 4,
                img: ''
            },
            amount: 1
        });
        await wrapper.vm.$nextTick();
        expect(store.getProducts[0].availableAmount).toBe(2);
    });
})