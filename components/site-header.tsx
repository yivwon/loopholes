"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Menu } from "./ui/menu"
import Link from "next/link"

interface SiteHeaderProps {
  onGetStarted?: () => void
}

export function SiteHeader({ onGetStarted }: SiteHeaderProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="relative z-20">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <a href="/" className="text-slate-900 dark:text-white text-2xl font-bold">
          <span className="text-emerald-600 dark:text-emerald-400">Loop</span>Holes
        </a>
        <div className="hidden md:flex space-x-6">
          <Link
            href="/"
            className="text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            Home
          </Link>
          <Link
            href="/features"
            className="text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            Features
          </Link>
          <Link
            href="/about"
            className="text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            About
          </Link>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={onGetStarted}>
            Get Started
          </Button>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-700 dark:text-slate-200"
        >
          Menu
        </button>
      </nav>
      <Menu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <a href="/about" className="block px-4 py-2 text-white hover:bg-gray-700">
          About
        </a>
        <a href="/contact" className="block px-4 py-2 text-white hover:bg-gray-700">
          Contact
        </a>
        <Button
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          onClick={() => {
            setMobileMenuOpen(false)
            onGetStarted && onGetStarted()
          }}
        >
          Get Started
        </Button>
      </Menu>
    </header>
  )
}

