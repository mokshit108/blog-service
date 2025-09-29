/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@rainbow-me/rainbowkit/**/*.js", // scan RainbowKit for Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        background: "#f9fafb",   // bg-background
        border: "#E5E7EB",       // border-border
        foreground: "#111827",   // text-foreground
        primary: "#6366F1",      // text-primary or bg-primary
        secondary: "#64748B",    // text-secondary
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
  safelist: [
    "bg-background",
    "border-border",
    "text-foreground",
    "bg-primary",
    "text-primary",
    "text-secondary",
    "bg-secondary",
  ],
};
