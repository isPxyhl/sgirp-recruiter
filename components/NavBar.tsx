import Link from "next/link"
import { cookies } from "next/headers"

export default function NavBar() {
  const cookieStore = cookies()
  const userDataCookie = cookieStore.get("discord_user")
  const userData = userDataCookie ? JSON.parse(userDataCookie.value) : null

  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex items-center">
        <Link href="/" className="text-red-500 text-xl font-bold flex-shrink-0">
          Recruiter
        </Link>
        <div className="flex-grow flex justify-center space-x-8">
          <Link href="/" className="text-red-400 hover:text-red-300">
            Home
          </Link>
          <Link href="/dashboard" className="text-red-400 hover:text-red-300">
            Dashboard
          </Link>
        </div>
        <div className="flex-shrink-0">
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

