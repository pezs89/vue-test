<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

import type { Product } from '@/models/Product';
import type { CartItem } from '@/models/CartItem';
import { useCartStore } from '@/stores/Cart';
import { useProductsStore } from '@/stores/Products';

import Card from '@/components/Card.vue';
import CurrentViewHeader from '@/components/CurrentViewHeader.vue';

const productsStore = useProductsStore();
const cartStore = useCartStore();
const { products, getProducts } = storeToRefs(productsStore);

onMounted(() => {
  productsStore.fetchProducts();
});

function onAddToCart(event: { product: Product, amount: number }) {
  const newCartItem: CartItem = {
    id: event.product.id,
    price: event.product.price,
    orderAmount: event.amount,
    img: event.product.img,
    name: event.product.name
  };
  cartStore.addToCart(newCartItem);
}
</script>

<template>
  <CurrentViewHeader :title="'Products'" />
  <div class="product-view">
    <Card v-for="(product, i) in getProducts" :key="product.id" :product="product"
      :original-amount="products[i]?.availableAmount" @add-to-cart="($event) => onAddToCart($event)" />
  </div>
</template>

<style scoped>
.product-view {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;
}

@media only screen and (max-width: 1200px) {
  .product-view {
    grid-template-columns: repeat(3, 1fr);

  }
}

@media only screen and (max-width: 680px) {
  .product-view {
    grid-template-columns: repeat(2, 1fr);

  }
}

@media only screen and (max-width: 481px) {
  .product-view {
    grid-template-columns: repeat(1, 1fr);

  }
}
</style>
