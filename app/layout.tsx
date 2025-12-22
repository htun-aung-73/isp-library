import type React from "react"
import type { Metadata } from "next"
import { Inter, Manrope, Roboto_Mono } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/header"

import { getSession } from "@/lib/baserow/auth"
import ReduxProvider from "@/lib/redux/provider"

const _inter = Inter({ subsets: ["latin"] })
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});
const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Library Hub",
  description: "Search books, borrow titles, and track your reading with our modern library management system.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getSession()

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body className="font-manrope antialiased bg-background text-foreground">
        {/* user={session} is to use session data in provider for next login; so the user dont have to login again after refresh*/}
        <ReduxProvider user={session}>
          <Header />
          <main>{children}</main>
          <Analytics />
          <Toaster position="top-right" />
        </ReduxProvider>
      </body>
    </html>
  )
}
