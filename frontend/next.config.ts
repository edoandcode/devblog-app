import type { NextConfig } from "next";

const isDev: boolean = process.env.NODE_ENV === 'development';


const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  compiler: {
    removeConsole: !isDev,
  },
  images: {
    unoptimized: isDev,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'devblog-cms.edoandcode.cc',
        //  port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
