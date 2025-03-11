"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Transaction } from "@/lib/types"
import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { generateFinancialAdvice } from "@/lib/generate-advice"

interface AIFinancialAdviceProps {
  transactions: Transaction[]
  categoryData: { name: string; value: number }[]
}

export function AIFinancialAdvice({ transactions, categoryData }: AIFinancialAdviceProps) {
  const [advice, setAdvice] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAdvice() {
      try {
        setIsLoading(true)
        const generatedAdvice = await generateFinancialAdvice(transactions, categoryData)
        setAdvice(generatedAdvice)
      } catch (err) {
        setError("Failed to generate AI advice. Please try again later.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAdvice()
  }, [transactions, categoryData])

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Financial Advice</CardTitle>
        <CardDescription>Personalized recommendations based on your spending patterns</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500 mb-4" />
            <p className="text-slate-500 dark:text-slate-400">Analyzing your spending patterns...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md text-red-800 dark:text-red-300">{error}</div>
        ) : (
          <div className="space-y-4">
            {advice?.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-slate-700 dark:text-slate-300">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

