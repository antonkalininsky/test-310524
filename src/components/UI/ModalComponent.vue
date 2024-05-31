<script setup lang="ts">
import ButtonComponent from '@/components/UI/ButtonComponent.vue'
import { ref } from 'vue';

// todo - typing
const isOpen = ref(false)

function toggle(): void {
  isOpen.value = !isOpen.value
}

defineExpose({toggle})
</script>

<template>
  <div class="modal" v-if="isOpen" @click.stop="isOpen = false">
    <div class="modal__inner">
      <div class="modal__control">
        <ButtonComponent>
          X
        </ButtonComponent>
      </div>
      <div class="modal__view">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  display: grid;
  justify-content: center;
  align-items: center;
  background-color: black;
  opacity: 0.5;
  .modal__inner {
    max-width: 600px;
    min-width: 400px;
    padding: 2rem;
    border-radius: 5px;
    background-color: white;
  }
}
</style>
