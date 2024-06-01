<script setup lang="ts">
import ButtonComponent from '@/components/UI/ButtonComponent.vue'
import type { Task } from '@/types'
import { useTaskStore } from '@/stores/tasks'

const taskStore = useTaskStore()

interface Props {
  item: Task
}

const props = defineProps<Props>()

function deleteItem(): void {
  const result: boolean = confirm('Вы уверены что хотите удалить запись?')
  if (result) {
    taskStore.deleteItem(props.item.id)
  }
}
</script>

<template>
  <div class="task">
    <input class="task__check" type="checkbox" />
    <div class="task__content">
      <div class="task__title">{{ props.item.title }}</div>
      <div class="task__date">{{ props.item.dueDate }}</div>
    </div>
    <ButtonComponent @click="deleteItem"> удалить </ButtonComponent>
    <ButtonComponent> редактировать </ButtonComponent>
  </div>
</template>

<style scoped lang="scss">
.task {
  background-color: var(--color-gray);
  padding: 0.5rem;
  border-radius: 0.25rem;
  display: grid;
  grid-template-columns: min-content auto min-content min-content;
  align-items: center;
  column-gap: 0.25rem;
  &--warning {
    background-color: var(--color-red);
  }
  &__check {
    margin-right: 8px;
  }
  &__content {
    min-width: 300px;
  }
  &__title {
    font-size: 20px;
    &--done {
      text-decoration: line-through;
    }
  }
  &__date {
    font-size: 12px;
  }
}
</style>
