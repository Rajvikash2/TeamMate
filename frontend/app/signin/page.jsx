"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";

const SignInPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  handleSignIn = async () => {
    const res = await signIn("google", { redirect: "/" });
    if (res?.error) {
      console.error("Error signing in:", res.error);
    } else {
      console.log("Sign-in successful!");
      fetch(`/api/profile/getProfile/${session.user.email}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .catch((err) => {
          if (err.message === "Profile not found") {
            redirect("/profile/createProfile");
          }
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {session ? (
        <>
          <p className="text-lg">Signed in as {session.user.email}</p>
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
