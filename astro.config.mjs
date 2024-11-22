// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://lamnguyenz.github.io/blog",
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwind()],
  },
});
