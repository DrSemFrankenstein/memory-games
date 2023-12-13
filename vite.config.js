import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/memory-games/", // Update the base here
  plugins: [
    react(),
    VitePWA({
      manifest: {
        short_name: "Memory Games",
        name: "Memory Games",
        start_url: "/memory-games/",
        display: "standalone",
        theme_color: "#455a64",
        background_color: "#455a64",
        icons: [
          {
            src: "/memory-games/icons/favicon-32x32.png", // Update the paths here
            sizes: "96x96",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/memory-games/icons/apple-touch-icon.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/memory-games/icons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/memory-games/icons/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
