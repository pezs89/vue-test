import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import BaseButton from '../BaseButton.vue'

describe('BaseButton.vue test', () => {
    it('renders the disabled button', () => {
        const wrapper = mount(BaseButton, { props: { text: 'Button', type: 'button', disabled: true } });
        const buttonWrapper = wrapper.find("button");

        expect(wrapper.text()).toContain('Button');
        expect(wrapper.attributes().type).toBe('button');
        expect(buttonWrapper.element.disabled).toBe(true);
    });

    it('renders the enabled button', () => {
        const wrapper = mount(BaseButton, { props: { text: 'Button', type: 'button', disabled: false } });
        const buttonWrapper = wrapper.find("button");

        expect(wrapper.text()).toContain('Button');
        expect(wrapper.attributes().type).toBe('button');
        expect(buttonWrapper.element.disabled).toBe(false);
    })
})