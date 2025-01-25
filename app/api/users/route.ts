import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { discordID, robloxID } = body

    // Validate the input
    if (!discordID || !robloxID) {
      return NextResponse.json({ error: "Missing discordID or robloxID" }, { status: 400 })
    }

    // Here you would typically save this data to a database
    // For this example, we'll just log it and return a success message
    console.log(`Received: Discord ID ${discordID}, Roblox ID ${robloxID}`)

    // TODO: Add database logic here

    return NextResponse.json({ message: "User data received successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
