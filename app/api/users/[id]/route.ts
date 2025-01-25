import { NextResponse } from "next/server"
import clientPromise from "../../../lib/mongodb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const discordID = params.id

  try {
    const client = await clientPromise
    const db = client.db("discordbot")
    const users = db.collection("users")

    const user = await users.findOne({ discordID })

    if (user) {
      return NextResponse.json({ robloxID: user.robloxID }, { status: 200 })
    } else {
      return NextResponse.json({ error: "Discord ID not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

