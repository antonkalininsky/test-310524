<script setup lang="ts">
// npm
import { ref } from 'vue'
// local
import ButtonComponent from '@/components/UI/ButtonComponent.vue'

// refs
const isOpen = ref<boolean>(false)

// setups
defineExpose({ toggle })

// methods
function toggle(): void {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="modal" v-if="isOpen">
    <div class="modal__inner">
      <div class="modal__control">
        <ButtonComponent @click="isOpen = false" is-cross></ButtonComponent>
      </div>
      <div class="modal__view">
        <slot></slot>
      </div>
    </div>
    <div class="modal__overlay" @click.prevent="isOpen = false"></div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  justify-content: center;
  align-items: center;
  &__overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: black;
    opacity: 0.5;
  }
  &__inner {
    border-radius: 6px;
    background-color: white;
    opacity: 1 !important;
    z-index: 2;
  }
  &__control {
    display: flex;
    flex-direction: row-reverse;
    padding: 10px;
  }
  &__view {
    padding-inline: 30px;
    padding-bottom: 40px;
  }
}
</style>
