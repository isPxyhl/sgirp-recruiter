import Link from "next/link"
import { cookies } from "next/headers"
import Image from "next/image"

export default function NavBar() {
  const cookieStore = cookies()
  const userDataCookie = cookieStore.get("discord_user")
  const userData = userDataCookie ? JSON.parse(userDataCookie.value) : null

  return (
    <nav className="bg-black border-b border-white/10 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled1_20250122035540-D0L3IWndYxbzVVHCAI8KMsSTSKR73b.png"
            alt="Logo"
            width={100}
            height={40}
            className="h-8 w-auto"
          />
          Recruiter
        </Link>
        <div className="space-x-8">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/dashboard" className="nav-link">
            Dashboard
          </Link>
          {userData ? (
            <span className="glow-text">{userData.username}</span>
          ) : (
            <Link href="/api/auth/discord" className="nav-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

