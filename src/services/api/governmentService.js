import schemesData from "@/services/mockData/governmentSchemes.json"

let schemes = [...schemesData]

const delay = () => new Promise(resolve => setTimeout(resolve, 300))

export const governmentService = {
  async getAll() {
    await delay()
    return [...schemes]
  },

  async getById(id) {
    await delay()
    const scheme = schemes.find(s => s.Id === parseInt(id))
    if (!scheme) {
      throw new Error("Government scheme not found")
    }
    return { ...scheme }
  },

  async getActiveSchemes() {
    await delay()
    return schemes.filter(s => s.status === 'active')
  }
}