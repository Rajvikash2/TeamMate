"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/signin"); // Redirect to the sign-in page
        }
    }, [status, router]);

    if (status === "loading") return <p>Loading...</p>;

    if (!session) return null; // Prevent rendering if no session

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl">Welcome, {session.user.name}!</h1>
            <p className="text-lg">Your Google ID: {session.user.id}</p>
        </div>
    );
};

export default Dashboard;
