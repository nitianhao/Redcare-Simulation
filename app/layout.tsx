import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Redcare × Search Simulation Lab',
  description: '5 synthetic pharmacy personas with full behavioral depth — built for Redcare / shop-apotheke.com',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  )
}
