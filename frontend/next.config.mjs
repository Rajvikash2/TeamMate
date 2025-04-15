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
      //
      {
        source: "/api/post",
        destination: "http://localhost:4000/post",
      },
      {
        source: "/post/:path*",
        destination: "http://localhost:4000/post/:path*",
      },
      {
        source: "/api/profile/:path*",
        destination: "http://localhost:4000/profile/:path*",
      },
      {
        source: "/post/create/:path*",
        destination: "http://localhost:4000/post/create/:path*",
      },
      {
        source: "/api/application/create/:postId/:googleId",
        destination:
          "http://localhost:4000/application/create/:postId/:googleId",
      },
      {
        source: "/api/like/check/:postId/:googleId",
        destination: "http://localhost:4000/like/check/:postId/:googleId",
      },
      {
        source: "/api/like/toggle/:postId/:googleId",
        destination: "http://localhost:4000/like/toggle/:postId/:googleId",
      },
      {
        source: "/api/application/pending/:path*",
        destination: "http://localhost:4000/application/pending/:path*",
      },
      {
        source: "/api/application/accepted/:path*",
        destination: "http://localhost:4000/application/accepted/:path*",
      },
      {
        source: "/api/application/rejected/:path*",
        destination: "http://localhost:4000/application/rejected/:path*",
      },
    ];
  },
};
export default nextConfig;
