import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', () => {
  const data = ref([
    {
      id: 1,
      title: 'First task 1',
      description: 'Description fo first task',
      dueDate: '2024-06-01',
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
      dueDate: '2024-06-01',
      completed: false
    }
  ])

  return { data }
})
