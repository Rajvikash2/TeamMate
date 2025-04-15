"use client"

import Link from "next/link"
import { ArrowBigUp, ArrowBigDown, MessageSquare, Share2, Bookmark, Send } from "lucide-react"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const PostCard = ({ post }) => {
  const { data: session } = useSession()

  const handleApply = async () => {
    if (!session?.user?.googleId) {
      window.location.href = "/signin"
      return
    }

    try {
      const response = await fetch(`/api/application/create/${post._id || post.id}/${session.user.googleId}`, {
        method: "POST",
      })

      if (response.ok) {
        toast.success("Applied successfully!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        })
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to apply")
      }
    } catch (error) {
      console.error("Error applying:", error)
      toast.error(error.message || "Something went wrong.", {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      })
    }
  }

  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden hover:border-gray-300 transition-all">
      {/* Card Header */}
      <div className="p-3 border-b border-gray-100 flex items-center">
        <div className="text-xs text-gray-500">
          <span className="font-medium text-gray-900">{post.domain}</span>
          {" • "}
          <span>Posted by {post.name}</span>
        </div>
      </div>

      {/* Card Content */}
      <Link href={`/post/${post.id || post._id}`} className="block">
        <div className="p-3">
          <h2 className="text-lg font-medium text-black mb-2">{post.title}</h2>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">{post.jobType}</span>

            {post.roleReq &&
              post.roleReq.slice(0, 2).map((role, index) => (
                <span key={index} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                  {role}
                </span>
              ))}
            {post.roleReq && post.roleReq.length > 2 && (
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                +{post.roleReq.length - 2} more
              </span>
            )}
          </div>
          <p className="text-gray-700 text-sm mb-3 line-clamp-3">{post.desc}</p>

          {/* Project Image */}
          <div className="bg-gray-100 rounded-md overflow-hidden mb-3">
            <img
              src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
              alt={post.title}
              className="w-full h-auto object-cover max-h-80"
            />
          </div>
        </div>
      </Link>

      {/* Card Footer */}
      <div className="px-2 py-1 border-t border-gray-100 flex items-center text-gray-500">
        <button className="flex items-center space-x-1 p-1.5 rounded-md hover:bg-gray-100">
          <ArrowBigUp className="w-5 h-5" />
          <span className="text-xs font-medium">Upvote</span>
        </button>
        <button className="flex items-center p-1.5 rounded-md hover:bg-gray-100 ml-1">
          <ArrowBigDown className="w-5 h-5" />
        </button>
        <button className="flex items-center space-x-1 p-1.5 rounded-md hover:bg-gray-100 ml-2">
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs">Comments</span>
        </button>
        <button className="flex items-center space-x-1 p-1.5 rounded-md hover:bg-gray-100 ml-2">
          <Share2 className="w-5 h-5" />
          <span className="text-xs">Share</span>
        </button>

        {/* Apply Button */}
        <button className="flex items-center space-x-1 p-1.5 rounded-md hover:bg-gray-100 ml-2" onClick={handleApply}>
          <Send className="w-5 h-5" />
          <span className="text-xs">Apply</span>
        </button>

        <button className="flex items-center space-x-1 p-1.5 rounded-md hover:bg-gray-100 ml-auto">
          <Bookmark className="w-5 h-5" />
          <span className="text-xs">Save</span>
        </button>
      </div>
    </div>
  )
}

export default PostCard
