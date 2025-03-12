"use client"

import { FileUpload } from "@/components/file-upload"
import { SpendingInsights } from "@/components/spending-insights"
import { TransactionTable } from "@/components/transaction-table"
import { LandingPage } from "@/components/landing-page"
import { useState } from "react"
import type { Transaction } from "@/lib/types"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { BackgroundAnimation } from "@/components/background-animation"

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showApp, setShowApp] = useState(false)

  if (!showApp) {
    return <LandingPage onGetStarted={() => setShowApp(true)} />
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <BackgroundAnimation count={10} size="large" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            <span className="text-emerald-600 dark:text-emerald-400">Loop</span>Holes
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg">Finding the loopholes in your spending habits</p>
        </motion.header>

        {transactions.length === 0 ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <FileUpload setTransactions={setTransactions} setIsAnalyzing={setIsAnalyzing} />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <Button
                onClick={() => setShowApp(false)}
                variant="outline"
                className="text-slate-600 dark:text-slate-300"
              >
                Back to Home
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <SpendingInsights transactions={transactions} />
            <TransactionTable transactions={transactions} />

            <div className="flex justify-center gap-4 mt-8">
              <Button onClick={() => setTransactions([])} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Upload Another Statement
              </Button>

              <Button
                onClick={() => setShowApp(false)}
                variant="outline"
                className="text-slate-600 dark:text-slate-300"
              >
                Back to Home
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.main>
  )
}

