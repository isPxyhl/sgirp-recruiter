import { NextResponse } from "next/server"

// This is a simple in-memory store. In a real application, you'd use a database.
const userStore: { [discordID: string]: string } = {}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { discordID, robloxID } = body

    // Validate the input
    if (!discordID || !robloxID) {
      return NextResponse.json({ error: "Missing discordID or robloxID" }, { status: 400 })
    }

    // Store the mapping
    userStore[discordID] = robloxID

    return NextResponse.json({ message: "User data received successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const discordID = params.id

  if (discordID in userStore) {
    return NextResponse.json({ robloxID: userStore[discordID] }, { status: 200 })
  } else {
    return NextResponse.json({ error: "Discord ID not found" }, { status: 404 })
  }
}

