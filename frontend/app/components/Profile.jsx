"use client"
import { useEffect, useState } from "react"
import StepperUsage from "./StepperUsage"
import { useSession } from "next-auth/react"
import UserProfile from "./UserProfile"
import { Loader2 } from "lucide-react"

export default function Profile() {
  const { data: session, status } = useSession()
  const [error, setError] = useState(false)
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") return // Ensure session is ready before fetching
    if (!session?.user?.googleId) {
      setIsLoading(false)
      return
    }

    const fetchProfile = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/profile/${session.user.googleId}`)
        const data = await res.json()

        if (res.status === 404) {
          setError(true)
        } else if (res.ok) {
          setProfile(data)
        } else {
          console.error("Unexpected error", data)
          setError(true)
        }
      } catch (err) {
        console.error("Error fetching profile:", err)
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [session?.user?.googleId, status])

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-md text-center">
          <h2 className="text-xl font-bold mb-4">Sign In Required</h2>
          <p className="text-gray-600 mb-6">Please sign in to view your profile.</p>
          <a
            href="/signin"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-full transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {error ? (
        <div className="max-w-5xl mx-auto pt-4 px-4">
          <StepperUsage setError={setError} />
        </div>
      ) : profile ? (
        <UserProfile profile={profile} />
      ) : (
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <p className="text-gray-600">No profile found.</p>
        </div>
      )}
    </div>
  )
}

