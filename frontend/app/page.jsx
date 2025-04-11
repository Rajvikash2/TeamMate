"use client"
import { useState } from "react"
import { useSession } from "next-auth/react"
import CardShow from "./components/CardShow"
import ProjectPost from "./components/ProjectPost"
import { ArrowUp, Filter, Plus } from "lucide-react"

export default function Home() {
  const { data: session } = useSession()
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [postKey, setPostKey] = useState(0)
  const [activeFilter, setActiveFilter] = useState("hot")

  const filters = [
    { id: "hot", name: "Hot" },
    { id: "new", name: "New" },
    { id: "top", name: "Top" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-4">
        {/* Sidebar */}
        <div className="hidden md:block w-64 space-y-4">
          <div className="bg-white rounded-md shadow-sm p-4 border border-gray-200">
            <h2 className="font-medium text-lg mb-3 text-black">About CollabConnect</h2>
            <p className="text-sm text-gray-600 mb-4">
              A place where you get experience by working! Find projects to collaborate on or share your own.
            </p>
            {session && (
              <button
                onClick={() => setDialogOpen(true)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Create Project
              </button>
            )}
          </div>

          <div className="bg-white rounded-md shadow-sm p-4 border border-gray-200">
            <h2 className="font-medium text-lg text-black mb-3">Popular Domains</h2>
            <ul className="space-y-2 text-gray-500">
              <li className="text-sm hover:bg-gray-100 p-2 rounded cursor-pointer">Web Development</li>
              <li className="text-sm hover:bg-gray-100 p-2 rounded cursor-pointer">Mobile Apps</li>
              <li className="text-sm hover:bg-gray-100 p-2 rounded cursor-pointer">UI/UX Design</li>
              <li className="text-sm hover:bg-gray-100 p-2 rounded cursor-pointer">Machine Learning</li>
              <li className="text-sm hover:bg-gray-100 p-2 rounded cursor-pointer">Blockchain</li>
            </ul>
          </div>
        </div>

        {/* Main Feed */}
        <div className="flex-1">
          {/* Filter Bar */}
          <div className="bg-white rounded-md shadow-sm mb-4 p-2 flex items-center border border-gray-200">
            <div className="flex space-x-1 flex-1">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium ${activeFilter === filter.id ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:bg-gray-50"
                    }`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.name}
                </button>
              ))}
            </div>

            <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full">
              <Filter size={20} />
            </button>
          </div>

          {/* Mobile Create Post Button */}
          {session && (
            <div className="md:hidden bg-white rounded-md shadow-sm mb-4 p-4 border border-gray-200">
              <button
                onClick={() => setDialogOpen(true)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Create Project
              </button>
            </div>
          )}

          {/* Posts */}
          <CardShow postKey={postKey} />
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <button
        className="fixed bottom-6 right-6 bg-orange-500 text-white p-3 rounded-full shadow-lg md:hidden"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp size={24} />
      </button>

      {/* Project Post Dialog */}
      <ProjectPost isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} setPostKey={setPostKey} />
    </div>
  )
}

