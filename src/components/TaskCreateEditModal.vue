<script setup lang="ts">
// npm
import { ref } from 'vue'
// local
import ModalComponent from '@/components/UI/ModalComponent.vue'
import ButtonComponent from '@/components/UI/ButtonComponent.vue'
import InputComponent from '@/components/UI/InputComponent.vue'
import type { Task } from '@/types'
import { useTaskStore } from '@/stores/tasks'

// stores
const taskStore = useTaskStore()

// setups
const defaultTask: Task = {
  id: 0,
  title: '',
  description: '',
  dueDate: '',
  completed: false
}

defineExpose({ openModal })

// refs
const modal = ref()
const form = ref<Task>({ ...defaultTask })
const isValid = ref({
  title: true,
  date: true
})

// methods
async function openModal(id: number | undefined) {
  if (typeof id === 'undefined') {
    form.value = { ...defaultTask, id: Date.now() }
  } else {
    const item = await taskStore.getItemById(id)!
    form.value = { ...item }
  }
  modal.value.toggle()
}

async function submitForm() {
  if (!validateForm()) return
  await taskStore.addOrUpdateTask(form.value)
  await taskStore.getData()
  modal.value.toggle()
}

function validateForm(): boolean {
  isValid.value.title = true
  isValid.value.date = true
  if (form.value.title === '') {
    isValid.value.title = false
  }
  if (form.value.dueDate === '') {
    isValid.value.date = false
  }
  return isValid.value.title && isValid.value.date
}
</script>
<template>
  <ModalComponent ref="modal">
    <div class="form">
      <div class="form__inputs">
        <InputComponent label="Название" v-model="form.title" :is-error="!isValid.title" />
        <InputComponent label="Описание" v-model="form.description" />
        <InputComponent
          label="Срок выполнения"
          v-model="form.dueDate"
          type="date"
          :is-error="!isValid.date"
        />
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
