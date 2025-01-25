import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { connectToDatabase } from "../../lib/mongodb"

export async function GET() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("token")

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { db } = await connectToDatabase()
    const user = await db.collection("users").findOne({
      token: token.value,
    })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error in /api/users/me:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

