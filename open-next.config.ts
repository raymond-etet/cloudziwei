import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Uncomment to enable R2 cache,
  // It should be imported as:
  // `import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";`
  // See https://opennext.js.org/cloudflare/caching for more details
  // incrementalCache: r2IncrementalCache,

  // Configure edge runtime functions
  functions: {
    "api/astrology/ziwei": {
      runtime: "edge",
    },
    "api/auth/[...nextauth]": {
      runtime: "edge",
    },
    "api/files/[...path]": {
      runtime: "edge",
    },
    "api/upload": {
      runtime: "edge",
    },
  },
});
