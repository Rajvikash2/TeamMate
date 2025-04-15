"use client";

import { useState } from "react";
import { Mail, Github, CheckCircle, XCircle } from "lucide-react";

const ApplicationCard = ({ application }) => {
  const [isVisible, setIsVisible] = useState(true);

  const { name, email, githubLink, skills } = application;

  const handleAccept = () => {
    window.location.href = `mailto:${email}`;
  };

  const handleReject = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden hover:border-gray-300 transition-all p-4">
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-black mb-1">{name}</h2>
        <p className="text-sm text-gray-600 flex items-center gap-1">
          <Mail className="w-4 h-4" /> {email}
        </p>
        {githubLink && (
          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
            <Github className="w-4 h-4" />
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub Profile
            </a>
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {skills?.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={handleAccept}
          className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 text-sm rounded-md hover:bg-green-200 transition"
        >
          <CheckCircle className="w-4 h-4" />
          Accept
        </button>
        <button
          onClick={handleReject}
          className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 text-sm rounded-md hover:bg-red-200 transition"
        >
          <XCircle className="w-4 h-4" />
          Reject
        </button>
      </div>
    </div>
  );
};

export default ApplicationCard;
