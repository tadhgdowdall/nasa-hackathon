import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BioCosmos Dashboard',
  description: 'AI-powered NASA bioscience publications explorer',
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
