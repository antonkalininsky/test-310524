<script setup lang="ts">
// npm
import { computed } from 'vue'
// local
import ButtonComponent from '@/components/UI/ButtonComponent.vue'
import type { Task } from '@/types'
import { useTaskStore } from '@/stores/tasks'
import formatDate from '@/utils/formatDate'

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

async function deleteItem() {
  const result: boolean = confirm('Вы уверены что хотите удалить запись?')
  if (result) {
    await taskStore.deleteItem(props.item.id)
    await taskStore.getData()
  }
}

async function handleStatusChange(e: any) {
  await taskStore.updateItemById(props.item.id, {
    ...props.item,
    completed: e.target.checked
  })
  await taskStore.getData()
}
</script>

<template>
  <div class="task" :class="{ 'task--warning': isExpired }">
    <input
      class="task__check"
      type="checkbox"
      :checked="props.item.completed"
      @change="handleStatusChange"
    />
    <div class="task__content">
      <div class="task__title" :class="{ 'task__title--done': props.item.completed }">
        {{ props.item.title }}
      </div>
      <div class="task__date">{{ formatDate(props.item.dueDate) }}</div>
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
