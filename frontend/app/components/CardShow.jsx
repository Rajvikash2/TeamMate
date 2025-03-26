import { Grid } from "@radix-ui/themes";
import React from "react";
import PostCard from "./PostCard";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
const CardShow = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/post");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        console.log(data);

        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", errror);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div className="w-[70%] mx-auto flex flex-col gap-5 items-center mt-10">
      <div className="relative flex items-center w-[50%] ">
        <input
          type="text"
          placeholder="Search"
          className="border rounded-xl border-slate-50 w-full p-3"
        />
        <SearchIcon className="absolute right-2" />
      </div>
      <Grid columns="3" gap="3">
   
        {posts.map((post,index) => (
          <PostCard key={index} post={post} />
        ))}
      </Grid>
    </div>
  );
};

export default CardShow;
