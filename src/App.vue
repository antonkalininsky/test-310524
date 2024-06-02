<script setup lang="ts">
// npm
import { ref, computed, watch, onMounted } from 'vue'
// local
import ButtonComponent from '@/components/UI/ButtonComponent.vue'
import InputComponent from '@/components/UI/InputComponent.vue'
import TaskItem from '@/components/TaskItem.vue'
import TaskCreateEditModal from '@/components/TaskCreateEditModal.vue'
import { useTaskStore } from './stores/tasks'
import debounce from '@/utils/debounce'
import LoaderComponent from '@/components/UI/LoaderComponent.vue'

// stores
const taskStore = useTaskStore()

// computed
const taskItems = computed(() => taskStore.dataGetter)

// refs
const modal = ref()
const searchWord = ref<string>('')

// setups
const debouncedSearch = debounce(async () => {
  taskStore.setSearchWord(searchWord.value)
  await taskStore.getData()
}, 300)

// watchers
watch(
  () => searchWord.value,
  () => {
    debouncedSearch()
  }
)

// hooks
onMounted(async () => {
  await taskStore.getData()
})

// methods
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
    <div class="task-list__items" v-if="taskItems.length">
      <TaskItem v-for="item in taskItems" :key="item.id" :item="item" @edit="handleEditTrigger" />
    </div>
    <div class="task-list__messages" v-else>
      <LoaderComponent v-if="taskStore.loadingGetter" />
      <span v-else-if="taskStore.isErrorGetter">Ошибка загрузки данных</span>
      <span v-else>Задачи не найдены</span>
    </div>
    <TaskCreateEditModal ref="modal" />
  </div>
</template>

<style scoped lang="scss">
.task-list {
  display: grid;
  row-gap: 18px;
  width: 583px;
  &__control {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__items {
    display: grid;
    row-gap: 4px;
  }
  &__messages {
    text-align: center;
  }
}
</style>
