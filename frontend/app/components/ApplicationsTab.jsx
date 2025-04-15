"use client"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Loader2, AlertCircle } from "lucide-react"
import PostCard from "./PostCard"

const ApplicationsTab = ({ status = "pending" }) => {
    const { data: session } = useSession()
    const [applications, setApplications] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!session?.user?.googleId) return

        const fetchApplications = async () => {
            setIsLoading(true)
            setError(null)

            try {
                const endpoint = `/application/${status}/${session.user.googleId}`
                const response = await fetch(endpoint)

                if (!response.ok) {
                    throw new Error(`Failed to fetch ${status} applications`)
                }

                const data = await response.json()
                setApplications(data)
            } catch (error) {
                console.error(`Error fetching ${status} applications:`, error)
                setError(error.message || `Failed to load ${status} applications`)
            } finally {
                setIsLoading(false)
            }
        }

        fetchApplications()
    }, [session?.user?.googleId, status])

    // Helper function to get status label
    const getStatusLabel = () => {
        switch (status) {
            case "pending":
                return "Pending"
            case "accepted":
                return "Accepted"
            case "rejected":
                return "Rejected"
            default:
                return "Pending"
        }
    }

    // Helper function to get status color
    const getStatusColor = () => {
        switch (status) {
            case "pending":
                return "text-yellow-600 bg-yellow-100"
            case "accepted":
                return "text-green-600 bg-green-100"
            case "rejected":
                return "text-red-600 bg-red-100"
            default:
                return "text-yellow-600 bg-yellow-100"
        }
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-4" />
                <p className="text-gray-500">Loading applications...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-white rounded-md shadow-sm p-6 text-center border border-gray-200">
                <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
                <p className="text-red-500 mb-2">{error}</p>
                <button onClick={() => window.location.reload()} className="text-orange-500 hover:text-orange-600 font-medium">
                    Try Again
                </button>
            </div>
        )
    }

    if (applications.length === 0) {
        return (
            <div className="bg-white rounded-md shadow-sm p-8 text-center border border-gray-200">
                <h3 className="text-lg font-medium mb-2">No {getStatusLabel().toLowerCase()} applications</h3>
                <p className="text-gray-500 mb-4">
                    {status === "pending"
                        ? "You haven't applied to any projects yet."
                        : status === "accepted"
                            ? "None of your applications have been accepted yet."
                            : "None of your applications have been rejected."}
                </p>
                {status === "pending" && (
                    <a
                        href="/"
                        className="inline-block px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full transition-colors"
                    >
                        Browse Projects
                    </a>
                )}
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">
                    {applications.length} {getStatusLabel()} Application{applications.length !== 1 ? "s" : ""}
                </h2>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor()}`}>{getStatusLabel()}</span>
            </div>

            {applications.map((post, index) => (
                <PostCard key={index} post={post} showApplyButton={false} />
            ))}
        </div>
    )
}

export default ApplicationsTab
