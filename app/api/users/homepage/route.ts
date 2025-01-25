import { NextResponse } from "next/server"
import clientPromise from "../../../lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("userLinkingDB")
    const users = db.collection("users")

    const allUsers = await users.find({}).toArray()

    const formattedUsers = allUsers.map((user) => ({
      discordID: user.discordID,
      robloxID: user.robloxID,
    }))

    return NextResponse.json({ users: formattedUsers }, { status: 200 })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

