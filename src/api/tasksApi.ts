import type { Task } from '@/types'
import httpClient from './httpClient'

const middleware = async (request) => {
  const result = {
    res: null,
    error: null
  }
  try {
    const res = await request()
    result.res = res
  } catch (error) {
    result.error = error
  }
  return result
}

const getTasks = (params?: any) => {
  return middleware(async () => await httpClient.get('/tasks', { params }))
}

const getTaskById = (id: number) => {
  return middleware(async () => await httpClient.get(`/tasks/${id}`))
}

const updateTask = (id: number, data: Task) => {
  return middleware(async () => await httpClient.put(`/tasks/${id}`, data))
}

const createTask = async (data) => {
  return middleware(async () => await httpClient.post('/tasks', data))
}

const deleteTaskById = async (id: number) => {
  return middleware(async () => await httpClient.delete(`/tasks/${id}`))
}

export { getTasks, updateTask, getTaskById, createTask, deleteTaskById }
