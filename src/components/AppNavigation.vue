<script setup lang="ts">
import { useCartStore } from '@/stores/Cart';
import { storeToRefs } from 'pinia';
import CartItemsCounter from './CartItemsCounter.vue';

const cartStore = useCartStore();
const { getCartItemsCount } = storeToRefs(cartStore);
</script>

<template>
    <nav class="nav">
        <div class="nav__products">
            <RouterLink to="/">
                <HomePlusOutline :size="32" />
            </RouterLink>
        </div>
        <div class="nav__cart">
            <RouterLink to="/cart">
                <CartOutline :size="32" />
                <CartItemsCounter v-if="getCartItemsCount > 0" :items-count="getCartItemsCount" />
            </RouterLink>
        </div>
    </nav>
</template>

<style lang="scss">
.nav {
    display: flex;
    height: 40px;
    align-items: center;

    &__products,
    &__cart {
        flex-basis: 50%;
        align-items: center;
    }

    &__cart {
        display: flex;
        justify-content: end;
    }
}
</style>