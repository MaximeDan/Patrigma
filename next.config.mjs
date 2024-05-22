/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.assets.so",
      },
    ],
  },
};

export default nextConfig;
