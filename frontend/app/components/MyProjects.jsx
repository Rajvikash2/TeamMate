import { Grid } from "@radix-ui/themes";
import React from "react";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { useSession } from "next-auth/react";
import { CircleOff } from "lucide-react";

const MyProjects = () => {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const googleId = session.user.id;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/post/${googleId}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        console.log(data);

        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div className="w-[70%] mx-auto flex flex-col gap-5 items-center mt-10">
      <h1>View My Projects</h1>
      <Grid columns="3" gap="3">
        {posts.length > 0 ? (
          posts.map((post, index) => <PostCard key={index} post={post} />)
        ) : (
          <div className="flex flex-col items-center justify-center ">
            <CircleOff className="w-20 h-20 " />
            <h1 className="text-4xl">No Projects Found</h1>
          </div>
        )}
      </Grid>
    </div>
  );
};

export default MyProjects;
