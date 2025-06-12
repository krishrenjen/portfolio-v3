import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import './globals.css'
import StarrySky from '@/components/Visual/StarrySky'
import Navbar from '@/components/Navbar/Navbar'

const inter = Work_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Krish Renjen | Portfolio',
  description: 'Portfolio for Krish Renjen, a web, software, and Java developer.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <>
        <StarrySky />
        <Navbar />
        {children}
        </>
      </body>
    </html>
  )
}