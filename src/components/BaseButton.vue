<script setup lang="ts">
export type ButtonType = "button" | "submit" | "reset" | undefined;

const props = defineProps<{ text: string, type: ButtonType }>();
const emit = defineEmits<{ (e: string): void }>();

const { type, text } = props;

function onButtonClick() {
    emit('buttonClicked');
}
</script>

<template>
    <button :type="type" @click.prevent="() => onButtonClick()">
        {{ text }}
    </button>
</template>

<style scoped lang="scss">
button {
    width: 100%;
    letter-spacing: 0.5px;
    line-height: 50px;
    padding: 0 35px 0 35px;
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
</style>