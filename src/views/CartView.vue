
<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useCartStore } from '@/stores/Cart';
import CartItem from '@/components/CartItem.vue';
import CurrentViewHeader from '@/components/CurrentViewHeader.vue';

const cartStore = useCartStore();
const { getCartTotal, getCartItems } = storeToRefs(cartStore);

function onRemoveCartItem(id: string) {
  cartStore.removeProduct(id);
  console.log('DSADSdasdsadsad')
}
</script>

<template>
  <CurrentViewHeader :title="'Cart'" />
  <div class="cart-container">
    <div class="cart-container__header">
      <div class="cart-container__header-cell">
        <span>Product</span>
      </div>
      <div class="cart-container__header-cell">
        <span>Description</span>
      </div>
      <div class="cart-container__header-cell">
        <span>Quantity</span>
      </div>
      <div class="cart-container__header-cell">
        <span>Price</span>
      </div>
      <div class="cart-container__header-cell">
        <span>Remove</span>
      </div>
    </div>
    <CartItem v-for="cartItem in getCartItems" :key="cartItem.id" :item="cartItem"
      @remove-cart-item="($event) => onRemoveCartItem($event)"></CartItem>
    <span class="cart-container__total">
      Total: &euro;{{ getCartTotal }}
    </span>
  </div>
</template>

<style lang="scss">
.cart-container {
  width: 55%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0;

  &__header {
    width: 100%;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid darkgrey;
  }

  &__header-cell {
    text-transform: capitalize;
    width: calc(90% / 4);

    &:last-child {
      width: 10%;
      text-align: center;
    }
  }

  &__total {
    margin-top: 30px;
    margin-left: auto;
    font-size: 2.5rem;
  }
}

@media only screen and (max-width: 1200px) {
  .cart-container {
    width: 80%;
  }
}


@media only screen and (max-width: 680px) {
  .cart-container {
    width: 100%;

    &__header {
      width: 100%;
    }

    &__header-cell {
      width: calc(90% / 3);
      overflow: hidden;
      text-overflow: ellipsis;

      &:first-child {
        display: none;
      }

      &:last-child {
        width: 10%;
        text-align: center;
        content-visibility: hidden;
      }
    }

    &__total {
      margin-top: 30px;
      margin-left: auto;
      font-size: 1.725rem;
    }
  }
}
</style>
