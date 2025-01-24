import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-5xl font-bold mb-8 glow-text">Welcome to Our Discord Bot</h1>
      <p className="text-xl mb-8 text-white/80">Enhance your Discord server with our amazing bot!</p>
      <Link
        href="/api/auth/discord"
        className="bg-white text-black hover:bg-white/90 transition-all duration-300 font-bold py-3 px-6 rounded-lg"
      >
        Add to Discord
      </Link>
    </div>
  )
}

