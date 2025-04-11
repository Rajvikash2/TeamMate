"use client"
import { useEffect, useState } from "react"
import PostCard from "./PostCard"
import { Loader2 } from "lucide-react"

const CardShow = ({ postKey = 0 }) => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("/api/post")
        if (!response.ok) throw new Error("Failed to fetch data")
        const data = await response.json()

        if (data.length === 0) {
          console.log("No posts found")
        }

        console.log("Fetched posts:", data)
        setPosts(data)
      } catch (error) {
        console.error("Error fetching posts:", error)
        setError("Failed to load posts. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [postKey])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-4" />
        <p className="text-gray-500">Loading posts...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-md shadow-sm p-6 text-center border border-gray-200">
        <p className="text-red-500 mb-2">{error}</p>
        <button onClick={() => window.location.reload()} className="text-orange-500 hover:text-orange-600 font-medium">
          Try Again
        </button>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-md shadow-sm p-8 text-center border border-gray-200">
        <h3 className="text-lg font-medium mb-2">No posts found</h3>
        <p className="text-gray-500 mb-4">Be the first to create a post!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </div>
  )
}

export default CardShow
