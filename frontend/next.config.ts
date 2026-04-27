import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
    NEXT_PUBLIC_WHATSAPP_RECEIVER: process.env.NEXT_PUBLIC_WHATSAPP_RECEIVER || "5511914136961"
  }
};

export default nextConfig;
