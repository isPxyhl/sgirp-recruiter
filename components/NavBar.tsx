import Link from "next/link"
import { cookies } from "next/headers"

export default function NavBar() {
  const cookieStore = cookies()
  const userDataCookie = cookieStore.get("discord_user")
  const userData = userDataCookie ? JSON.parse(userDataCookie.value) : null

  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-red-500 text-xl font-bold">
          Discord Bot
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-red-400 hover:text-red-300">
            Home
          </Link>
          <Link href="/dashboard" className="text-red-400 hover:text-red-300">
            Dashboard
          </Link>
          {userData ? (
            <span className="text-red-400">{userData.username}</span>
          ) : (
            <Link href="/api/auth/discord" className="text-red-400 hover:text-red-300">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

