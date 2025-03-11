"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Transaction } from "@/lib/types"
import { useMemo } from "react"
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency } from "@/lib/utils"
import { AIFinancialAdvice } from "@/components/ai-financial-advice"
import { motion } from "framer-motion"
// Add the BiggestSpendingHabits component to the tabs
import { BiggestSpendingHabits } from "@/components/biggest-spending-habits"

interface SpendingInsightsProps {
  transactions: Transaction[]
}

export function SpendingInsights({ transactions }: SpendingInsightsProps) {
  const categoryData = useMemo(() => {
    const categoryMap = new Map<string, number>()

    transactions.forEach((transaction) => {
      if (transaction.amount < 0) {
        // Only count expenses (negative amounts)
        const category = transaction.category || "Uncategorized"
        const currentAmount = categoryMap.get(category) || 0
        categoryMap.set(category, currentAmount + Math.abs(transaction.amount))
      }
    })

    return Array.from(categoryMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }, [transactions])

  const monthlyData = useMemo(() => {
    const monthMap = new Map<string, number>()

    transactions.forEach((transaction) => {
      if (transaction.amount < 0) {
        // Only count expenses
        const date = new Date(transaction.date)
        const monthYear = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`
        const currentAmount = monthMap.get(monthYear) || 0
        monthMap.set(monthYear, currentAmount + Math.abs(transaction.amount))
      }
    })

    return Array.from(monthMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => {
        const dateA = new Date(a.name)
        const dateB = new Date(b.name)
        return dateA.getTime() - dateB.getTime()
      })
  }, [transactions])

  const totalSpent = useMemo(() => {
    return transactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0)
  }, [transactions])

  const totalIncome = useMemo(() => {
    return transactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)
  }, [transactions])

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
    "#FFC658",
    "#8DD1E1",
    "#A4DE6C",
    "#D0ED57",
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <Card className="border-none shadow-md bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Transactions</CardTitle>
              <CardDescription>Number of records analyzed</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{transactions.length}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <Card className="border-none shadow-md bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Spent</CardTitle>
              <CardDescription>Sum of all expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-500">{formatCurrency(totalSpent)}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <Card className="border-none shadow-md bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Income</CardTitle>
              <CardDescription>Sum of all deposits</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-500">{formatCurrency(totalIncome)}</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
        <Tabs defaultValue="categories" className="w-full">
          <TabsList className="mb-4 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <TabsTrigger
              value="categories"
              className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
            >
              Categories
            </TabsTrigger>
            <TabsTrigger
              value="monthly"
              className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
            >
              Monthly Trends
            </TabsTrigger>
            <TabsTrigger
              value="habits"
              className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
            >
              Spending Habits
            </TabsTrigger>
            <TabsTrigger
              value="advice"
              className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
            >
              AI Advice
            </TabsTrigger>
          </TabsList>

          <TabsContent value="categories">
            <Card className="border-none shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
                <CardDescription>See where your money is going</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: number) => formatCurrency(value)}
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            border: "none",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryData}>
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => `$${value}`} />
                        <Tooltip
                          formatter={(value: number) => formatCurrency(value)}
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            border: "none",
                          }}
                        />
                        <Bar dataKey="value" fill="#0088FE" radius={[4, 4, 0, 0]}>
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl"
                >
                  <h4 className="font-medium mb-3 text-slate-900 dark:text-white">Top Spending Categories</h4>
                  <div className="space-y-3">
                    {categoryData.slice(0, 5).map((category, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 * index + 0.5 }}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-bold">{formatCurrency(category.value)}</span>
                          <div className="ml-2 h-2 bg-slate-200 dark:bg-slate-700 rounded-full w-20">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(category.value / categoryData[0].value) * 100}%` }}
                              transition={{ delay: 0.1 * index + 0.7, duration: 0.5 }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly">
            <Card className="border-none shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
              <CardHeader>
                <CardTitle>Monthly Spending Trends</CardTitle>
                <CardDescription>Track how your spending changes over time</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="h-80"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `$${value}`} />
                      <Tooltip
                        formatter={(value: number) => formatCurrency(value)}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          border: "none",
                        }}
                      />
                      <Bar dataKey="value" fill="#00C49F" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl"
                >
                  <h4 className="font-medium mb-2 text-slate-900 dark:text-white">Monthly Spending Summary</h4>
                  <p className="text-slate-600 dark:text-slate-300">
                    {monthlyData.length > 1
                      ? `Your highest spending month was ${
                          monthlyData.reduce((max, month) => (month.value > max.value ? month : max)).name
                        } with ${formatCurrency(
                          monthlyData.reduce((max, month) => (month.value > max.value ? month : max)).value,
                        )}.`
                      : "Upload more statements to see your spending trends over time."}
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="habits">
            <BiggestSpendingHabits transactions={transactions} />
          </TabsContent>

          <TabsContent value="advice">
            <AIFinancialAdvice transactions={transactions} categoryData={categoryData} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}

