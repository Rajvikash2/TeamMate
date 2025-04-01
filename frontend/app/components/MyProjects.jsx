"use client";
import { Grid } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { useSession } from "next-auth/react";
import { CircleOff, Loader2 } from "lucide-react";
import ProjectPost from "./ProjectPost";
import { ToastContainer, toast } from "react-toastify";

const MyProjects = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [postKey, setPostKey] = useState(0);

  // Ensure session is available before accessing user ID
  const ownerGoogleId = session?.user?.googleId ?? null;
  console.log("Session data:", session);
  console.log("Google ID:", ownerGoogleId); // Debugging line to check googleId

  useEffect(() => {
    if (!ownerGoogleId) return; // Prevent fetch if googleId is not available

    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/post/${ownerGoogleId}`);
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [ownerGoogleId, postKey]); // Added postKey to dependencies

  const handlePostSubmit = (data) => {
    // console.log("Post Data:", data);
    setDialogOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-4">My Projects</h1>
        <div className="w-20 h-1  mx-auto rounded-full"></div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-4" />
          <p className="text-lg text-gray-600">Loading your projects...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center  p-8 rounded-lg shadow-sm">
          <div className="text-red-500 mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Try Again
          </button>
        </div>
      ) : posts.length > 0 ? (
        <Grid
          columns={{ initial: "1", sm: "2", md: "3" }}
          gap="6"
          className="w-full"
        >
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </Grid>
      ) : (
        <div className="flex flex-col items-center justify-center  p-12 rounded-lg shadow-sm min-h-[300px]">
          <CircleOff className="w-16 h-16 text-gray-400 mb-6" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            No Projects Found
          </h2>
          <p className="text-gray-500 mb-6 text-center max-w-md">
            You haven't uploaded any projects yet. Get started by uploading your
            first project.
          </p>
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors shadow-sm"
            // onClick={() => (window.location.href = "/create-project")} // Adjust this to your create project route
            onClick={() => setDialogOpen(true)}
          >
            Create New Project
          </button>
          <ProjectPost
            isOpen={isDialogOpen}
            onClose={() => setDialogOpen(false)}
            setPostKey={setPostKey}
            // onSubmit={handlePostSubmit}
          />
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default MyProjects;
