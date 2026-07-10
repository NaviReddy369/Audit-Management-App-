/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14212A",
        mist: "#F4EFE6",
        sand: "#ECE2D4",
        pine: "#1E6A5A",
        ember: "#B56E2A",
        clay: "#B4503E",
        tide: "#2F5E9A"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Georgia", "serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"]
      },
      boxShadow: {
        panel: "0 24px 60px rgba(20, 33, 42, 0.08)"
      },
      borderRadius: {
        "4xl": "2rem"
      }
    }
  },
  plugins: []
};
