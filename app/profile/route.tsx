"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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
      <div className="container mx-auto p-4">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-24 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Profile</h1>

      {userData && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Discord ID</label>
                <p className="text-lg">{userData.discordId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Roblox ID</label>
                <p className="text-lg">{userData.robloxID || "Not linked"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {robloxData && (
        <Card>
          <CardHeader>
            <CardTitle>Roblox Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Display Name</label>
                <p className="text-lg">{robloxData.displayName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Username</label>
                <p className="text-lg">{robloxData.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">User ID</label>
                <p className="text-lg">{robloxData.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="text-lg whitespace-pre-wrap">{robloxData.description || "No description provided"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mt-8">
        <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
      </div>
    </div>
  )
}

