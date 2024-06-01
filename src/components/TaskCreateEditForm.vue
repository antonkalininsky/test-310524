<script setup lang="ts">
import ButtonComponent from '@/components/UI/ButtonComponent.vue'
import InputComponent from '@/components/UI/InputComponent.vue'
</script>
<template>
  <div class="form">
    <div class="form__inputs">
      <InputComponent label="Название" />
      <InputComponent label="Название" />
      <InputComponent label="Название" />
    </div>
    <ButtonComponent> Сохранить </ButtonComponent>
  </div>
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
