"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/signin");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="w-40 h-6 bg-gray-300 rounded animate-pulse mb-2"></div>
                <div className="w-60 h-4 bg-gray-300 rounded animate-pulse"></div>
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl">Welcome, {session.user.name}!</h1>
            <p className="text-lg">Your Google ID: {session.user.googleId}</p>
        </div>
    );
};

export default Dashboard;
