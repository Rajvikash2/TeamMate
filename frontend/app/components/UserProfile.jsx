import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import UpdateProfile from "./UpdateProfile";
import {
  Calendar,
  Github,
  Mail,
  MapPin,
  Award,
  Users,
  Bookmark,
  MessageSquare,
} from "lucide-react";
import MyProjects from "./MyProjects";

const UserProfile = ({ profile }) => {
  const { data: session, status } = useSession();
  const [userProfile, setUserProfile] = useState(profile); // Store updated profile

  const handleProfileUpdate = (updatedProfile) => {
    setUserProfile(updatedProfile);
  };

  // Format date for "Reddit age"
  const formatDate = () => {
    const date = new Date();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <div className=" flex flex-col max-w-5xl mx-auto pt-4 px-4 ">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Column - Profile Card */}
        <div className="w-full md:w-80 flex-shrink-0">
          <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
            {/* Banner */}
            <div className="h-24 bg-gradient-to-r from-orange-400 to-orange-500"></div>

            {/* Profile Info */}
            <div className="relative px-4 pt-0 pb-4">
              {/* Avatar */}
              <div className="-mt-12 mb-3">
                <Image
                  src={session?.user?.image || "/default-avatar.png"}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="rounded-full border-4 border-white shadow-sm"
                />
              </div>

              <h2 className="text-lg font-bold text-black">
                {userProfile.name}
              </h2>
              <p className="text-sm text-gray-500">
                u/{userProfile.name.replace(/\s+/g, "")}
              </p>

              {/* Reddit-style karma stats */}
              <div className="mt-4 flex items-center justify-between">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Followers</p>
                  <p className="font-medium text-gray-400">
                    {userProfile.followers || "6,476"}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Connections</p>
                  <p className="font-medium text-gray-400">
                    {userProfile.connections || "500+"}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Projects</p>
                  <p className="font-medium text-gray-400">12</p>
                </div>
              </div>

              {/* Reddit age */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>CollabConnect since {formatDate()}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-4 space-y-2">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-full transition-colors">
                  Follow
                </button>
                <UpdateProfile
                  profile={userProfile}
                  onUpdate={handleProfileUpdate}
                />
              </div>
            </div>
          </div>

          {/* Trophy Case - Reddit style */}
          <div className="mt-4 bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="font-medium text-black">Trophy Case</h3>
            </div>
            <div className="p-4">
              <div className="flex items-center mb-3">
                <Award className="w-5 h-5 text-yellow-500 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Verified Email
                  </p>
                  <p className="text-xs text-gray-500">Email verified</p>
                </div>
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 text-blue-500 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    One-Year Club
                  </p>
                  <p className="text-xs text-gray-500">Member for 1 year</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - About & Skills */}
        <div className="flex-1">
          {/* About Card */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-medium text-black">About</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {userProfile.bio || "No bio provided yet."}
              </p>

              <div className="mt-4 space-y-3">
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-700">{userProfile.email}</span>
                </div>

                {userProfile.githubLink && (
                  <div className="flex items-center text-sm">
                    <Github className="w-4 h-4 text-gray-400 mr-2" />
                    <a
                      href={userProfile.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      GitHub Profile
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Skills & Domains Card */}
          <div className="mt-10 bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="font-medium text-black">Skills & Interests</h3>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2 text-gray-600">
                  Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {userProfile.skills && userProfile.skills.length > 0 ? (
                    userProfile.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">
                      No skills added yet
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2 text-gray-600">
                  Domains of Interest
                </h4>
                <div className="flex flex-wrap gap-2">
                  {userProfile.doi && userProfile.doi.length > 0 ? (
                    userProfile.doi.map((domain, index) => (
                      <span
                        key={index}
                        className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full"
                      >
                        {domain}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">
                      No domains added yet
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Activity Stats - Reddit style */}
          <div className="mt-6 bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="font-medium text-black">Activity</h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-md">
                  <MessageSquare className="w-5 h-5 mx-auto mb-1 text-gray-500" />
                  <p className="text-sm font-medium text-gray-500">24</p>
                  <p className="text-xs text-gray-500">Comments</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-md">
                  <Bookmark className="w-5 h-5 mx-auto mb-1 text-gray-500" />
                  <p className="text-sm font-medium text-gray-500">8</p>
                  <p className="text-xs text-gray-500">Saved</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-md">
                  <Users className="w-5 h-5 mx-auto mb-1 text-gray-500" />
                  <p className="text-sm font-medium text-gray-500">3</p>
                  <p className="text-xs text-gray-500">Teams</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-md">
                  <Award className="w-5 h-5 mx-auto mb-1 text-gray-500" />
                  <p className="text-sm font-medium text-gray-500">5</p>
                  <p className="text-xs text-gray-500">Awards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MyProjects />
    </div>
  );
};

export default UserProfile;
