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
        source: "/api/profile",
        destination: "http://localhost:4000/profile/",
      },
    ];
  },
};

export default nextConfig;
