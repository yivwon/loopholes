import type { Transaction } from "./types"

// Common keywords for different spending categories
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Groceries: [
    "grocery",
    "supermarket",
    "market",
    "food",
    "walmart",
    "target",
    "kroger",
    "safeway",
    "trader",
    "whole foods",
    "aldi",
  ],
  "Dining Out": [
    "restaurant",
    "cafe",
    "coffee",
    "starbucks",
    "mcdonald",
    "burger",
    "pizza",
    "taco",
    "sushi",
    "dining",
    "doordash",
    "uber eats",
    "grubhub",
  ],
  Transportation: [
    "gas",
    "fuel",
    "uber",
    "lyft",
    "taxi",
    "transit",
    "train",
    "bus",
    "subway",
    "metro",
    "parking",
    "toll",
  ],
  Housing: ["rent", "mortgage", "property", "hoa", "maintenance", "repair", "furniture", "home depot", "lowes"],
  Utilities: [
    "electric",
    "water",
    "gas",
    "internet",
    "cable",
    "phone",
    "utility",
    "bill",
    "at&t",
    "verizon",
    "comcast",
    "xfinity",
  ],
  Entertainment: [
    "movie",
    "theater",
    "concert",
    "netflix",
    "hulu",
    "spotify",
    "disney",
    "amazon prime",
    "hbo",
    "ticket",
    "event",
  ],
  Shopping: [
    "amazon",
    "ebay",
    "etsy",
    "clothing",
    "apparel",
    "shoes",
    "electronics",
    "best buy",
    "apple",
    "microsoft",
    "nike",
    "adidas",
  ],
  Health: [
    "doctor",
    "medical",
    "pharmacy",
    "prescription",
    "hospital",
    "dental",
    "vision",
    "insurance",
    "fitness",
    "gym",
  ],
  Travel: ["hotel", "airbnb", "flight", "airline", "vacation", "trip", "travel", "booking", "expedia", "airfare"],
  Education: ["tuition", "school", "college", "university", "book", "course", "class", "education", "student", "loan"],
  Subscriptions: ["subscription", "membership", "monthly", "annual", "recurring"],
  Income: [
    "salary",
    "deposit",
    "payroll",
    "direct deposit",
    "payment",
    "income",
    "revenue",
    "wage",
    "compensation",
    '  "deposit',
    "payroll",
    "direct deposit",
    "payment",
    "income",
    "revenue",
    "wage",
    "compensation",
    "bonus",
    "refund",
    "tax return",
  ],
  "Personal Care": ["salon", "spa", "haircut", "beauty", "cosmetics", "personal care"],
  "Gifts & Donations": ["gift", "donation", "charity", "nonprofit", "present"],
  Insurance: ["insurance", "premium", "coverage", "policy"],
  Taxes: ["tax", "irs", "government fee", "penalty"],
  Investments: ["investment", "stock", "etf", "mutual fund", "brokerage", "dividend", "capital gain"],
}

export async function categorizeTransactions(transactions: Transaction[]): Promise<Transaction[]> {
  return transactions.map((transaction) => {
    const description = transaction.description.toLowerCase()

    // Check if it's income (positive amount)
    if (transaction.amount > 0) {
      for (const keyword of CATEGORY_KEYWORDS["Income"]) {
        if (description.includes(keyword)) {
          return { ...transaction, category: "Income" }
        }
      }
      return { ...transaction, category: "Income" }
    }

    // Categorize expenses
    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
      for (const keyword of keywords) {
        if (description.includes(keyword.toLowerCase())) {
          return { ...transaction, category }
        }
      }
    }

    // Default category if no match found
    return { ...transaction, category: "Miscellaneous" }
  })
}

