"use client";
import React, { useEffect, useState } from "react";
import StepperUsage from "./StepperUsage";
import { useSession } from "next-auth/react";
import UserProfile from "./UserProfile";

export default function Profile() {
  const { data: session, status } = useSession();
  const [error, setError] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (status === "loading") return; // Ensure session is ready before fetching
    if (!session?.user?.googleId) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/profile/${session.user.googleId}`);
        // console.log(res);
        const data = await res.json();
        console.log(data);

        if (res.status === 404) {
          setError(true);
        } else if (res.ok) {
          setProfile(data);
        } else {
          console.error("Unexpected error", data);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [session?.user?.googleId, status]);

  return (
    <div>
      {error ? (
        <StepperUsage setError={setError} />
      ) : profile ? (
        <UserProfile  profile={profile} />
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}