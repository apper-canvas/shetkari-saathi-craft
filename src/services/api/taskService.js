import tasksData from "@/services/mockData/tasks.json"

let tasks = [...tasksData]

const delay = () => new Promise(resolve => setTimeout(resolve, 300))

export const taskService = {
  async getAll() {
    await delay()
    return [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
  },

  async getById(id) {
    await delay()
    const task = tasks.find(t => t.Id === parseInt(id))
    if (!task) {
      throw new Error("Task not found")
    }
    return { ...task }
  },

  async create(taskData) {
    await delay()
    const maxId = Math.max(...tasks.map(t => t.Id), 0)
    const newTask = {
      ...taskData,
      Id: maxId + 1,
      completed: false,
      dueDate: taskData.dueDate || new Date().toISOString()
    }
    tasks.push(newTask)
    return { ...newTask }
  },

  async update(id, taskData) {
    await delay()
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Task not found")
    }
    tasks[index] = { ...tasks[index], ...taskData }
    return { ...tasks[index] }
  },

  async delete(id) {
    await delay()
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Task not found")
    }
    tasks.splice(index, 1)
    return true
  },

  async complete(id) {
    await delay()
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Task not found")
    }
    tasks[index].completed = true
    return { ...tasks[index] }
  },

  async getTodayTasks() {
    await delay()
    const today = new Date().toISOString().split('T')[0]
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate).toISOString().split('T')[0]
      return taskDate === today
    })
  },

  async getPendingTasks() {
    await delay()
    return tasks.filter(task => !task.completed)
  }
}