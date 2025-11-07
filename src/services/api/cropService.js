import cropsData from "@/services/mockData/crops.json"

let crops = [...cropsData]

const delay = () => new Promise(resolve => setTimeout(resolve, 300))

export const cropService = {
  async getAll() {
    await delay()
    return [...crops]
  },

  async getById(id) {
    await delay()
    const crop = crops.find(c => c.Id === parseInt(id))
    if (!crop) {
      throw new Error("Crop not found")
    }
    return { ...crop }
  },

  async create(cropData) {
    await delay()
    const maxId = Math.max(...crops.map(c => c.Id), 0)
    const newCrop = {
      ...cropData,
      Id: maxId + 1,
      notes: cropData.notes || [],
      irrigationSchedule: cropData.irrigationSchedule || [],
      photos: cropData.photos || []
    }
    crops.push(newCrop)
    return { ...newCrop }
  },

  async update(id, cropData) {
    await delay()
    const index = crops.findIndex(c => c.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Crop not found")
    }
    crops[index] = { ...crops[index], ...cropData }
    return { ...crops[index] }
  },

  async delete(id) {
    await delay()
    const index = crops.findIndex(c => c.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Crop not found")
    }
    crops.splice(index, 1)
    return true
  },

  async addNote(id, note) {
    await delay()
    const crop = crops.find(c => c.Id === parseInt(id))
    if (!crop) {
      throw new Error("Crop not found")
    }
    crop.notes.push({
      ...note,
      date: new Date().toISOString().split('T')[0]
    })
    return { ...crop }
  }
}