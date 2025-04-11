"use client"
import { useEffect, useState } from "react"
import PostCard from "./PostCard"
import { useSession } from "next-auth/react"
import { CircleOff, Loader2, Plus } from "lucide-react"
import ProjectPost from "./ProjectPost"
import { ToastContainer } from "react-toastify"

const MyProjects = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { data: session } = useSession()
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [postKey, setPostKey] = useState(0)

  // Ensure session is available before accessing user ID
  const ownerGoogleId = session?.user?.googleId ?? null

  useEffect(() => {
    if (!ownerGoogleId) return // Prevent fetch if googleId is not available

    const fetchPosts = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`/post/${ownerGoogleId}`)
        if (!response.ok) throw new Error("Failed to fetch projects")
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error("Error fetching posts:", error)
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [ownerGoogleId, postKey])

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">My Projects</h1>
        <p className="text-gray-600">Manage and track your collaboration projects</p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] bg-white rounded-md shadow-sm p-8 border border-gray-200">
          <Loader2 className="w-12 h-12 animate-spin text-orange-500 mb-4" />
          <p className="text-gray-600">Loading your projects...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center bg-white rounded-md shadow-sm p-8 border border-gray-200">
          <div className="text-red-500 mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
          >
            Try Again
          </button>
        </div>
      ) : posts.length > 0 ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">
              {posts.length} Project{posts.length !== 1 ? "s" : ""}
            </h2>
            <button
              onClick={() => setDialogOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <Plus size={18} />
              New Project
            </button>
          </div>

          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-white rounded-md shadow-sm p-12 border border-gray-200 min-h-[300px]">
          <CircleOff className="w-16 h-16 text-gray-400 mb-6" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">No Projects Found</h2>
          <p className="text-gray-500 mb-6 text-center max-w-md">
            You haven't created any projects yet. Get started by creating your first project.
          </p>
          <button
            className="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm flex items-center gap-2"
            onClick={() => setDialogOpen(true)}
          >
            <Plus size={20} />
            Create New Project
          </button>
        </div>
      )}

      <ProjectPost isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} setPostKey={setPostKey} />
      <ToastContainer />
    </div>
  )
}

export default MyProjects

