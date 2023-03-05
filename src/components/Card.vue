<script setup lang="ts">
import { toRefs } from 'vue';

import type { CardForm } from '@/models/CardForm';
import type { Product } from '@/models/Product';

import BaseButton from './BaseButton.vue';

const props = defineProps<{ product: Product, originalAmount: number }>();
const emit = defineEmits<{ (e: 'addToCart', { product, amount }: { product: Product, amount: number }): void }>();

const { product, originalAmount } = toRefs(props);

function onCardButtonClick($event: CardForm) {
    emit('addToCart', { product: product.value, amount: parseInt($event.amount) });
}

function validateAmount(fieldValue: string) {
    const parsedValue = parseInt(fieldValue);

    if (isNaN(parsedValue)) {
        return 'Invalid number';
    }

    if (!parsedValue) {
        return 'This field is required';
    }

    if (product.value.availableAmount <= 0) {
        return 'The product is out of stock';
    }

    if (product.value.availableAmount - parsedValue < 0) {
        return `Only ${product.value.availableAmount} available`;
    }

    if (parsedValue < product.value.minOrderAmount &&
        originalAmount.value === product.value.availableAmount) {
        return `The min amount is ${product.value.minOrderAmount}`;
    }

    return true;
}

</script>

<template>
    <div class="card">
        <img class="card__image" :src="product.img" :alt="product.name">
        <div class="card__action">
            <Form @submit="($event: CardForm) => onCardButtonClick($event)">
                <Field class="card__input-field" name="amount" type="number" :rules="validateAmount"
                    :placeholder="'Min. amount: ' + product.minOrderAmount" />
                <BaseButton :disabled="product.availableAmount === 0" :type="'submit'" :text="'Add To Cart'"></BaseButton>
                <ErrorMessage class="card__error-message" name="amount" />
            </Form>
        </div>
        <div class="card__footer">
            <div class="card__footer-left">
                <span class="card__name">{{ product.name }}</span>
                <span>Available</span>
            </div>
            <div class="card__footer-right">
                <span class="card__price">&euro;{{ product.price }}</span>
                <span class="card__available">{{ product.availableAmount }}</span>
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

    &__price, &__available {
        text-align: right;
    }

    &__action {
        width: 80%;
        opacity: 0.7;
        position: absolute;
        top: 170px;
    }

    &__input-field {
        width: 100%;
        height: 50px;
        margin: 1rem 0;
        font-size: 1.25rem;
    }

    &__error-message {
        margin-top: 1rem;
        display: block;
        text-align: center;
        color: red;
    }

    &:hover {
        img {
            opacity: 0.8;
        }

    }
}
</style>