<script setup lang="ts">
// npm
import { ref } from 'vue'
// local
import ModalComponent from '@/components/UI/ModalComponent.vue'
import ButtonComponent from '@/components/UI/ButtonComponent.vue'
import InputComponent from '@/components/UI/InputComponent.vue'
import type { Task } from '@/types'
import { useTaskStore } from '@/stores/tasks'

const taskStore = useTaskStore()

const defaultTask: Task = {
  id: 0,
  title: '',
  description: '',
  dueDate: '',
  completed: false
}

const modal = ref()
const form = ref<Task>({ ...defaultTask })

function openModal(id: number | undefined): void {
  if (typeof id === 'undefined') {
    form.value = { ...defaultTask }
  } else {
    const item = taskStore.getItemById(id)!
    form.value = { ...item }
  }
  modal.value.toggle()
}

function submitForm(): void {
  if (!validateForm()) return
  taskStore.addNewTask(form.value)
  modal.value.toggle()
}

function validateForm(): boolean {
  console.log('todo')
  return true
}

defineExpose({ openModal })
</script>
<template>
  <ModalComponent ref="modal">
    <div class="form">
      <div class="form__inputs">
        <InputComponent label="Название" v-model="form.title" />
        <InputComponent label="Описание" v-model="form.description" />
        <InputComponent label="Срок выполнения" v-model="form.dueDate" />
      </div>
      <ButtonComponent @click="submitForm"> Сохранить </ButtonComponent>
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
