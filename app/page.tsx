import Link from "next/link"
import { cookies } from "next/headers"

export default function Home() {
  const cookieStore = cookies()
  const userDataCookie = cookieStore.get("discord_user")
  const isLoggedIn = !!userDataCookie

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8 text-red-500">Welcome to Our Discord Bot</h1>
      <p className="text-xl mb-8 text-red-400">Enhance your Discord server with our amazing bot!</p>
      {isLoggedIn ? (
        <Link href="/dashboard" className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">
          Go to Dashboard
        </Link>
      ) : (
        <Link href="/api/auth/discord" className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">
          Add to Discord
        </Link>
      )}
    </div>
  )
}

