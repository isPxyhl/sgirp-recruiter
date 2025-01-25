import { NextResponse } from "next/server"
import { readStorage, writeStorage } from "../../lib/storage"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { discordID, robloxID } = body

    // Validate the input
    if (!discordID || !robloxID) {
      return NextResponse.json({ error: "Missing discordID or robloxID" }, { status: 400 })
    }

    // Read current storage
    const userStore = await readStorage()

    // Update storage
    userStore[discordID] = robloxID

    // Write updated storage
    await writeStorage(userStore)

    return NextResponse.json({ message: "User data received successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

