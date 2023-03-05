<script setup lang="ts">
type ButtonType = "button" | "submit" | "reset" | undefined;

const props = defineProps<{ text: string, type: ButtonType, disabled?: boolean }>();

</script>

<template>
    <button :type="props.type" :disabled="props.disabled">
        {{ props.text }}
    </button>
</template>

<style scoped lang="scss">
button {
    width: 100%;
    letter-spacing: 0.5px;
    line-height: 50px;
    padding: 0 35px;
    font-size: 15px;
    background-color: black;
    color: white;
    text-transform: uppercase;
    font-family: "Open Sans Condensed";
    font-weight: bolder;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s ease-in;

    &:hover {
        background-color: white;
        color: black;
        border: 1px solid black;
    }
}

@media only screen and (max-width: 992px) {
    button {
        padding: 0 15px;
    }
}
</style>