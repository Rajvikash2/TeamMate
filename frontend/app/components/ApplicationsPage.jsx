"use client"
import { useState } from "react"
import { useSession } from "next-auth/react"
import ApplicationsTab from "./ApplicationsTab"

const ApplicationsPage = () => {
    const { data: session, status } = useSession()
    const [activeTab, setActiveTab] = useState("pending")

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    if (status === "unauthenticated") {
        return (
            <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-md text-center">
                    <h2 className="text-xl font-bold mb-4">Sign In Required</h2>
                    <p className="text-gray-600 mb-6">Please sign in to view your applications.</p>
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

    const tabs = [
        { id: "pending", label: "Pending" },
        { id: "accepted", label: "Accepted" },
        { id: "rejected", label: "Rejected" },
    ]

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">My Applications</h1>
                    <p className="text-gray-600">Track the status of your project applications</p>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-md shadow-sm mb-6 border border-gray-200">
                    <div className="flex border-b border-gray-200">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === tab.id
                                        ? "text-orange-500 border-b-2 border-orange-500"
                                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                    }`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <ApplicationsTab status={activeTab} />
            </div>
        </div>
    )
}

export default ApplicationsPage
