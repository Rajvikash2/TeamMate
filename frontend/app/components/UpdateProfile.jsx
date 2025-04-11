"use client"

import { useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Github, Mail, User, FileText, Plus } from "lucide-react"

const UpdateProfile = ({ profile, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: profile.name,
        email: profile.email,
        bio: profile.bio || "",
        githubLink: profile.githubLink || "",
        skills: profile.skills || [],
        doi: profile.doi || [],
    })

    const [newSkill, setNewSkill] = useState("")
    const [newDomain, setNewDomain] = useState("")

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // Add new skill
    const handleAddSkill = () => {
        if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
            setFormData({
                ...formData,
                skills: [...formData.skills, newSkill.trim()],
            })
            setNewSkill("")
        }
    }

    // Remove skill
    const handleRemoveSkill = (skillToRemove) => {
        setFormData({
            ...formData,
            skills: formData.skills.filter((skill) => skill !== skillToRemove),
        })
    }

    // Add new domain
    const handleAddDomain = () => {
        if (newDomain.trim() && !formData.doi.includes(newDomain.trim())) {
            setFormData({
                ...formData,
                doi: [...formData.doi, newDomain.trim()],
            })
            setNewDomain("")
        }
    }

    // Remove domain
    const handleRemoveDomain = (domainToRemove) => {
        setFormData({
            ...formData,
            doi: formData.doi.filter((domain) => domain !== domainToRemove),
        })
    }

    // Handle Save Changes
    const handleSave = async () => {
        try {
            const res = await fetch(`/profile/${profile.googleId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (!res.ok) throw new Error("Failed to update profile")

            const updatedProfile = await res.json()
            onUpdate(updatedProfile) // Update UI after saving
        } catch (error) {
            console.error("Error updating profile:", error)
        }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-full transition-colors">
                    Edit Profile
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                <Dialog.Content className="fixed left-1/2 top-1/2 w-[95vw] max-w-[550px] max-h-[85vh] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl focus:outline-none overflow-hidden">
                    <div className="overflow-y-auto max-h-[calc(85vh-80px)] pr-2">
                        <Dialog.Title className="text-xl font-bold text-gray-900">Edit Profile</Dialog.Title>
                        <Dialog.Description className="mt-1 mb-5 text-sm text-gray-500">
                            Update your profile information. Click save when you're done.
                        </Dialog.Description>

                        <div className="space-y-5">
                            {/* Basic Info Section */}
                            <div>
                                

                                {/* Name */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <User className="w-4 h-4 text-black" />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-3 py-2 border bg-white text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <Mail className="w-4 h-4 text-black" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-3 py-2 border bg-white text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {/* Bio */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                    <div className="relative">
                                        <div className="absolute top-3 left-3 pointer-events-none">
                                            <FileText className="w-4 h-4 text-black" />
                                        </div>
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            rows={4}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            placeholder="Tell us about yourself..."
                                        ></textarea>
                                    </div>
                                    <p className="mt-1 text-xs text-gray-500 text-right">{formData.bio.length}/500 characters</p>
                                </div>

                                {/* GitHub Link */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1 ">GitHub Profile</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <Github className="w-4 h-4 text-black" />
                                        </div>
                                        <input
                                            type="url"
                                            name="githubLink"
                                            value={formData.githubLink}
                                            onChange={handleChange}
                                            placeholder="https://github.com/username"
                                            className="w-full pl-10 pr-3 py-2 border bg-white text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Skills Section */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-3">Skills</h3>

                                {/* Current Skills */}
                                <div className="mb-3 flex flex-wrap gap-2">
                                    {formData.skills.map((skill, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full flex items-center"
                                        >
                                            {skill}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveSkill(skill)}
                                                className="ml-2 text-gray-500 hover:text-red-500"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                    {formData.skills.length === 0 && <p className="text-sm text-gray-500">No skills added yet</p>}
                                </div>

                                {/* Add New Skill */}
                                <div className="flex">
                                    <input
                                        type="text"
                                        value={newSkill}
                                        onChange={(e) => setNewSkill(e.target.value)}
                                        placeholder="Add a skill"
                                        className="flex-1 border border-gray-300 bg-white text-black rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddSkill}
                                        className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-r-md flex items-center"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Domains of Interest Section */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-3">Domains of Interest</h3>

                                {/* Current Domains */}
                                <div className="mb-3 flex flex-wrap gap-2">
                                    {formData.doi.map((domain, index) => (
                                        <div
                                            key={index}
                                            className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full flex items-center"
                                        >
                                            {domain}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveDomain(domain)}
                                                className="ml-2 text-orange-500 hover:text-red-500"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                    {formData.doi.length === 0 && <p className="text-sm text-gray-500">No domains added yet</p>}
                                </div>

                                {/* Add New Domain */}
                                <div className="flex">
                                    <input
                                        type="text"
                                        value={newDomain}
                                        onChange={(e) => setNewDomain(e.target.value)}
                                        placeholder="Add a domain of interest"
                                        className="flex-1 border border-gray-300 bg-white text-black rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddDomain}
                                        className="bg-orange-500  hover:bg-orange-600 text-white px-3 py-2 rounded-r-md flex items-center"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                            <Dialog.Close asChild>
                                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                                    Cancel
                                </button>
                            </Dialog.Close>
                            <Dialog.Close asChild>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-full transition-colors"
                                >
                                    Save Changes
                                </button>
                            </Dialog.Close>
                        </div>
                    </div>

                    {/* Action Buttons */}
                  

                    {/* Close Button */}
                   
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default UpdateProfile

