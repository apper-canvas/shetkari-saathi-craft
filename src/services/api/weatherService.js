import weatherData from "@/services/mockData/weather.json"

const delay = () => new Promise(resolve => setTimeout(resolve, 200))

export const weatherService = {
  async getCurrent() {
    await delay()
    return { ...weatherData }
  },

  async getForecast() {
    await delay()
    return [...weatherData.forecast]
  }
}