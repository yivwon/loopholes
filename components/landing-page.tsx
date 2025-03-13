"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, BarChart3, Search, Shield, Sparkles, TrendingUp, Upload } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { BackgroundAnimation } from "@/components/background-animation"
import { SiteHeader } from "@/components/site-header"


interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const staggerFeatures = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const featureItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const testimonials = [
    {
      quote:
        "LoopHoles helped me save over $300 per month by identifying subscription services I forgot I was paying for!",
        author: "Sarah S.",
        role: "Chief of Staff",
    },
    {
      quote:
        "The AI recommendations were spot-on. I never realized how much I was spending on dining out until LoopHoles visualized it for me.",
        author: "Arnav T.",
        role: "Software Engineering Intern",
    },
    {
      quote:
        "As someone who struggles with budgeting, this tool has been a game-changer. The interface is beautiful and the insights are invaluable.",
        author: "Arjun P.",
        role: "Product Lead",
    },
  ]

  const features = [
    {
      icon: <Upload className="h-6 w-6 text-emerald-500" />,
      title: "Easy Upload",
      description: "Drag and drop your bank statements in CSV or JSON format",
      color: "bg-emerald-100 dark:bg-emerald-900/30",
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-blue-500" />,
      title: "Visual Insights",
      description: "See your spending patterns with beautiful interactive charts",
      color: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      icon: <Search className="h-6 w-6 text-purple-500" />,
      title: "Smart Categorization",
      description: "AI automatically categorizes your transactions for better analysis",
      color: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-amber-500" />,
      title: "AI Recommendations",
      description: "Get personalized advice to optimize your spending habits",
      color: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-rose-500" />,
      title: "Track Progress",
      description: "Monitor your financial improvement over time with trend analysis",
      color: "bg-rose-100 dark:bg-rose-900/30",
    },
    {
      icon: <Shield className="h-6 w-6 text-indigo-500" />,
      title: "Secure & Private",
      description: "Your financial data never leaves your browser for maximum privacy",
      color: "bg-indigo-100 dark:bg-indigo-900/30",
    },
  ]

  return (
    <div className="bg-gradient-to-b from-emerald-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-screen">
      <SiteHeader onGetStarted={onGetStarted} />
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative overflow-hidden pt-12 md:pt-24 pb-16 md:pb-24"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1), transparent 70%)`,
        }}
      >
       {/* Animated background elements */}
<div className="absolute inset-0 overflow-hidden">
<BackgroundAnimation count={15} />
</div>


        <div className="container mx-auto px-4 relative z-10">
          <motion.div variants={container} initial="hidden" animate="show" className="text-center max-w-4xl mx-auto">
            <motion.div variants={item} className="mb-4">
              <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-sm font-medium mb-5">
                Take control of your finances
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
            >
              Find the <span className="text-emerald-600 dark:text-emerald-400">loopholes</span> in your spending habits
            </motion.h1>

            <motion.p variants={item} className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Upload your bank statement and let our AI analyze your spending patterns to help you save money and make
              smarter financial decisions.
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium px-8 py-6 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 text-lg"
              >
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="py-20 bg-white dark:bg-slate-900"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Powerful Features to Transform Your Finances
            </motion.h2>
            <motion.p variants={item} className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              LoopHoles combines beautiful visualizations with AI-powered insights to help you make better financial
              decisions.
            </motion.p>
          </div>

          <motion.div variants={staggerFeatures} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={featureItem}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className={cn("rounded-full w-12 h-12 flex items-center justify-center mb-4", feature.color)}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="py-20 bg-slate-50 dark:bg-slate-950"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              How LoopHoles Works
            </motion.h2>
            <motion.p variants={item} className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Three simple steps to financial clarity
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
            {/* Connecting lines - positioned absolutely */}
            <div
              className="hidden md:block absolute top-10 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500"
              style={{ zIndex: 0 }}
            />
            <div
              className="hidden md:block absolute top-10 left-2/3 w-1/3 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
              style={{ zIndex: 0 }}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center relative z-10"
            >
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">1. Upload Statement</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Securely upload your bank statement in CSV or JSON format
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center relative z-10"
            >
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">2. Analyze Spending</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Our AI categorizes transactions and visualizes your spending patterns
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center relative z-10"
            >
              <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">3. Get Insights</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Receive personalized recommendations to optimize your finances
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="py-20 bg-white dark:bg-slate-900"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              What Our Users Say
            </motion.h2>
            <motion.p variants={item} className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Join thousands who have transformed their financial habits
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl shadow-sm"
              >
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{testimonial.author}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="py-20 bg-gradient-to-br from-emerald-500 to-emerald-700 dark:from-emerald-900 dark:to-emerald-700"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find Your Financial Loopholes?
          </motion.h2>
          <motion.p variants={item} className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Start your journey to financial clarity today. No credit card required.
          </motion.p>

          <motion.div
            variants={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="inline-block"
          >
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-white text-emerald-700 hover:bg-emerald-50 font-medium px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
            >
              Get Started for Free
              <motion.div
                animate={isHovered ? { x: [0, 5, 0] } : {}}
                transition={{ repeat: isHovered ? Number.POSITIVE_INFINITY : 0, duration: 1 }}
              >
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-white">
                <span className="text-emerald-400">Loop</span>Holes
              </h2>
              <p className="mt-2">Finding the loopholes in your spending habits</p>
            </div>

            <div className="flex space-x-6">
              <Link href="/about" className="hover:text-emerald-400 transition-colors">
                About
              </Link>
              <Link href="/features" className="hover:text-emerald-400 transition-colors">
                Features
              </Link>
              <Link href="https://www.linkedin.com/in/ivyhcho/" target="_blank" className="hover:text-emerald-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>© made with ❤️ by ivy cho</p>
            <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="https://github.com/yivwon/loopholes/" target="_blank" className="hover:text-emerald-400 transition-colors">
                Source Code
              </a>
              <a href="https://github.com/yivwon" target="_blank" className="hover:text-emerald-400 transition-colors">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/ivyhcho/" target="_blank" className="hover:text-emerald-400 transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

