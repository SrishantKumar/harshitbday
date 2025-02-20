import type React from "react"
import "./globals.css"
import { Inter, Pacifico } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const pacifico = Pacifico({ weight: "400", subsets: ["latin"], variable: "--font-pacifico" })

export const metadata = {
  title: "Happy Birthday Harshit!",
  description: "A birthday surprise for Harshit Benke",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${pacifico.variable} font-sans`}>{children}</body>
    </html>
  )
}



import './globals.css'