/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#F6F7F9",
        surface: "#FFFFFF",
        ink: {
          50: "#F5F6F8",
          100: "#EBEDF1",
          200: "#D8DBE3",
          300: "#B7BCC9",
          400: "#8B93A7",
          500: "#6B7387",
          600: "#525A6E",
          700: "#3D4356",
          800: "#272B3A",
          900: "#171A24",
          950: "#0E1017"
        },
        brand: {
          50: "#EEF0FF",
          100: "#E0E3FF",
          200: "#C3C8FF",
          300: "#9CA3F7",
          400: "#7A80EF",
          500: "#5B5FE8",
          600: "#4740D9",
          700: "#3A34B8",
          800: "#2F2C93",
          900: "#282775"
        },
        success: { 50: "#ECFDF5", 500: "#10B981", 600: "#059669", 700: "#047857" },
        warning: { 50: "#FFFBEB", 500: "#F59E0B", 600: "#D97706", 700: "#B45309" },
        danger: { 50: "#FEF2F2", 500: "#F43F5E", 600: "#E11D48", 700: "#BE123C" },
        info: { 50: "#EFF6FF", 500: "#3B82F6", 600: "#2563EB", 700: "#1D4ED8" }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"]
      },
      boxShadow: {
        xs: "0 1px 2px rgba(15, 18, 27, 0.04)",
        card: "0 1px 2px rgba(15, 18, 27, 0.04), 0 1px 1px rgba(15, 18, 27, 0.03)",
        raised: "0 8px 24px rgba(15, 18, 27, 0.08), 0 2px 6px rgba(15, 18, 27, 0.04)",
        popover: "0 16px 40px rgba(15, 18, 27, 0.16), 0 4px 12px rgba(15, 18, 27, 0.08)"
      },
      borderRadius: {
        xl: "0.625rem",
        "2xl": "0.875rem"
      }
    }
  },
  plugins: []
};
