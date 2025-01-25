import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { connectToDatabase } from "../../../lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("token")

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { db } = await connectToDatabase()
    const user = await db.collection("users").findOne({
      token: token.value,
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Remove sensitive information before sending the response
    const { password, ...safeUser } = user

    return NextResponse.json(safeUser)
  } catch (error) {
    console.error("Error in /api/users/me:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

