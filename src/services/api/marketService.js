import marketData from "@/services/mockData/marketPrices.json"

let marketPrices = [...marketData]

const delay = () => new Promise(resolve => setTimeout(resolve, 300))

export const marketService = {
  async getAll() {
    await delay()
    return [...marketPrices].sort((a, b) => new Date(b.date) - new Date(a.date))
  },

  async getById(id) {
    await delay()
    const price = marketPrices.find(p => p.Id === parseInt(id))
    if (!price) {
      throw new Error("Market price not found")
    }
    return { ...price }
  },

  async getByCommodity(commodity) {
    await delay()
    return marketPrices.filter(p => 
      p.commodity.toLowerCase().includes(commodity.toLowerCase())
    )
  }
}