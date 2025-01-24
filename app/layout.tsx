import "./globals.css"
import { Inter } from "next/font/google"
import NavBar from "@/components/NavBar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Recruiter Bot",
  description: "Simple way to manage your SGIRP faction's discord server.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="https://media.discordapp.net/attachments/1327708896822825092/1332316200633634910/favicon.ico.png?ex=6794cfa7&is=67937e27&hm=6dd6f743b82536b408505eebb695fd41fdfd299b2bc6de17f1d7959078baf7ee&">
      </head>
      <body className={`${inter.className} bg-black text-red-500`}>
        <NavBar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}

