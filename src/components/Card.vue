<script setup lang="ts">
import type { Product } from '@/models/product';
import { toRefs, watch } from 'vue';
import BaseButton from './BaseButton.vue';

const props = defineProps<{ product: Product }>();
const emit = defineEmits<{ (e: 'addToCart', { product, amount }: { product: Product, amount: number }): void }>();

const { product } = toRefs(props);

function onCardButtonClick() {
    emit('addToCart', { product: product.value, amount: 1 });
}

</script>

<template>
    <div class="card">
        <img class="card__image" :src="product.img" :alt="product.name">
        <div class="card__action">
            <BaseButton :type="'button'" :text="'Add To Cart'" @button-clicked="() => onCardButtonClick()"></BaseButton>
        </div>
        <div class="card__footer">
            <div class="card__footer-left">
                <span class="card__name">{{ product.name }}</span>
                <span>Available</span>
            </div>
            <div class="card__footer-right">
                <span class="card__price">{{ product.price }}</span>
                <span class="card__price">{{ product.availableAmount }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 400px;
    align-items: center;
    position: relative;

    &__image {
        width: 100%;
        height: 90%;
        object-fit: cover;
        padding-bottom: 5px;
        filter: brightness(0.7);
        transition: opacity 0.2s ease-in;
    }

    &__footer {
        width: 100%;
        height: 10%;
        display: flex;
        justify-content: space-between;
        font-size: 18px;
    }

    &__footer-left,
    &__footer-right {
        display: flex;
        flex-direction: column;
    }

    &__price {
        text-align: right;
    }

    &__action {
        width: 80%;
        opacity: 0.7;
        position: absolute;
        top: 255px;
    }

    &:hover {
        img {
            opacity: 0.8;
        }

    }
}
</style>