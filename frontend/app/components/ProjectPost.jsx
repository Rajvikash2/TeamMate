"use client";
import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
const ProjectPost = ({ isOpen, onClose, setPostKey }) => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    title: "",
    roleReq: "",
    desc: "",
    jobType: "Unpaid",
    image: null, // Image will be handled as a file
    domain: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // If the field is a file input, update the image file
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    console.log("Form Data:", formData); // Debugging line to check form data
    const res = await fetch(`/post/create/${session.user.googleId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    e.preventDefault();
    // onSubmit(formData);
    onClose();
    console.log(res);
    if (res.ok) {
      setPostKey((prev) => prev + 1);
      toast("Succesfull");
    } else {
      toast("Failed to post project");
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* Background Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-90" />

        {/* Dialog Content */}
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[80vh] w-[95vw] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-900 p-6 shadow-xl focus:outline-none overflow-hidden">
          <div className="overflow-y-auto max-h-[75vh] p-2">
            <Dialog.Title className="text-2xl font-semibold text-white">
              Create New Project
            </Dialog.Title>
            <Dialog.Description className="mb-5 mt-2 text-lg text-gray-300">
              Fill in the details to create your project. Click "Post" when
              you're ready.
            </Dialog.Description>

            {/* Form - Single Column Layout */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <fieldset className="flex flex-col gap-2">
                <label className="text-gray-300">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="h-[40px] w-full rounded-md bg-gray-800 px-3 text-white shadow-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <label className="text-gray-300">Role(s)</label>
                <input
                  type="text"
                  name="roleReq"
                  value={formData.roleReq}
                  onChange={handleChange}
                  required
                  placeholder="Developer, Designer, etc."
                  className="h-[40px] w-full rounded-md bg-gray-800 px-3 text-white shadow-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <label className="text-gray-300">Job Type</label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  required
                  className="h-[40px] w-full rounded-md bg-gray-800 px-3 text-white shadow-md outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <label className="text-gray-300">Domain</label>
                <input
                  type="text"
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Web Development"
                  className="h-[40px] w-full rounded-md bg-gray-800 px-3 text-white shadow-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              </fieldset>
              {/* Description Field */}
              <fieldset className="flex flex-col gap-2">
                <label className="text-gray-300">Description</label>
                <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  maxLength="500"
                  placeholder="Brief project description"
                  className="h-[120px] w-full resize-none rounded-md bg-gray-800 px-3 py-2 text-white shadow-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              </fieldset>
              {/* Image Upload Field (Only Upload Button) */}

              <fieldset className="flex flex-col gap-2">
                <label className="text-gray-300">Upload Image</label>

                <button
                  type="button"
                  onClick={() => document.getElementById("fileInput").click()}
                  className="px-5 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
                >
                  Upload Image
                </button>

                {/* Hidden File Input */}
                <input
                  type="file"
                  id="fileInput"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />

                {/* Show Selected File Name + Remove Icon in Corner */}
                {formData.image && (
                  <div className="relative mt-2 p-2 bg-gray-800 rounded-md flex items-center justify-between text-gray-300">
                    <p className="text-sm">{formData.image.name}</p>

                    {/* Remove Icon (Top-right corner) */}
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: null })}
                      className="absolute right-2 top-2 text-gray-400 hover:text-red-500 transition"
                    >
                      <Cross2Icon />
                    </button>
                  </div>
                )}
              </fieldset>
              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="px-5 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </Dialog.Close>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
                >
                  Post Project
                </button>
              </div>
            </form>
          </div>

          {/* Close Button */}
          {/* Close Button (Moved Outside Top-Right) */}
          <Dialog.Close asChild>
            <button
              className="absolute right-[-40px] top-[-40px] size-[40px] flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-red-500 transition shadow-lg"
              aria-label="Close"
            >
              <Cross2Icon className="w-5 h-5 text-white" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ProjectPost;
