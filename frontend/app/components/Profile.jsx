"use client";
import React, { useEffect, useState } from "react";
import StepperUsage from "./StepperUsage";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (status === "loading") return; // Ensure session is ready before fetching
    if (!session?.user?.googleId) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`/profile/${session.user.googleId}`);
        console.log(res);

        if (res.status === 404) {
          setError(true);
        }
      } catch (err) {
        console.log;
        console.log(err);

        // console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [session?.user?.googleId, status]);

  return (
    <div>
      {error ? <StepperUsage setError={setError} /> : <p>Profile Loaded</p>}
    </div>
  );
}
