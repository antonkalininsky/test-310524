<script setup lang="ts">
// npm
import { ref, computed, watch } from 'vue'
// local
import ButtonComponent from '@/components/UI/ButtonComponent.vue'
import InputComponent from '@/components/UI/InputComponent.vue'
import TaskItem from '@/components/TaskItem.vue'
import TaskCreateEditModal from '@/components/TaskCreateEditModal.vue'
import { useTaskStore } from './stores/tasks'
import debounce from '@/utils/debounce'

const taskStore = useTaskStore()

const taskItems = computed(() => taskStore.dataGetter)

const modal = ref()
const searchWord = ref<string>('')

const debouncedSearch = debounce(() => taskStore.setSearchWord(searchWord.value), 300)

watch(
  () => searchWord.value,
  () => {
    debouncedSearch()
  }
)

function handleEditTrigger(id: number): void {
  modal.value.openModal(id)
}
</script>

<template>
  <div class="task-list">
    <div class="task-list__control">
      <InputComponent placeholder="поиск" v-model="searchWord" />
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
