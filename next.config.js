/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "forumtomatoff2ae53c763b45dbbca87e217e7517e4184049-dev.s3.us-east-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
