import transactionsData from "@/services/mockData/transactions.json"

let transactions = [...transactionsData]

const delay = () => new Promise(resolve => setTimeout(resolve, 300))

export const transactionService = {
  async getAll() {
    await delay()
    return [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date))
  },

  async getById(id) {
    await delay()
    const transaction = transactions.find(t => t.Id === parseInt(id))
    if (!transaction) {
      throw new Error("Transaction not found")
    }
    return { ...transaction }
  },

  async create(transactionData) {
    await delay()
    const maxId = Math.max(...transactions.map(t => t.Id), 0)
    const newTransaction = {
      ...transactionData,
      Id: maxId + 1,
      date: transactionData.date || new Date().toISOString().split('T')[0]
    }
    transactions.push(newTransaction)
    return { ...newTransaction }
  },

  async update(id, transactionData) {
    await delay()
    const index = transactions.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Transaction not found")
    }
    transactions[index] = { ...transactions[index], ...transactionData }
    return { ...transactions[index] }
  },

  async delete(id) {
    await delay()
    const index = transactions.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Transaction not found")
    }
    transactions.splice(index, 1)
    return true
  },

  async getSummary(month, year) {
    await delay()
    const monthTransactions = transactions.filter(t => {
      const date = new Date(t.date)
      return date.getMonth() === month && date.getFullYear() === year
    })

    const income = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const expenses = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)

    return {
      income,
      expenses,
      profit: income - expenses,
      transactions: monthTransactions
    }
  }
}