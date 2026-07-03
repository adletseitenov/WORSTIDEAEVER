import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Хакатон-режим: не ронять прод-билд из-за линта/строгих правил.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
