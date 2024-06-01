<script setup lang="ts">
// npm
import { computed } from 'vue'
// local
import ButtonComponent from '@/components/UI/ButtonComponent.vue'
import type { Task } from '@/types'
import { useTaskStore } from '@/stores/tasks'

const taskStore = useTaskStore()

interface Props {
  item: Task
}

const props = defineProps<Props>()

const isExpired = computed<boolean>(() => {
  const dateNow: Date = new Date()
  const dateDue: Date = new Date(props.item.dueDate)
  return dateNow > dateDue
})

function deleteItem(): void {
  const result: boolean = confirm('Вы уверены что хотите удалить запись?')
  if (result) {
    taskStore.deleteItem(props.item.id)
  }
}
// todo - type event
function handleStatusChange(e: any): void {
  taskStore.updateItemFieldById(props.item.id, 'completed', e.target.value === 'false')
}
</script>

<template>
  <div class="task" :class="{ 'task--warning': isExpired }">
    <input
      class="task__check"
      type="checkbox"
      :value="props.item.completed"
      @change="handleStatusChange"
    />
    <div class="task__content">
      <div class="task__title" :class="{ 'task__title--done': props.item.completed }">
        {{ props.item.title }}
      </div>
      <div class="task__date">{{ props.item.dueDate }}</div>
    </div>
    <ButtonComponent @click="deleteItem"> удалить </ButtonComponent>
    <ButtonComponent @click="$emit('edit', props.item.id)"> редактировать </ButtonComponent>
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
