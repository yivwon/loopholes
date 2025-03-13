"use client"

import type React from "react"

import { Sheet, SheetContent } from "@/components/ui/sheet"

interface MenuProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Menu({ open, onClose, children }: MenuProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
        {children}
      </SheetContent>
    </Sheet>
  )
}

