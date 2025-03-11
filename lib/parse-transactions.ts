import type { Transaction } from "./types";

export async function parseTransactions(fileContent: string, isCsv: boolean): Promise<Transaction[]> {
  try {
    if (isCsv) {
      return parseCSV(fileContent);
    } else {
      return parseJSON(fileContent);
    }
  } catch (error) {
    console.error("Error parsing transactions:", error);
    throw new Error("Failed to parse the file. Please check the format and try again.");
  }
}

function parseCSV(csvContent: string): Transaction[] {
  const lines = csvContent.split(/\r?\n/).filter((line) => line.trim() !== "");
  if (lines.length < 2) {
    throw new Error("CSV file must contain headers and at least one transaction");
  }
  
  const headers = lines[0].split(",").map((header) => header.trim().toLowerCase());
  const dateIndex = findColumnIndex(headers, ["date", "transaction date", "trans date", "time", "day"]);
  const descriptionIndex = findColumnIndex(headers, ["description", "desc", "transaction", "details", "memo", "name", "merchant", "payee"]);
  const amountIndex = findColumnIndex(headers, ["amount", "transaction amount", "sum", "value", "price", "payment", "debit", "credit"]);
  
  if (dateIndex === -1 || descriptionIndex === -1 || amountIndex === -1) {
    throw new Error("CSV file is missing required columns: date, description, or amount.");
  }
  
  const transactions: Transaction[] = [];
  for (let i = 1; i < lines.length; i++) {
    try {
      const values = parseCSVLine(lines[i]);
      if (values.length >= 3) {
        const date = values[dateIndex];
        const description = values[descriptionIndex];
        let amountStr = values[amountIndex].replace(/[^\d.-]/g, "");
        if (!amountStr) continue;
        if (amountStr.includes(",") && !amountStr.includes(".")) {
          amountStr = amountStr.replace(",", ".");
        }
        const amount = Number.parseFloat(amountStr);
        if (!isNaN(amount)) {
          transactions.push({ date: formatDate(date), description, amount });
        }
      }
    } catch (error) {
      console.error(`Error parsing line ${i}:`, error);
    }
  }
  if (transactions.length === 0) {
    throw new Error("Could not parse any valid transactions from the CSV file");
  }
  return transactions;
}

function parseCSVLine(line: string): string[] {
  const regex = /"([^"]*)"|([^,]+)/g;
  const result: string[] = [];
  let match;
  while ((match = regex.exec(line)) !== null) {
    result.push(match[1] ?? match[2] ?? "");
  }
  return result;
}

function parseJSON(jsonContent: string): Transaction[] {
  try {
    let data = JSON.parse(jsonContent);
    if (!data || (typeof data !== "object" && !Array.isArray(data))) {
      throw new Error("Invalid JSON structure. Expected an object or array.");
    }
    if (Array.isArray(data)) {
      return data.map(mapJSONToTransaction).filter(Boolean) as Transaction[];
    }
    if (data.transactions && Array.isArray(data.transactions)) {
      return data.transactions.map(mapJSONToTransaction).filter(Boolean) as Transaction[];
    }
    for (const key in data) {
      if (Array.isArray(data[key]) && data[key].length > 0) {
        return data[key].map(mapJSONToTransaction).filter(Boolean) as Transaction[];
      }
    }
    throw new Error("Could not identify transactions in JSON structure");
  } catch (error) {
    console.error("JSON parsing error:", error);
    throw new Error("Invalid JSON format or structure not recognized");
  }
}

function mapJSONToTransaction(item: any): Transaction | null {
  const dateField = findField(item, ["date", "transactionDate", "createdAt"]);
  const descField = findField(item, ["description", "memo", "merchant"]);
  const amountField = findField(item, ["amount", "value", "price"]);
  if (!dateField || !descField || !amountField) return null;
  let amount = item[amountField];
  if (typeof amount === "string") {
    amount = Number.parseFloat(amount.replace(/[^\d.-]/g, ""));
  }
  return isNaN(amount) ? null : { date: formatDate(item[dateField]), description: item[descField], amount };
}

function findField(obj: any, possibleNames: string[]): string | null {
  return possibleNames.find(name => obj[name] !== undefined) ?? null;
}

function findColumnIndex(headers: string[], possibleNames: string[]): number {
  const lowerCaseHeaders = headers.map((h) => h.toLowerCase());
  return possibleNames.map(name => lowerCaseHeaders.indexOf(name.toLowerCase())).find(index => index !== -1) ?? -1;
}

function formatDate(dateStr: string): string {
  try {
    const parsedDate = new Date(dateStr);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate.toISOString();
    }
    throw new Error("Invalid date format");
  } catch (error) {
    console.warn(`Could not parse date: ${dateStr}, using current date instead`);
    return new Date().toISOString();
  }
}
