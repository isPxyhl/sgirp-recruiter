import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/discord/callback`

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")

  if (code) {
    try {
      const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: DISCORD_CLIENT_ID!,
          client_secret: DISCORD_CLIENT_SECRET!,
          grant_type: "authorization_code",
          code,
          redirect_uri: REDIRECT_URI,
        }),
      })

      const tokenData = await tokenResponse.json()

      if (tokenData.access_token) {
        // Fetch user data
        const userResponse = await fetch("https://discord.com/api/users/@me", {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
          },
        })

        const userData = await userResponse.json()

        // Store user data in a cookie
        cookies().set(
          "discord_user",
          JSON.stringify({
            id: userData.id,
            username: userData.username,
            avatar: userData.avatar,
          }),
          { httpOnly: true, secure: process.env.NODE_ENV === "production" },
        )

        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`)
      }
    } catch (error) {
      console.error("Error during Discord authentication:", error)
    }
  }

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}?error=auth_failed`)
}

