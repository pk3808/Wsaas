import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow accessing the dev server from local network IP
  allowedDevOrigins: ['10.173.189.228'],
};

export default nextConfig;
