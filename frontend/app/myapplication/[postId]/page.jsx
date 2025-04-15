"use client";
import React from "react";
import ApplicationList from "../../components/ApplicationList";
import { useParams } from "next/navigation";

const page = () => {
  const { postId } = useParams();

  return (
    <div>
      <ApplicationList postId={postId} />
    </div>
  );
};

export default page;
