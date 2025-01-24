import { cookies } from "next/headers"
import Image from "next/image"

export default function Dashboard() {
  const cookieStore = cookies()
  const userDataCookie = cookieStore.get("discord_user")
  const userData = userDataCookie ? JSON.parse(userDataCookie.value) : null

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-8 text-red-500">Not Authenticated</h1>
        <p className="text-xl mb-8 text-red-400">Please sign in to view your dashboard.</p>
      </div>
    )
  }

  const avatarUrl = userData.avatar
    ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
    : "https://cdn.discordapp.com/embed/avatars/0.png"

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8 text-red-500">Dashboard</h1>
      <div className="bg-gray-900 shadow-md rounded-lg p-8 mb-8">
        <div className="flex items-center mb-4">
          <Image
            src={avatarUrl || "/placeholder.svg"}
            alt={`${userData.username}'s avatar`}
            width={64}
            height={64}
            className="rounded-full mr-4"
          />
          <h2 className="text-2xl font-semibold text-red-400">{userData.username}</h2>
        </div>
        <p className="text-red-300">User ID: {userData.id}</p>
      </div>
      {/* Add more dashboard content here */}
    </div>
  )
}

