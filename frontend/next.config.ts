import type { NextConfig } from "next";

const isDev: boolean = process.env.NODE_ENV === 'development';


const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  compiler: {
    removeConsole: !isDev,
  },
};

export default nextConfig;
