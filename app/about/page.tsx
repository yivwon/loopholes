"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowLeft, Code, Github, Heart, LineChart, Shield, User } from 'lucide-react'
import Link from "next/link"
import { BackgroundAnimation } from "@/components/background-animation"

export default function AboutPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

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

        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={item} className="mb-4">
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-sm font-medium mb-5">
              About LoopHoles
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6"
          >
            Finding the <span className="text-emerald-600 dark:text-emerald-400">loopholes</span> in your finances
          </motion.h1>

          <motion.div variants={item} className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p className="lead text-xl text-slate-600 dark:text-slate-300">
              LoopHoles is a powerful financial analysis tool designed to help you understand your spending habits, 
              identify areas for improvement, and make smarter financial decisions.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">Our Mission</h2>
            <p>
              We believe that financial clarity shouldn't be complicated. Our mission is to provide a simple, 
              intuitive tool that gives you insights into your spending patterns without requiring financial expertise.
              By visualizing your transaction data and providing AI-powered recommendations, LoopHoles helps you 
              discover the "loopholes" in your budget that might be draining your finances.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">How It Works</h2>
            <p>
              LoopHoles works by analyzing your bank statements and transaction history. Simply upload a CSV or JSON 
              file from your bank, and our intelligent algorithms will categorize your transactions, identify patterns, 
              and provide personalized insights. The entire process happens in your browser, ensuring your financial 
              data remains private and secure.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">Privacy First</h2>
            <p>
              We take your privacy seriously. LoopHoles processes all your financial data directly in your browser, 
              which means your sensitive information never leaves your device. We don't store your transaction data 
              on our servers, and we don't share it with third parties. Your financial information belongs to you, 
              and we believe it should stay that way.
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-12"
          >
            <div className="flex items-center mb-6">
              {/* <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full mr-4">
                <User className="h-6 w-6 text-emerald-600 dark:text-emerald-400" /> */}
              {/* </div> */}
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Interested in LoopHoles?</h2>
            </div>

            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Hi Loop Financial! My name is Ivy & I created LoopHoles to solve my own 
              budgeting challenges. After struggling to make sense of my spending habits using traditional budgeting 
              tools, I decided to build something that would provide clear, actionable insights without the complexity.
            </p>

            <p className="text-slate-600 dark:text-slate-300 mb-4">
              With a background in both software development and personal finance, I've combined my skills to create 
              a tool that makes financial analysis accessible to everyone. LoopHoles is the result of countless hours 
              of development, testing, and refinement based on user feedback (from friends... 😊). 
            </p>

            <p className="text-slate-600 dark:text-slate-300">
              If LoopHoles is something that interests you, feel free to schedule a 2nd interview... 😉
            </p>

            <div className="flex flex-wrap gap-4 mt-6">
            <Link href="https://github.com/yivwon/loopholes" target="_blank" passHref>
                <Button variant="outline" className="gap-2">
                    <Code className="h-4 w-4" />
                    Source Code
                </Button>
            </Link>
            <Link href="https://github.com/yivwon" target="_blank" passHref>
              <Button variant="outline" className="gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/ivyhcho/" target="_blank" passHref>
              <Button variant="outline" className="gap-2">
                <Heart className="h-4 w-4" />
                LinkedIn
              </Button>
            </Link>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            className="text-center"
          >
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Ready to get started?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2">
                  Try LoopHoles Now
                </Button>
              </Link>
              <Link href="/features">
                <Button variant="outline" className="px-6 py-2">
                  Explore Features
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
