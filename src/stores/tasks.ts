import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from '@/types'

export const useTaskStore = defineStore('taskStore', () => {
  const data = ref([
    {
      id: 1,
      title: 'First task 1',
      description: 'Description fo first task',
      dueDate: '2024-06-03',
      completed: false
    },
    {
      id: 2,
      title: 'First task 2',
      description: 'Description fo first task',
      dueDate: '2024-06-01',
      completed: false
    },
    {
      id: 3,
      title: 'First task 3',
      description: 'Description fo first task',
      dueDate: '2024-06-01',
      completed: false
    },
    {
      id: 4,
      title: 'First task 4',
      description: 'Description fo first task',
      dueDate: '2024-06-05',
      completed: false
    }
  ])

  const search = ref<string>('')

  const dataGetter = computed(() => {
    if (search.value) {
      return data.value.filter((item) => item.title.includes(search.value))
    }
    return data.value
  })

  function addOrUpdateTask(newItem: Task): void {
    const index = data.value.findIndex((item) => item.id === newItem.id)
    if (index === -1) {
      data.value.push(newItem)
    } else {
      data.value.splice(index, 1, newItem)
    }
  }

  function deleteItem(id: number): void {
    const index = data.value.findIndex((item) => item.id === id)
    data.value.splice(index, 1)
  }

  function getItemById(id: number): Task {
    return data.value.find((item) => item.id === id)!
  }

  function updateItemFieldById(id: number, key: any, value: any): void {
    updateItemField(getItemById(id), key, value)
  }

  function updateItemField<T, K extends keyof T>(item: T, key: K, value: T[K]): void {
    item[key] = value
  }

  function setSearchWord(value: string): void {
    console.log('triggered')
    search.value = value
  }

  return {
    dataGetter,
    setSearchWord,
    addOrUpdateTask,
    deleteItem,
    getItemById,
    updateItemFieldById
  }
})
