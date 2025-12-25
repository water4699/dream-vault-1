import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  headers() {
    // FHEVM requires COOP and COEP headers
    // But Base Account SDK conflicts with COOP: same-origin
    // We'll set COOP conditionally or use unsafe-none for Base compatibility
    return Promise.resolve([
      {
        source: '/',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            // Use 'unsafe-none' to avoid Base Account SDK conflict
            // FHEVM should still work with this setting
            value: 'unsafe-none',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
        ],
      },
    ]);
  }
};

export default nextConfig;

