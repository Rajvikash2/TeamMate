import { Dialog } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";

const UpdadateProfile = ({ profile, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: profile.name,
        email: profile.email,
        bio: profile.bio || "",
    });

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Save Changes
    const handleSave = async () => {
        try {
            const res = await fetch(`/profile/${profile.googleId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to update profile");

            const updatedProfile = await res.json();
            onUpdate(updatedProfile); // Update UI after saving
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">
                    Edit Profile
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg">
                    <Dialog.Title className="text-lg font-semibold">Edit Profile</Dialog.Title>
                    <Dialog.Description className="mb-4 text-sm text-gray-500">
                        Update your profile details.
                    </Dialog.Description>

                    {/* Name */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 w-full rounded border px-3 py-2"
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 w-full rounded border px-3 py-2"
                        />
                    </div>

                    {/* Bio */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Bio</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="mt-1 w-full rounded border px-3 py-2"
                        ></textarea>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <Dialog.Close asChild>
                            <button
                                onClick={handleSave}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Save Changes
                            </button>
                        </Dialog.Close>
                    </div>

                    {/* Close Button */}
                    <Dialog.Close asChild>
                        <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-800">
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default UpdadateProfile;
