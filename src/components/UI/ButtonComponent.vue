<script setup lang="ts">
</script>

<template>
    <button @click="$emit('click')" class="button">
        <span class="button__text">
            <slot></slot>
        </span>
    </button>
</template>

<style scoped lang="scss">
.button {
    cursor: pointer;
    background-color: var(--vt-c-primary);
    border: 0;
    padding: 4px;
    border-radius: 2px;
    &__text {
        text-transform: uppercase;
        font-size: 16px;
        font-weight: 600;
        color: var(--vt-c-white)
    }
    &:active {
        opacity: 0.8;
    }
}
</style>
