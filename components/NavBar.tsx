import Link from "next/link"
import Image from "next/image"
import { cookies } from "next/headers"

export default function NavBar() {
  const cookieStore = cookies()
  const userDataCookie = cookieStore.get("discord_user")
  const userData = userDataCookie ? JSON.parse(userDataCookie.value) : null

  // Properly construct the avatar URL based on user data
  const avatarUrl = userData?.avatar
    ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
    : "/placeholder.svg"

  return (
    <nav className="bg-black border-b border-white/10 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/add" className="flex items-center space-x-2 font-bold">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled1_20250122035540-D0L3IWndYxbzVVHCAI8KMsSTSKR73b.png"
            alt="Logo"
            width={32}
            height={32}
            className="rounded-full ring-1 ring-white/20"
          /> Text Here 
        </Link>
        <div className="space-x-8 flex items-center">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/dashboard" className="nav-link">
            Dashboard
          </Link>
          {userData ? (
            <div className="flex items-center space-x-2">
              <Link href="/api/auth/discord" className="nav-link">
                <Image
                  src={avatarUrl || "/placeholder.svg"}
                  alt={`${userData.username}'s avatar`}
                  width={32}
                  height={32}
                  className="rounded-full ring-1 ring-white/20"
                /><span className="glow-text">{userData.username}</span>
              </Link>
            </div>
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

