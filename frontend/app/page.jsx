"use client";
import Aurora from "./components/Aurora";
import CardShow from "./components/CardShow";

export default function Home() {
  return (
    <div className="flex flex-col items-center  min-h-screen py-2">
      <Aurora
        colorStops={["#3A29FF", "#3A29FF", "#10f1ee"]}
        blend={0.5}
        amplitude={2.0}
        speed={0.8}
      />

      {/*  */}
      <div className="flex flex-col gap-5 items-center">
        <h1 className="main-head text-8xl">
          Collab
          <span className="bg-[#3abcf0] p-2 rounded-xl text-black">
            Connect
          </span>
        </h1>

        <p className="sub-head text-2xl text-center mt-5 text-gray-500">
          A place where you get expericence by working!
        </p>
      </div>

      {/*  */}

      <CardShow />
    </div>
  );
}
