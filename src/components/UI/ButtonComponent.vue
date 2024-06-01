<script setup lang="ts"></script>

<template>
  <button @click.self="$emit('click', $event)" class="button">
    <span class="button__text">
      <slot></slot>
    </span>
  </button>
</template>

<style scoped lang="scss">
.button {
  cursor: pointer;
  background-color: var(--color-primary);
  border: 0;
  padding: 4px;
  border-radius: 2px;
  &__text {
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 600;
    color: var(--color-white);
    line-height: 21.86px;
  }
  &:active {
    opacity: 0.8;
  }
}
</style>
