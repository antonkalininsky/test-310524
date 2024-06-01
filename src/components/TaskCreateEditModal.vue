<script setup lang="ts">
// npm
import { ref } from 'vue'
// local
import ModalComponent from '@/components/UI/ModalComponent.vue'
import ButtonComponent from '@/components/UI/ButtonComponent.vue'
import InputComponent from '@/components/UI/InputComponent.vue'

const modal = ref()
const form = ref({})

function openModal(id: number | undefined): void {
  modal.value.toggle()
}

defineExpose({ openModal })
</script>
<template>
  <ModalComponent ref="modal">
    <div class="form">
      <div class="form__inputs">
        <InputComponent label="Название" />
        <InputComponent label="Название" />
        <InputComponent label="Название" />
      </div>
      <ButtonComponent> Сохранить </ButtonComponent>
    </div>
  </ModalComponent>
</template>
<style scoped lang="scss">
.form {
  width: 315px;
  display: grid;
  row-gap: 40px;
  justify-items: center;
  &__inputs {
    width: 100%;
    display: grid;
    row-gap: 12px;
  }
}
</style>
