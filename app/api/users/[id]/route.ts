import { NextResponse } from "next/server"
import clientPromise from "../../../lib/mongodb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const discordID = params.id

  try {
    const client = await clientPromise
    const db = client.db("discordbot")
    const users = db.collection("users")

    // Find the user with a timeout
    const user = await Promise.race([
      users.findOne({ discordID }),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Database operation timed out")), 5000)),
    ])

    if (user instanceof Error) {
      throw user
    }

    if (user) {
      return NextResponse.json({ robloxID: user.robloxID }, { status: 200 })
    } else {
      return NextResponse.json({ error: "Discord ID not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error processing request:", error)
    if (error instanceof Error && error.message === "Database operation timed out") {
      return NextResponse.json({ error: "Request timed out. Please try again." }, { status: 504 })
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

