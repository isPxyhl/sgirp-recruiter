import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-5xl font-bold mb-8 glow-text">Recruiter Bot</h1>
      <p className="text-xl mb-8 text-white/80">Elegant, efficient.</p>
      <Link
        href="/api/auth/discord"
        className="bg-[#6064f4] text-white hover:bg-[#6064f4]/90 transition-all duration-300 font-bold py-3 px-6 rounded-[15px_15px]"
      >
        Sign in with Discord
      </Link>
    </div>
  )
}

