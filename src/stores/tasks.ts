import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from '@/types'
import { getTaskById, getTasks, createTask, updateTask, deleteTaskById } from '@/api/tasksApi'

export const useTaskStore = defineStore('taskStore', () => {
  // refs
  const data = ref<Task[]>([])
  const search = ref<string>('')
  const isError = ref<boolean>(false)
  const loading = ref<boolean>(false)

  // getters
  const dataGetter = computed(() => data.value)
  const isErrorGetter = computed(() => isError.value)
  const loadingGetter = computed(() => loading.value)

  // setters
  function setSearchWord(value: string): void {
    search.value = value
  }

  // methods
  async function getData() {
    loading.value = true
    isError.value = false
    const params = {}
    if (search.value !== '') {
      params.title = search.value
    }
    const result = await getTasks(params)
    if (result.error) {
      isError.value = true
    } else {
      data.value = result.res.data.map((item) => {
        return { ...item, id: Number(item.id) }
      })
    }
    loading.value = false
  }

  async function addOrUpdateTask(newItem: Task) {
    const result = await getTaskById(newItem.id)
    if (result.error) {
      await createTask({ ...newItem, id: String(newItem.id) })
    } else {
      await updateTask(newItem.id, newItem)
    }
  }

  async function deleteItem(id: number) {
    await deleteTaskById(id)
  }

  async function getItemById(id: number) {
    const result = await getTaskById(id)
    if (!result.error) {
      return result.res.data
    }
    return null
  }

  async function updateItemById(id: number, value: Task) {
    await updateTask(id, value)
  }

  return {
    isErrorGetter,
    loadingGetter,
    dataGetter,
    getData,
    setSearchWord,
    addOrUpdateTask,
    deleteItem,
    getItemById,
    updateItemById
  }
})
