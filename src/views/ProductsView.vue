<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

import type { Product } from '@/models/product';
import { useCartStore } from '@/stores/cart';
import { useProductsStore } from '@/stores/products';

import Card from '@/components/card.vue';
import CurrentViewHeader from '@/components/CurrentViewHeader.vue';

const productsStore = useProductsStore();
const cartStore = useCartStore();
const { loading, error, getProducts } = storeToRefs(productsStore);

onMounted(() => {
  productsStore.fetchProducts();
});

function onAddToCart(event: { product: Product, amount: number }) {
  cartStore.addToCart({ id: event.product.id, name: event.product.name, img: event.product.img, orderAmount: event.amount })
}
</script>

<template>
  <CurrentViewHeader :title="'Products'" />
  <div class="product-view">
    <Card v-for="product in getProducts" :key="product.id" :product="product"
      @add-to-cart="($event) => onAddToCart($event)" />
  </div>
</template>

<style scoped>
.product-view {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;
}
</style>
