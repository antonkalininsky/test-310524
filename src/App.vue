<script setup lang="ts">
// npm
import { ref, computed } from 'vue'
// local
import ButtonComponent from '@/components/UI/ButtonComponent.vue'
import InputComponent from '@/components/UI/InputComponent.vue'
import TaskItem from '@/components/TaskItem.vue'
import TaskCreateEditModal from '@/components/TaskCreateEditModal.vue'
import { useTaskStore } from './stores/tasks'

const taskStore = useTaskStore()
const taskItems = computed(() => taskStore.data)

const modal = ref()

function handleEditTrigger(id: number): void {
  modal.value.openModal(id)
  console.log('check', id)
}
</script>

<template>
  <div class="task-list">
    <div class="task-list__control">
      <InputComponent placeholder="поиск" />
      <ButtonComponent @click="modal.openModal()"> добавить задачу </ButtonComponent>
    </div>
    <div class="task-list__items">
      <TaskItem v-for="item in taskItems" :key="item.id" :item="item" @edit="handleEditTrigger" />
    </div>
    <TaskCreateEditModal ref="modal" />
  </div>
</template>

<style scoped lang="scss">
.task-list {
  display: grid;
  row-gap: 18px;
  &__control {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__items {
    display: grid;
    row-gap: 4px;
  }
}
</style>
