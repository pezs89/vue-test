<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavigation from '@/components/AppNavigation.vue';
</script>

<template>
  <header>
    <div class="wrapper">
      <AppNavigation />
    </div>
  </header>

  <RouterView />
</template>
