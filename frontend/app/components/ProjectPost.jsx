"use client"
import * as Dialog from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"
import { Image, Upload } from "lucide-react"

const ProjectPost = ({ isOpen, onClose, setPostKey }) => {
  const { data: session } = useSession()
  const [formData, setFormData] = useState({
    title: "",
    roleReq: "",
    desc: "",
    jobType: "Unpaid",
    image: null,
    domain: "",
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target

    // If the field is a file input, update the image file
    if (name === "image") {
      setFormData({ ...formData, image: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`/post/create/${session.user.googleId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setPostKey((prev) => prev + 1)
        toast.success("Project posted successfully!")
        onClose()
      } else {
        toast.error("Failed to post project")
      }
    } catch (error) {
      console.error("Error posting project:", error)
      toast.error("An error occurred while posting your project")
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* Background Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />

        {/* Dialog Content */}
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[90vh] w-[95vw] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl focus:outline-none overflow-hidden">
          <div className="overflow-y-auto max-h-[75vh] p-2">
            <Dialog.Title className="text-2xl font-semibold text-gray-900">Create a Project</Dialog.Title>
            <Dialog.Description className="mb-5 mt-2 text-sm text-gray-500">
              Share your project idea with the community and find collaborators.
            </Dialog.Description>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <fieldset className="flex flex-col gap-2 ">
                <label className="text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Give your project a clear title"
                  className="h-[40px] w-full rounded-md border bg-white border-gray-300 px-3 text-gray-900 shadow-sm outline-none focus:ring-2 focus:ring-orange-500"
                />
              </fieldset>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <fieldset className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Role(s)</label>
                  <input
                    type="text"
                    name="roleReq"
                    value={formData.roleReq}
                    onChange={handleChange}
                    required
                    placeholder="Developer, Designer, etc."
                    className="h-[40px] w-full rounded-md border bg-white border-gray-300 px-3 text-gray-900 shadow-sm outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </fieldset>

                <fieldset className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Job Type</label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    required
                    className="h-[40px] w-full rounded-md border bg-white border-gray-300 px-3 text-gray-900 shadow-sm outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                </fieldset>
              </div>

              <fieldset className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Domain</label>
                <input
                  type="text"
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Web Development"
                  className="h-[40px] w-full rounded-md border bg-white border-gray-300 px-3 text-gray-900 shadow-sm outline-none focus:ring-2 focus:ring-orange-500"
                />
              </fieldset>

              {/* Description Field */}
              <fieldset className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  maxLength="500"
                  placeholder="Describe your project, goals, and what you're looking for in collaborators"
                  className="h-[120px] w-full resize-none rounded-md border bg-white border-gray-300 px-3 py-2 text-gray-900 shadow-sm outline-none focus:ring-2 focus:ring-orange-500"
                />
                <div className="text-xs text-gray-500 text-right">{formData.desc.length}/500</div>
              </fieldset>

              {/* Image Upload Field */}
              <fieldset className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Upload Image</label>
                <div
                  className="border border-dashed border-gray-300 rounded-md p-4 text-center hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <Upload className="w-6 h-6 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload an image</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
                </div>

                {/* Hidden File Input */}
                <input
                  type="file"
                  id="fileInput"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />

                {/* Show Selected File Name */}
                {formData.image && (
                  <div className="mt-2 p-2 bg-gray-50 rounded-md flex items-center justify-between text-gray-700 border border-gray-200">
                    <div className="flex items-center">
                      <Image className="w-4 h-4 mr-2 text-gray-500" />
                      <p className="text-sm truncate">{formData.image.name}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: null })}
                      className="text-gray-400 hover:text-red-500 transition"
                    >
                      <Cross2Icon className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </fieldset>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                </Dialog.Close>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition"
                >
                  Post Project
                </button>
              </div>
            </form>
          </div>

          {/* Close Button */}
          
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default ProjectPost

