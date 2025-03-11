export interface Transaction {
  date: string
  description: string
  amount: number
  category?: string
}

export interface ParsedCSVRow {
  [key: string]: string
}

