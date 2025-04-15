"use client"
import { useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"
import { CheckCircle, Loader2, Send, XCircle } from "lucide-react"
import { toast } from "react-toastify"

const ApplyButton = ({ postId, postTitle, alreadyApplied = false }) => {
    const { data: session } = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null) // null, 'success', 'error'
    const [errorMessage, setErrorMessage] = useState("")

    const handleApply = async () => {
        if (!session?.user?.googleId) {
            toast.error("You must be signed in to apply")
            return
        }

        setIsSubmitting(true)
        setSubmitStatus(null)
        setErrorMessage("")

        try {
            const response = await fetch(`/api/application/create/${postId}/${session.user.googleId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || "Failed to submit application")
            }

            setSubmitStatus("success")
            toast.success("Application submitted successfully!")
        } catch (error) {
            console.error("Error submitting application:", error)
            setSubmitStatus("error")
            setErrorMessage(error.message || "Failed to submit application")
            toast.error(error.message || "Failed to submit application")
        } finally {
            setIsSubmitting(false)
        }
    }

    // If user is not logged in, redirect to sign in
    const handleClick = () => {
        if (!session) {
            window.location.href = "/signin"
            return
        }
        setIsOpen(true)
    }

    return (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <button
                onClick={handleClick}
                disabled={alreadyApplied}
                className={`flex items-center space-x-1 p-1.5 rounded-md hover:bg-gray-100 ${alreadyApplied ? "opacity-50 cursor-not-allowed" : ""
                    }`}
            >
                <Send className="w-5 h-5" />
                <span className="text-xs">{alreadyApplied ? "Applied" : "Apply"}</span>
            </button>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                <Dialog.Content className="fixed left-1/2 top-1/2 w-[95vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl focus:outline-none">
                    <Dialog.Title className="text-xl font-bold text-gray-900">Apply for Project</Dialog.Title>
                    <Dialog.Description className="mt-1 mb-5 text-sm text-gray-500">
                        You are applying for: <span className="font-medium text-gray-700">{postTitle}</span>
                    </Dialog.Description>

                    {submitStatus === "success" ? (
                        <div className="py-8 text-center">
                            <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Application Submitted!</h3>
                            <p className="text-gray-500 mb-6">
                                Your application has been submitted successfully. The project owner will review your application and get
                                back to you soon.
                            </p>
                            <Dialog.Close asChild>
                                <button className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-full transition-colors">
                                    Close
                                </button>
                            </Dialog.Close>
                        </div>
                    ) : submitStatus === "error" ? (
                        <div className="py-8 text-center">
                            <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Application Failed</h3>
                            <p className="text-red-500 mb-6">{errorMessage}</p>
                            <div className="flex justify-center gap-3">
                                <Dialog.Close asChild>
                                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                                        Cancel
                                    </button>
                                </Dialog.Close>
                                <button
                                    onClick={handleApply}
                                    className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-full transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6">
                                <p className="text-gray-700 mb-4">
                                    By applying, you're expressing interest in collaborating on this project. The project owner will be
                                    able to see your profile and may contact you for more information.
                                </p>
                                <div className="bg-orange-50 border border-orange-200 rounded-md p-4">
                                    <h4 className="font-medium text-orange-800 mb-2">Before you apply:</h4>
                                    <ul className="list-disc list-inside text-sm text-orange-700 space-y-1">
                                        <li>Make sure your profile is up to date with your skills and experience</li>
                                        <li>Review the project requirements to ensure you're a good fit</li>
                                        <li>Be prepared to discuss your availability and commitment level</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3">
                                <Dialog.Close asChild>
                                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                                        Cancel
                                    </button>
                                </Dialog.Close>
                                <button
                                    onClick={handleApply}
                                    disabled={isSubmitting}
                                    className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-full transition-colors flex items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Submit Application
                                        </>
                                    )}
                                </button>
                            </div>
                        </>
                    )}

                    {/* Close Button */}
                    <Dialog.Close asChild>
                        <button className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                            <Cross2Icon className="w-4 h-4" />
                            <span className="sr-only">Close</span>
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default ApplyButton
