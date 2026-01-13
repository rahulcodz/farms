import type React from "react"
import type { Metadata } from "next"
import { Inter, Merriweather } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const merriweather = Merriweather({ 
  subsets: ["latin"], 
  weight: ["300", "400", "700"],
  variable: "--font-merriweather" 
})

export const metadata: Metadata = {
  title: "AgroAI - AI-Powered Precision Farming",
  description: "Professional-grade agricultural insights, diagnosis, and treatment plans—now completely free for farmers worldwide.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${merriweather.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
