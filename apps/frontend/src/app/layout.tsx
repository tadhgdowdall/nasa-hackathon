import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BioCosmos Dashboard | NASA Space Apps Challenge 2025',
  description: 'AI-powered NASA bioscience publications explorer - Unlock 608 bioscience publications for Moon and Mars missions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
