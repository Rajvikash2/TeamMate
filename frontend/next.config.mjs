/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/post",
        destination: "http://localhost:4000/post/",
      },
      {
        source: "/post/:path*",
        destination: "http://localhost:4000/post/:path*",
      },
      {
        source: "/profile/:path*",
        destination: "http://localhost:4000/profile/:path*",
      },
    ];
  },
};
export default nextConfig;
