import "./globals.css"
import { Inter } from "next/font/google"
import NavBar from "@/components/NavBar"
import CustomHead from "@/components/CustomHead"
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Recruiter Bot",
  description: "Simple way to manage your SGIRP faction's discord server.",
  icons : {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className} bg-black text-red-500`}>
        
        <NavBar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}

