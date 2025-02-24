import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import customTheme from "./theme.json";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// Uncomment this if you're using Vercel
// import vercel from "@astrojs/vercel/edge";

export default defineConfig({
  site: "https://hooks.khulnasoft.com",
  trailingSlash: "never",
  integrations: [react(), tailwind(), mdx(), sitemap()],
  output: "static",
  // Uncomment this for Vercel deployment
  // adapter: vercel(),
  markdown: {
    shikiConfig: {
      theme: customTheme,  // Ensure this is the correct path to your theme file
      langs: [],
      wrap: false
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.split('node_modules/')[1].split('/')[0];  // Splits dependencies into their own chunks
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,  // Increase chunk size warning limit to 1000 KB (default is 500 KB)
  }
});
