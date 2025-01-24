import Link from "next/link"
import { cookies } from "next/headers"

export default function Home() {
  const cookieStore = cookies()
  const userDataCookie = cookieStore.get("discord_user")
  const isLoggedIn = !!userDataCookie

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2" includeFontPadding=false>
      <h1 className="text-4xl font-bold mb-8 text-red-500">Add Recruiter to your server!</h1>
      <p className="text-xl mb-8 text-red-400">The most suitable bot for your Squid Game Infinity Roleplay faction's Discord server!</p>
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

