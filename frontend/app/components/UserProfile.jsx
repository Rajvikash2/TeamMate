import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import UpdadateProfile from "./UpdateProfile";

const UserProfile = ({ profile }) => {
    const { data: session, status } = useSession();
    const [userProfile, setUserProfile] = useState(profile); // Store updated profile

    const handleProfileUpdate = (updatedProfile) => {
        setUserProfile(updatedProfile);
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Cover Photo */}
            <div className="relative">
                <Image
                    src="/pic.jpg"
                    alt="Cover"
                    width={800}
                    height={200}
                    className="w-full h-40 object-cover"
                />
                {/* Profile Image */}
                <div className="absolute left-6 -bottom-12 ml-4">
                    <Image
                        src={session?.user?.image || "/default-avatar.png"}
                        alt="Profile"
                        width={100}
                        height={100}
                        className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                    />
                </div>
            </div>

            {/* User Details Section */}
            <div className="p-6 pt-16">
                <div className="grid grid-cols-2 gap-6 ml-8">
                    {/* Left Column - Name, Email, Bio */}
                    <div>
                        <h2 className="text-2xl font-semibold text-black">{profile.name}</h2>
                        <p className="text-gray-600">📧 {profile.email}</p>
                        <p className="text-gray-600 mt-2 italic">
                            {profile.bio || "No bio provided"}
                        </p>
                    </div>

                    {/* Right Column - Skills, DOI, GitHub */}
                    <div className="ml-2">
                        <p className="text-gray-700 font-semibold">Skills:</p>
                        <p className="text-gray-600">
                            {profile.skills.length ? profile.skills.join(", ") : "No skills added"}
                        </p>

                        <p className="text-gray-700 font-semibold mt-2">Domain of Interest:</p>
                        <p className="text-gray-600">
                            {profile.doi?.length ? profile.doi.join(", ") : "No domains added"}
                        </p>

                        <p className="text-gray-700 font-semibold mt-2">GitHub:</p>
                        <a
                            href={profile.githubLink}
                            className="text-blue-500 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            🔗 GitHub Profile
                        </a>
                    </div>
                </div>

                {/* Followers and Buttons */}
                <div className="flex justify-between items-center mt-5 text-gray-700">
                    <div className="ml-8">
                        <span>
                            <strong className="text-black">{profile.followers || "6,476"}</strong> followers
                        </span>
                        <span className="ml-4">
                            <strong className="text-black">{profile.connections || "500+"}</strong> connections
                        </span>
                    </div>

                    <div className="flex gap-3 mr-32">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                            Follow
                        </button>

                        <UpdadateProfile profile={userProfile} onUpdate={handleProfileUpdate} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
