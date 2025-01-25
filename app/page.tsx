import { cookies } from "next/headers"
import Link from "next/link"
import Image from "next/image"
export default function Home() {
  const cookieStore = cookies()
  const userDataCookie = cookieStore.get("discord_user")
  const userData = userDataCookie ? JSON.parse(userDataCookie.value) : null
  if (!userData) {
    return (
    
      <div className="flex flex-col items-center justify-content min-h-screen py-2">
        <h1 className="text-5xl font-bold mb-8 glow-text">Recruiter Bot</h1>
        <p className="text-xl mb-8 text-white/80">Elegant, efficient.</p>
        <div className="flex justify-between space-x-2">
          <Link
            href="/api/auth/discord"
            className="flex items-center bg-white text-black hover:bg-black/90 transition-all duration-300 font-bold py-3 px-6 rounded-[15px_15px]"
          >
            <Image 
              src="https://media.discordapp.net/attachments/1327708896822825092/1332564891990495377/download_3.png?ex=6795b744&is=679465c4&hm=57f9bc56dfa91c0cf7807977e772767e5a40d66014a79d5eee9ca27f1ebe4a28&"
              alt="Discord Logo"
              width={32}
              height={32}
              className="rounded-full ring-1 ring-white/20"
            /><span>Sign in with Discord</span>
          </Link>
        </div>
      </div>
    )
  } else {
    return (
    
      <div className="flex flex-col items-center justify-content min-h-screen py-2">
        <h1 className="text-5xl font-bold mb-8 glow-text">Recruiter Bot</h1>
        <p className="text-xl mb-8 text-white/80">Elegant, efficient.</p>
        <div className="flex justify-between space-x-2">
          <Link
            href="/dashboard"
            className="flex items-center bg-white text-black hover:bg-black/90 transition-all duration-300 font-bold py-3 px-6 rounded-[15px_15px]"
          ><span>Dashboard</span>
          </Link>
        </div>
      </div>
    )

  }

}
