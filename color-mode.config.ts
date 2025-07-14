export default {
  preference: "light", // always start in light mode
  fallback: "light",
  value: "light", // force light mode on first load
  classSuffix: "",
  selector: "body", // Ensures dark class is applied to <body> for Tailwind
  storageKey: "nuxt-color-mode",
  // Never use system preference
  detectBrowserColorScheme: false,
};
