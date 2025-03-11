import type { Transaction } from "./types"

export async function parseTransactions(fileContent: string, isCsv: boolean): Promise<Transaction[]> {
  try {
    if (isCsv) {
      return parseCSV(fileContent)
    } else {
      return parseJSON(fileContent)
    }
  } catch (error) {
    console.error("Error parsing transactions:", error)
    throw new Error("Failed to parse the file. Please check the format and try again.")
  }
}

function parseCSV(csvContent: string): Transaction[] {
  // Split the content by lines
  const lines = csvContent.split(/\r?\n/).filter((line) => line.trim() !== "")

  if (lines.length < 2) {
    throw new Error("CSV file must contain headers and at least one transaction")
  }

  // Parse headers
  const headers = lines[0].split(",").map((header) => header.trim())

  // Find the relevant column indices
  const dateIndex = findColumnIndex(headers, ["date", "transaction date", "trans date"])
  const descriptionIndex = findColumnIndex(headers, ["description", "desc", "transaction", "details", "memo"])
  const amountIndex = findColumnIndex(headers, ["amount", "transaction amount", "sum", "value"])

  if (dateIndex === -1 || descriptionIndex === -1 || amountIndex === -1) {
    throw new Error("Could not identify required columns in CSV (date, description, amount)")
  }

  // Parse transactions
  const transactions: Transaction[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])

    if (values.length >= Math.max(dateIndex, descriptionIndex, amountIndex) + 1) {
      const date = values[dateIndex]
      const description = values[descriptionIndex]
      const amountStr = values[amountIndex].replace(/[^\d.-]/g, "") // Remove currency symbols
      const amount = Number.parseFloat(amountStr)

      if (!isNaN(amount) && isValidDate(date)) {
        transactions.push({
          date: formatDate(date),
          description,
          amount,
        })
      }
    }
  }

  return transactions
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === "," && !inQuotes) {
      result.push(current.trim())
      current = ""
    } else {
      current += char
    }
  }

  result.push(current.trim())
  return result
}

function parseJSON(jsonContent: string): Transaction[] {
  try {
    const data = JSON.parse(jsonContent)

    // Handle array of transactions
    if (Array.isArray(data)) {
      return data.map((item) => mapJSONToTransaction(item))
    }
    // Handle object with transactions array
    else if (data.transactions && Array.isArray(data.transactions)) {
      return data.transactions.map((item) => mapJSONToTransaction(item))
    }
    // Handle object with nested data
    else {
      throw new Error("Could not identify transactions in JSON structure")
    }
  } catch (error) {
    throw new Error("Invalid JSON format")
  }
}

function mapJSONToTransaction(item: any): Transaction {
  // Try to find date field
  const dateField = findField(item, ["date", "transactionDate", "transaction_date"])
  // Try to find description field
  const descField = findField(item, ["description", "desc", "memo", "name", "merchant"])
  // Try to find amount field
  const amountField = findField(item, ["amount", "value", "sum", "transactionAmount", "transaction_amount"])

  if (!dateField || !descField || !amountField) {
    throw new Error("Missing required fields in JSON transaction")
  }

  const date = item[dateField]
  const description = item[descField]
  let amount = item[amountField]

  // Convert amount to number if it's a string
  if (typeof amount === "string") {
    amount = Number.parseFloat(amount.replace(/[^\d.-]/g, ""))
  }

  if (!isValidDate(date) || isNaN(amount)) {
    throw new Error("Invalid date or amount format in JSON transaction")
  }

  return {
    date: formatDate(date),
    description,
    amount,
  }
}

function findField(obj: any, possibleNames: string[]): string | null {
  for (const name of possibleNames) {
    if (obj[name] !== undefined) {
      return name
    }
  }
  return null
}

function findColumnIndex(headers: string[], possibleNames: string[]): number {
  const lowerCaseHeaders = headers.map((h) => h.toLowerCase())

  for (const name of possibleNames) {
    const index = lowerCaseHeaders.findIndex((h) => h.includes(name))
    if (index !== -1) {
      return index
    }
  }

  return -1
}

function isValidDate(dateStr: string): boolean {
  // Simple check if the string can be parsed as a date
  const date = new Date(dateStr)
  return !isNaN(date.getTime())
}

function formatDate(dateStr: string): string {
  // Standardize date format to ISO string
  const date = new Date(dateStr)
  return date.toISOString()
}

