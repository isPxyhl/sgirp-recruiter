import { NextResponse } from "next/server"

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`

export async function GET() {
  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID!,
    redirect_uri: REDIRECT_URI,
    permissions: 169046738569957,
    integration_type: 0,
    scope: "bot"
  })

  return NextResponse.redirect(`https://discord.com/api/oauth2/authorize?${params.toString()}`)
}



