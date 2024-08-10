/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  reactStrictMode: false,
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  webpack: (config, { isServer }) => {
    // Exclude .map files from being bundled
    config.module.rules.push({
      test: /\.map$/,
      use: "null-loader",
    });

    return config;
  },
};

export default nextConfig;
