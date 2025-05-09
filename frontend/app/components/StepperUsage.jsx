"use client";
import React, { useState } from "react";
import Stepper, { Step } from "./Stepper";
import { useSession } from "next-auth/react";

export default function ProfileStepper({ setError }) {
  const { data: session } = useSession();
  const [profile, setProfile] = useState({
    googleId: session?.user?.googleId,
    name: "",
    email: session?.user?.email,
    skills: [],
    githubLink: "",
    bio: "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (e, field) => {
    setProfile({
      ...profile,
      [field]: e.target.value.split(",").map((item) => item.trim()),
    });
  };

  const handleFinalSubmit = async () => {
    console.log(profile);
    console.log("Google ID:", session.user.googleId);
    console.log("Email:", session.user.email);
    console.log("Profile:", profile);
    try {
      const response = await fetch("/api/profile/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });
      console.log(response);

      if (response) {
        setError(false);
        alert("Profile submitted successfully!");
      } else {
        alert("Error submitting profile");
      }
    } catch (error) {
      console.error("Error submitting profile:", error);
    }
  };

  return (
    <Stepper
      initialStep={1}
      onFinalStepCompleted={handleFinalSubmit}
      backButtonText="Previous"
      nextButtonText="Next"
      className="text-black"
    >
      <Step>
        <h2 className=" text-lg font-semibold">Basic Information</h2>
        <div className="flex flex-col items-center gap-4 w-full max-w-md">
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="border border-gray-200 rounded-md p-2 w-full text-sm text-gray-900 bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          />

          {/* <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className=" border rounded-lg p-2 w-full"
          /> */}

          {/* <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className=" border text-gray-700 rounded-lg p-2 w-full"
          /> */}
        </div>
      </Step>
      <Step>
        <h2 className=" text-lg font-semibold">Professional Details</h2>
        <div className="flex flex-col items-center gap-4 w-full max-w-md">
          <input
            type="text"
            name="skills"
            value={profile.skills.join(", ")}
            onChange={(e) => handleArrayChange(e, "skills")}
            placeholder="Skills (comma-separated)"
            className="border border-gray-200 rounded-md p-2 w-full text-sm text-gray-900 bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          />

          <input
            type="url"
            name="githubLink"
            value={profile.githubLink}
            onChange={handleChange}
            placeholder="GitHub Profile Link"
            required
            className="border border-gray-200 rounded-md p-2 w-full text-sm text-gray-900 bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          />
        </div>
      </Step>
      <Step>
        <h2 className=" text-lg font-semibold">Short Bio</h2>
        <textarea
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          placeholder="Tell us about yourself"
          maxLength={500}
          className="border border-gray-200 rounded-md p-2 w-full h-24 text-sm text-gray-900 bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
        />
      </Step>
      <Step>
        <h2 className=" text-lg font-semibold">Review & Submit</h2>
        <p className="text-gray-400">
          Please check your details before submitting.
        </p>
      </Step>
    </Stepper>
  );
}
