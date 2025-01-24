import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Discord Bot Website",
  description: "Authorize and manage your Discord bot",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-red-500`}>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}

