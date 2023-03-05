<script setup lang="ts">
import type { CartItem } from '@/models/CartItem';

const props = defineProps<{ item: CartItem }>();
const emits = defineEmits<{ (e: 'removeCartItem', id: string): void }>();

</script>
<template>
    <div class="cart-item">
        <div class="cart-item__image">
            <img :src="props.item.img" :alt="props.item.name" />
        </div>
        <span class="cart-item__name"> {{ props.item.name }}</span>
        <span class="cart-item__amount"> {{ props.item.orderAmount }}</span>
        <span class="cart-item__price"> &euro;{{ props.item.price }}</span>
        <span class="cart-item__button">
            <Close @click.prevent="() => emits('removeCartItem', props.item.id)"></Close>
        </span>
    </div>
</template>
<style scoped lang="scss">
.cart-item {
    width: 100%;
    display: flex;
    min-height: 100px;
    border-bottom: 1px solid darkgrey;
    padding: 15px 0;
    font-size: 20px;
    align-items: center;
    height: 50px;

    &__image {
        padding-right: 15px;
        height: 100%;

        img {
            width: 100%;
            height: 100%;
            object-fit: scale-down;
        }
    }

    &__image,
    &__amount,
    &__name,
    &__price {
        width: calc(90% / 4);
    }

    &__button {
        text-align: center;
        width: 10%;
        cursor: pointer;
        transform: scale(0.95);

        &:hover {
            transform: scale(1);
        }
    }
}

@media only screen and (max-width: 680px) {
    .cart-item {
        &__amount,
        &__name,
        &__price {
            width: calc(90% / 3);
            overflow: hidden;
            text-overflow: ellipsis;
        }

        &__image {
            display: none;
        }
    }
}
</style>