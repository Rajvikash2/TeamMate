/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/post",
        destination: "http://localhost:4000/post/",
      },
      {
        source: "/api/profile",
        destination: "http://localhost:4000/post/",
      },
    ];
  },
};

export default nextConfig;
