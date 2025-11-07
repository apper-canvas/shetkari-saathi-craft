import livestockData from "@/services/mockData/livestock.json"

let livestock = [...livestockData]

const delay = () => new Promise(resolve => setTimeout(resolve, 300))

export const livestockService = {
  async getAll() {
    await delay()
    return [...livestock]
  },

  async getById(id) {
    await delay()
    const animal = livestock.find(l => l.Id === parseInt(id))
    if (!animal) {
      throw new Error("Animal not found")
    }
    return { ...animal }
  },

  async create(animalData) {
    await delay()
    const maxId = Math.max(...livestock.map(l => l.Id), 0)
    const newAnimal = {
      ...animalData,
      Id: maxId + 1,
      healthRecords: animalData.healthRecords || [],
      vaccinations: animalData.vaccinations || [],
      photos: animalData.photos || []
    }
    livestock.push(newAnimal)
    return { ...newAnimal }
  },

  async update(id, animalData) {
    await delay()
    const index = livestock.findIndex(l => l.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Animal not found")
    }
    livestock[index] = { ...livestock[index], ...animalData }
    return { ...livestock[index] }
  },

  async delete(id) {
    await delay()
    const index = livestock.findIndex(l => l.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Animal not found")
    }
    livestock.splice(index, 1)
    return true
  },

  async addHealthRecord(id, record) {
    await delay()
    const animal = livestock.find(l => l.Id === parseInt(id))
    if (!animal) {
      throw new Error("Animal not found")
    }
    animal.healthRecords.push({
      ...record,
      date: new Date().toISOString().split('T')[0]
    })
    return { ...animal }
  },

  async addVaccination(id, vaccination) {
    await delay()
    const animal = livestock.find(l => l.Id === parseInt(id))
    if (!animal) {
      throw new Error("Animal not found")
    }
    animal.vaccinations.push({
      ...vaccination,
      date: new Date().toISOString().split('T')[0]
    })
    return { ...animal }
  }
}