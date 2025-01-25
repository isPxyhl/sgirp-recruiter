import "./globals.css"
import { Inter } from "next/font/google"
import NavBar from "@/components/NavBar"
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Recruiter Bot",
  description: "Simple way to manage your SGIRP faction's discord server.",
  image: "https://media.discordapp.net/attachments/1327708896822825092/1332316200633634910/favicon.ico.png?ex=67962127&is=6794cfa7&hm=be80b95b2466bea1f0aee811986c69bbf406597e677ba1fdce699613d2b01292&",
  icons : {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any"
      },
      {
        url: "/favicon.png",
        sizes: "32x32",
        type: "image/png"
      },
      
    ]
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

