"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { parseTransactions } from "@/lib/parse-transactions"
import { categorizeTransactions } from "@/lib/categorize-transactions"
import type { Transaction } from "@/lib/types"
import { Upload, FileText, AlertCircle, FileUp, CheckCircle2 } from "lucide-react"
import { useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

// Add sample data option
import { sampleTransactions } from "@/lib/sample-data"

interface FileUploadProps {
  setTransactions: (transactions: Transaction[]) => void
  setIsAnalyzing: (isAnalyzing: boolean) => void
}

export function FileUpload({ setTransactions, setIsAnalyzing }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const processFile = async (file: File) => {
    setError(null)
    setIsLoading(true)
    setIsAnalyzing(true)
    setSelectedFile(file)

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + Math.random() * 15
      })
    }, 200)

    try {
      // Check file type and extension
      const fileExtension = file.name.split(".").pop()?.toLowerCase()
      const isCSV = fileExtension === "csv" || file.type === "text/csv"
      const isJSON = fileExtension === "json" || file.type === "application/json"

      if (!isCSV && !isJSON) {
        throw new Error("Please upload a CSV or JSON file. Supported file extensions: .csv, .json")
      }

      // Read file
      const text = await file.text()

      if (text.trim() === "") {
        throw new Error("The file is empty. Please upload a file with transaction data.")
      }

      console.log("File content sample:", text.substring(0, 200)) // Debug log

      // Parse transactions
      const parsedTransactions = await parseTransactions(text, isCSV)

      if (parsedTransactions.length === 0) {
        throw new Error("No valid transactions found in the file. Please check the file format.")
      }

      console.log("Parsed transactions:", parsedTransactions.length) // Debug log

      // Categorize transactions
      const categorizedTransactions = await categorizeTransactions(parsedTransactions)

      // Complete the progress bar
      setUploadProgress(100)

      // Short delay to show the completed progress
      setTimeout(() => {
        // Update state
        setTransactions(categorizedTransactions)
        setIsLoading(false)
        setIsAnalyzing(false)
        clearInterval(progressInterval)
      }, 500)
    } catch (err) {
      console.error("File processing error:", err) // Debug log
      setError(err instanceof Error ? err.message : "Failed to process file")
      setIsLoading(false)
      setIsAnalyzing(false)
      clearInterval(progressInterval)
      setUploadProgress(0)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0])
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  // Add this function to the FileUpload component
  const loadSampleData = () => {
    setIsLoading(true)
    setIsAnalyzing(true)

    // Simulate upload progress
    let progress = 0
    const progressInterval = setInterval(() => {
      progress += 10
      setUploadProgress(Math.min(progress, 95))

      if (progress >= 95) {
        clearInterval(progressInterval)
      }
    }, 100)

    // Simulate processing delay
    setTimeout(() => {
      setUploadProgress(100)

      setTimeout(() => {
        setTransactions(sampleTransactions)
        setIsLoading(false)
        setIsAnalyzing(false)
      }, 500)
    }, 1000)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card
        className={cn(
          "p-8 border-2 border-dashed transition-all duration-300 relative overflow-hidden",
          isDragging
            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 shadow-lg"
            : "border-slate-300 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-md",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-emerald-100/50 dark:to-emerald-900/10 pointer-events-none" />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center text-center space-y-6 relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full"
            >
              {uploadProgress === 100 ? (
                <CheckCircle2 className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <FileUp className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
              )}
            </motion.div>

            <div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                {uploadProgress === 100 ? "Analysis Complete!" : "Processing Your Statement"}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{selectedFile?.name}</p>
            </div>

            {/* Progress bar */}
            <div className="w-full max-w-md bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
              <motion.div
                className="bg-emerald-500 h-2.5 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${uploadProgress}%` }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
              />
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              {uploadProgress === 100
                ? "Preparing your financial insights..."
                : "Analyzing transactions and categorizing expenses..."}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center space-y-6 relative z-10">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="p-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full"
            >
              <Upload className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
            </motion.div>

            <div>
              <h3 className="text-xl font-medium text-slate-900 dark:text-white">Upload your bank statement</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-md">
                Drag and drop your CSV or JSON file, or click to browse. Your data stays private and never leaves your
                browser.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
              <FileText className="h-4 w-4" />
              <span>CSV or JSON files only</span>
            </div>

            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".csv,.json" className="hidden" />

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={handleButtonClick}
                disabled={isLoading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                Select File
              </Button>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-500 mt-2 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg"
              >
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </motion.div>
            )}
          </div>
        )}
      </Card>

      {/* Example files section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-center"
      >
        <p className="text-slate-500 dark:text-slate-400 mb-2">Not sure where to start?</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            variant="outline"
            className="text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
            onClick={loadSampleData}
          >
            Try Sample Data
          </Button>
          <Button variant="link" className="text-emerald-600 dark:text-emerald-400">
            Download Sample CSV
          </Button>
          <Button variant="link" className="text-emerald-600 dark:text-emerald-400">
            Download Sample JSON
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

