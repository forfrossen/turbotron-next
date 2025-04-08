/** @type {import('next').NextConfig} */
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui", "jotai-devtools", "@repo/database"],
  serverExternalPackages: ["thread-stream", "pino", "pino-worker", "pino-file", "pino-pretty"],
  allowedDevOrigins: ["localhost", "192.168.178.81", "*.euw.devtunnels.ms"],
  experimental: {
    reactCompiler: true,
    serverActions: {
      allowedOrigins: ["https://localhost:3000", "https://c9r889n2-3000.euw.devtunnels.ms"]
    }
  },
  // output: "export",
  images: {
    unoptimized: true
  },
  compiler: {
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
    styledComponents: {
      // Enabled by default in development, disabled in production to reduce file size,
      // setting this will override the default for all environments.
      displayName: true,
      // Enabled by default.
      ssr: true,
      // Enabled by default.
      fileName: true,
      // Defaults to ["index"].
      meaninglessFileNames: ["index", "styles"],
      // Enabled by default.
      minify: false,
      // Enabled by default.
      transpileTemplateLiterals: true,
      // Empty by default.
      namespace: "repo",
      // Disabled by default.
      pure: false
    }
  }
};

export default nextConfig;
