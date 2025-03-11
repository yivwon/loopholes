import type { Transaction } from "./types"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateFinancialAdvice(
  transactions: Transaction[],
  categoryData: { name: string; value: number }[],
): Promise<string> {
  try {
    // Create a summary of spending patterns
    const totalSpent = transactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0)

    const totalIncome = transactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)

    // Format category data for the AI
    const categorySpending = categoryData
      .map((cat) => `${cat.name}: $${cat.value.toFixed(2)} (${((cat.value / totalSpent) * 100).toFixed(1)}%)`)
      .join("\n")

    // Create the prompt
    const prompt = `
      Based on the following financial data, provide personalized financial advice to help the user save money and improve their financial health.
      
      Total Income: $${totalIncome.toFixed(2)}
      Total Expenses: $${totalSpent.toFixed(2)}
      
      Spending by Category:
      ${categorySpending}
      
      Please provide 3-5 specific, actionable recommendations based on this spending pattern. Focus on:
      1. Areas where the user might be overspending
      2. Potential savings opportunities
      3. Better budgeting strategies
      4. Any concerning patterns you notice
      
      Format your advice in a friendly, helpful tone with clear paragraphs. Do not mention that you are an AI.
    `

    // Generate advice using AI
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
      temperature: 0.7,
      maxTokens: 500,
    })

    return text
  } catch (error) {
    console.error("Error generating financial advice:", error)
    return "I couldn't generate personalized advice at this time. Try reviewing your top spending categories to identify potential savings opportunities."
  }
}

