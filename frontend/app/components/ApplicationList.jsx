"use client";

import { useEffect, useState } from "react";
import ApplicationCard from "./ApplicationCard"; // adjust path as needed
import { toast } from "react-toastify";

const ApplicationList = ({ postId }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await fetch(`http://localhost:4000/application/${postId}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setApplications(data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      toast.error("Failed to fetch applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) fetchApplications();
  }, [postId]);

  return (
    <div className="space-y-4">
      {loading ? (
        <p className="text-gray-600">Loading applications...</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-500">No applications found.</p>
      ) : (
        applications.map((application) => (
          <ApplicationCard
            key={application._id}
            application={{
              name: application.profile?.name,
              email: application.profile?.email,
              githubLink: application.profile?.githubLink,
              skills: application.profile?.skills,
            }}
          />
        ))
      )}
    </div>
  );
};

export default ApplicationList;
