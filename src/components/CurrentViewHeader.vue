<script setup lang="ts">
const props = defineProps<{ title: string }>();
const { title } = props;
</script>

<template>
    <h2>{{ title }}</h2>
</template>

<style scoped>
h2 {
    font-size: 28px;
    margin: 25px;
    text-align: center;
}
</style>