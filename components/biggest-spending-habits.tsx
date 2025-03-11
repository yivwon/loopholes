"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Transaction } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import { motion } from "framer-motion"
import { TrendingUp, ArrowUpRight, Calendar, DollarSign, ShoppingBag } from "lucide-react"

interface BiggestSpendingHabitsProps {
  transactions: Transaction[]
}

export function BiggestSpendingHabits({ transactions }: BiggestSpendingHabitsProps) {
  // Find the most frequent merchant
  const merchantFrequency = transactions
    .filter((t) => t.amount < 0)
    .reduce(
      (acc, transaction) => {
        const merchant = transaction.description.split(" ")[0] // Simple extraction of merchant name
        acc[merchant] = (acc[merchant] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

  const mostFrequentMerchant = Object.entries(merchantFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 1)[0]

  // Find largest single transaction
  const largestTransaction = [...transactions]
    .filter((t) => t.amount < 0)
    .sort((a, b) => Math.abs(a.amount) - Math.abs(b.amount))
    .pop()

  // Find most expensive day of the week
  const daySpending = transactions
    .filter((t) => t.amount < 0)
    .reduce(
      (acc, transaction) => {
        const day = new Date(transaction.date).toLocaleDateString("en-US", { weekday: "long" })
        acc[day] = (acc[day] || 0) + Math.abs(transaction.amount)
        return acc
      },
      {} as Record<string, number>,
    )

  const mostExpensiveDay = Object.entries(daySpending)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 1)[0]

  // Find most expensive category
  const categorySpending = transactions
    .filter((t) => t.amount < 0)
    .reduce(
      (acc, transaction) => {
        const category = transaction.category || "Uncategorized"
        acc[category] = (acc[category] || 0) + Math.abs(transaction.amount)
        return acc
      },
      {} as Record<string, number>,
    )

  const mostExpensiveCategory = Object.entries(categorySpending)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 1)[0]

  // Calculate recurring subscriptions (simplified approach)
  const potentialSubscriptions = transactions
    .filter((t) => t.amount < 0)
    .reduce(
      (acc, transaction) => {
        const key = `${transaction.description}-${Math.abs(transaction.amount).toFixed(2)}`
        acc[key] = (acc[key] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

  const recurringSubscriptions = Object.entries(potentialSubscriptions)
    .filter(([_, count]) => count >= 2) // At least appears twice
    .map(([key]) => {
      const [desc, amount] = key.split("-")
      return {
        description: desc,
        amount: Number.parseFloat(amount),
        count: potentialSubscriptions[key],
      }
    })
    .sort((a, b) => b.amount * b.count - a.amount * a.count)
    .slice(0, 3)

  const totalSubscriptionCost = recurringSubscriptions.reduce((sum, sub) => sum + sub.amount * sub.count, 0)

  return (
    <Card className="border-none shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-emerald-500" />
          Spending Habits Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium text-slate-900 dark:text-white flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-purple-500" />
                Most Frequent Merchant
              </h3>
              <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs font-medium px-2 py-1 rounded-full">
                {mostFrequentMerchant?.[1] || 0} visits
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{mostFrequentMerchant?.[0] || "N/A"}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              You visit this merchant more than any other place
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium text-slate-900 dark:text-white flex items-center gap-2">
                <ArrowUpRight className="h-4 w-4 text-red-500" />
                Largest Transaction
              </h3>
              <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs font-medium px-2 py-1 rounded-full">
                {largestTransaction ? new Date(largestTransaction.date).toLocaleDateString() : "N/A"}
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {largestTransaction ? formatCurrency(Math.abs(largestTransaction.amount)) : "N/A"}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {largestTransaction?.description || "No transactions found"}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-500" />
                Most Expensive Day
              </h3>
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium px-2 py-1 rounded-full">
                {formatCurrency(mostExpensiveDay?.[1] || 0)}
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{mostExpensiveDay?.[0] || "N/A"}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              You tend to spend more on this day of the week
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium text-slate-900 dark:text-white flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-emerald-500" />
                Top Spending Category
              </h3>
              <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-xs font-medium px-2 py-1 rounded-full">
                {formatCurrency(mostExpensiveCategory?.[1] || 0)}
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{mostExpensiveCategory?.[0] || "N/A"}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              This category represents your largest expense
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800"
        >
          <h3 className="text-lg font-medium text-amber-900 dark:text-amber-300 mb-3">
            Potential Recurring Subscriptions
          </h3>

          {recurringSubscriptions.length > 0 ? (
            <>
              <div className="space-y-3">
                {recurringSubscriptions.map((sub, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{sub.description}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Appears {sub.count} times • {formatCurrency(sub.amount)} each
                      </p>
                    </div>
                    <p className="font-bold text-amber-700 dark:text-amber-300">
                      {formatCurrency(sub.amount * sub.count)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-amber-200 dark:border-amber-800 flex justify-between">
                <p className="font-medium text-amber-900 dark:text-amber-300">Total Subscription Cost</p>
                <p className="font-bold text-amber-900 dark:text-amber-300">{formatCurrency(totalSubscriptionCost)}</p>
              </div>
            </>
          ) : (
            <p className="text-slate-600 dark:text-slate-300">
              No recurring subscriptions detected in your transactions.
            </p>
          )}
        </motion.div>
      </CardContent>
    </Card>
  )
}

