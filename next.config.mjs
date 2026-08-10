import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

const realVisitTracker = path.join(root, "app", "admin", "components", "VisitTracker.js");
const stubVisitTracker = path.join(root, "app", "lib", "visit-tracker-stub.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // app/admin is gitignored (local-only admin), so git-based deploy builds
    // won't have it. Route the tracker import to a no-op stub in that case;
    // locally the real component is used.
    config.resolve.alias = {
      ...config.resolve.alias,
      "@admin/VisitTracker": existsSync(realVisitTracker) ? realVisitTracker : stubVisitTracker,
    };
    return config;
  },
};

export default nextConfig;
