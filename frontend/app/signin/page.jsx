"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const SignInPage = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      localStorage.setItem("googleId", session.user.id);
    }
  }, [session]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {session ? (
        <>
          <p className="text-lg">Signed in as {session.user.email}</p>
          <p className="text-lg">Google ID: {session.user.googleId}</p>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </>
      ) : (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => signIn("google")}
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default SignInPage;
