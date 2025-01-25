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

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { discordID, robloxID } = body

    if (!discordID || !robloxID) {
      return NextResponse.json({ error: "Missing discordID or robloxID" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("userLinkingDB")
    const users = db.collection("users")

    // Update the robloxID for the given discordID
    const result = await users.updateOne({ discordID }, { $set: { robloxID } })

    if (result.matchedCount > 0) {
      return NextResponse.json({ message: "Roblox ID updated successfully for the given Discord ID" }, { status: 200 })
    } else {
      return NextResponse.json({ message: "Discord ID not found. No update performed." }, { status: 404 })
    }
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

