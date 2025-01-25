import { NextResponse } from "next/server"
import clientPromise from "../../lib/mongodb"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { discordID, robloxID } = body

    // Validate the input
    if (!discordID || !robloxID) {
      return NextResponse.json({ error: "Missing discordID or robloxID" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("discordbot")
    const users = db.collection("users")

    // Update or insert the user with a timeout
    const result = await Promise.race([
      users.updateOne({ discordID }, { $set: { robloxID } }, { upsert: true }),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Database operation timed out")), 5000)),
    ])

    if (result instanceof Error) {
      throw result
    }

    return NextResponse.json({ message: "User data received successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error processing request:", error)
    if (error instanceof Error && error.message === "Database operation timed out") {
      return NextResponse.json({ error: "Request timed out. Please try again." }, { status: 504 })
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

