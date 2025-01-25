import { NextResponse } from "next/server"
import { readStorage } from "../../../lib/storage"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const discordID = params.id

  // Read storage
  const userStore = await readStorage()

  if (discordID in userStore) {
    return NextResponse.json({ robloxID: userStore[discordID] }, { status: 200 })
  } else {
    return NextResponse.json({ error: "Discord ID not found" }, { status: 404 })
  }
}

