"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Transaction } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import { Search } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

interface TransactionTableProps {
  transactions: Transaction[]
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTransactions = transactions.filter((transaction) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      transaction.description.toLowerCase().includes(searchLower) ||
      transaction.category?.toLowerCase().includes(searchLower) ||
      transaction.amount.toString().includes(searchTerm)
    )
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="border-none shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle>Transaction History</CardTitle>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <Input
                type="text"
                placeholder="Search transactions..."
                className="pl-8 w-full md:w-64 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-emerald-500 focus:border-emerald-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </motion.div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-slate-200 dark:border-slate-700 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-slate-800">
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * (index % 10) }}
                      className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                      <TableCell className="max-w-xs truncate">{transaction.description}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                          {transaction.category || "Uncategorized"}
                        </span>
                      </TableCell>
                      <TableCell
                        className={`text-right font-medium ${transaction.amount < 0 ? "text-red-500" : "text-green-500"}`}
                      >
                        {formatCurrency(transaction.amount)}
                      </TableCell>
                    </motion.tr>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-slate-500 dark:text-slate-400">
                      No transactions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

