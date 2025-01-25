import Link from "next/link"
import { cookies } from "next/headers"
import Image from "next/image"

export default function NavBar() {
  const cookieStore = cookies()
  const userDataCookie = cookieStore.get("discord_user")
  const userData = userDataCookie ? JSON.parse(userDataCookie.value) : null

  
  if (userData) {
    const avatarUrl = userData.avatar
      ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
      : "https://cdn.discordapp.com/embed/avatars/0.png" 
  } else {
    const avatarUrl = "/placeholder.svg"
  }
  

  
  return (
    <nav className="bg-black border-b border-white/10 p-4">
      <div className="container mx-auto flex justify-between items-center">
        
        <Link href="/add" className="nav-link font-bold flex items-center space-x-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled1_20250122035540-D0L3IWndYxbzVVHCAI8KMsSTSKR73b.png"
            alt="Logo"
            width={80}
            height={40}
            className="h-8 w-auto rounded-full mr-4 ring-2 ring-white/20"
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
            <Link href="/api/auth/discord" className="glow-text font-bold">
              
              <Image src={avatarUrl}
                alt={`${userData.username}'s avatar`}
                width={64}
                height={64}
                className="rounded-full mr-4 ring-2 ring-white/20"/>{userData.username}
            </Link>
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

