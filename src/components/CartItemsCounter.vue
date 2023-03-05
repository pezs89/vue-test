<script setup lang="ts">
import { toRef } from 'vue';

const props = defineProps<{ itemsCount: number }>();
const itemsCount = toRef(props, 'itemsCount');
</script>

<template>
    <div class="items-counter">
        {{ itemsCount > 9 ? '9+' : itemsCount }}
    </div>
</template>

<style scoped lang="scss">
.items-counter {
    background-color: rgb(3, 201, 169);
    font-size: 0.725rem;
    border-radius: 50%;
    width: 1.25rem;
    height: 1.25rem;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -0.25rem;
    right: -0.25rem;
}
</style>