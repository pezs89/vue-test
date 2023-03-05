import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CurrentViewHeader from '../CurrentViewHeader.vue'

describe('CurrentViewHeader.vue test', () => {
    it('renders the header with the title', () => {
        const wrapper = mount(CurrentViewHeader, { props: { title: 'Title' } });
        expect(wrapper.text()).toContain('Title');
    });
})