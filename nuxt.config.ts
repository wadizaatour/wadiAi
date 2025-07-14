import { defineNuxtConfig } from "nuxt/config";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/color-mode"],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  plugins: ["~/plugins/pinia.js"], // Register the Pinia plugin
  runtimeConfig: {
    public: {
      openrouterApiKey: process.env.NUXT_PUBLIC_OPENROUTER_API_KEY,
    },
  },
});
