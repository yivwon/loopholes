"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Brain,
  FileUp,
  LineChart,
  Lock,
  PieChart,
  Search,
  Shield,
  Sparkles,
  TrendingUp,
  Upload,
} from "lucide-react"
import Link from "next/link"
import { BackgroundAnimation } from "@/components/background-animation"

export default function FeaturesPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  const features = [
    {
      icon: <Upload className="h-6 w-6 text-emerald-500" />,
      title: "Easy File Upload",
      description:
        "Upload your bank statements in CSV or JSON format with a simple drag-and-drop interface. LoopHoles supports most major bank export formats.",
      color: "bg-emerald-100 dark:bg-emerald-900/30",
    },
    {
      icon: <Search className="h-6 w-6 text-blue-500" />,
      title: "Smart Transaction Categorization",
      description:
        "Our AI automatically categorizes your transactions into meaningful groups like Dining, Shopping, Transportation, and more for better analysis.",
      color: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      icon: <PieChart className="h-6 w-6 text-purple-500" />,
      title: "Visual Spending Insights",
      description:
        "See your spending patterns with beautiful interactive charts and graphs that make it easy to understand where your money is going.",
      color: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-rose-500" />,
      title: "Spending Habits Analysis",
      description:
        "Identify your most frequent merchants, largest transactions, most expensive days, and top spending categories at a glance.",
      color: "bg-rose-100 dark:bg-rose-900/30",
    },
    {
      icon: <Brain className="h-6 w-6 text-amber-500" />,
      title: "AI Financial Advice",
      description:
        "Receive personalized recommendations based on your spending patterns to help you save money and improve your financial health.",
      color: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      icon: <Shield className="h-6 w-6 text-indigo-500" />,
      title: "Privacy & Security",
      description:
        "Your financial data never leaves your browser. All processing happens locally on your device, ensuring maximum privacy and security.",
      color: "bg-indigo-100 dark:bg-indigo-900/30",
    },
  ]

  const advancedFeatures = [
    {
      title: "Subscription Detection",
      description:
        "Automatically identify recurring payments and subscriptions that might be draining your finances without you noticing.",
      icon: <LineChart className="h-5 w-5 text-emerald-500" />,
    },
    {
      title: "Monthly Spending Trends",
      description: "Track how your spending changes over time with month-to-month comparisons and trend analysis.",
      icon: <BarChart3 className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Transaction Search & Filtering",
      description: "Easily find specific transactions with powerful search and filtering capabilities.",
      icon: <Search className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "Sample Data Option",
      description: "Not ready to upload your own data? Try the sample data feature to see how LoopHoles works.",
      icon: <FileUp className="h-5 w-5 text-amber-500" />,
    },
    {
      title: "Browser-Based Processing",
      description:
        "All data processing happens in your browser, so your sensitive financial information never leaves your device.",
      icon: <Lock className="h-5 w-5 text-rose-500" />,
    },
    {
      title: "Personalized Insights",
      description: "Get tailored financial insights based on your unique spending patterns and habits.",
      icon: <Sparkles className="h-5 w-5 text-indigo-500" />,
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <BackgroundAnimation count={8} />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <Link href="/">
          <Button variant="ghost" className="mb-8 group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Button>
        </Link>

        <motion.div initial="hidden" animate="show" variants={container} className="max-w-5xl mx-auto">
          <motion.div variants={item} className="mb-4">
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-sm font-medium mb-5">
              Features & Capabilities
            </span>
          </motion.div>

          <motion.h1 variants={item} className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Powerful tools for your <span className="text-emerald-600 dark:text-emerald-400">financial clarity</span>
          </motion.h1>

          <motion.p variants={item} className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl">
            LoopHoles combines beautiful visualizations with AI-powered insights to help you understand your spending
            habits and make better financial decisions.
          </motion.p>

          <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className={`${feature.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={item}>
            <Card className="border-none shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 mb-16">
              <CardHeader>
                <CardTitle className="text-2xl">Advanced Features</CardTitle>
                <CardDescription>Discover more powerful capabilities of LoopHoles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {advancedFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-full mr-3 mt-0.5">{feature.icon}</div>
                      <div>
                        <h3 className="font-medium text-slate-900 dark:text-white mb-1">{feature.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-emerald-600 dark:bg-emerald-700 text-white rounded-xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Ready to take control of your finances?</h2>
            <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
              Start using LoopHoles today and discover the insights that will help you make smarter financial decisions.
            </p>
            <Link href="/">
              <Button className="bg-white text-emerald-700 hover:bg-emerald-50 px-6 py-2 group">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}

