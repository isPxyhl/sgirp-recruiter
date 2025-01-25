"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"

interface RobloxUser {
  description: string
  name: string
  displayName: string
  id: number
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<any>(null)
  const [robloxData, setRobloxData] = useState<RobloxUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data from our API
        const userResponse = await fetch("/api/users/me")
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data")
        }
        const userData = await userResponse.json()
        setUserData(userData)

        // Fetch Roblox user data
        if (userData.robloxID) {
          const robloxResponse = await fetch(`https://users.roblox.com/v1/users/${userData.robloxID}`)
          if (!robloxResponse.ok) {
            throw new Error("Failed to fetch Roblox data")
          }
          const robloxData = await robloxResponse.json()
          setRobloxData(robloxData)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div>
        <div>
          <div />
          <div />
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1>Profile</h1>

      {robloxData && (
        <div>
          <Card>
            <h2>Roblox Information</h2>
            <div>
              <div>
                <label>Display Name</label>
                <p>{robloxData.displayName}</p>
              </div>
              <div>
                <label>Username</label>
                <p>{robloxData.name}</p>
              </div>
              <div>
                <label>User ID</label>
                <p>{robloxData.id}</p>
              </div>
              <div>
                <label>Description</label>
                <p>{robloxData.description || "No description provided"}</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

