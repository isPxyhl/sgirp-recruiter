import { NextResponse } from "next/server"
import clientPromise from "../../lib/mongodb"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { discordID, robloxID } = body

    if (!discordID || !robloxID) {
      return NextResponse.json({ error: "Missing discordID or robloxID" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("userLinkingDB")
    const users = db.collection("users")

    await users.updateOne({ discordID }, { $set: { robloxID } }, { upsert: true })

    return NextResponse.json({ message: "User data received successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

