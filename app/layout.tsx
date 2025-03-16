import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LoopHoles',
  description: 'created with ❤️ by ivy cho',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
