import { cookies } from "next/headers"
import Image from "next/image"

export default function Dashboard() {
  const cookieStore = cookies()
  const userDataCookie = cookieStore.get("discord_user")
  const userData = userDataCookie ? JSON.parse(userDataCookie.value) : null

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-8 glow-text">Not Authenticated</h1>
        <p className="text-xl mb-8 text-white/80">Please sign in to view your dashboard.</p>
      </div>
    )
  }

  const avatarUrl = userData.avatar
    ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
    : "https://cdn.discordapp.com/embed/avatars/0.png"

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8 glow-text">Dashboard</h1>
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl rounded-lg p-8 mb-8">
        <div className="flex items-center mb-4">
          <Image
            src={avatarUrl || "/placeholder.svg"}
            alt={`${userData.username}'s avatar`}
            width={64}
            height={64}
            className="rounded-full mr-4 ring-2 ring-white/20"
          />
          <h2 className="text-2xl font-semibold glow-text">{userData.username}</h2>
        </div>
        <p className="text-white/60">User ID: {userData.id}</p>
      </div>
    </div>
  )
}

