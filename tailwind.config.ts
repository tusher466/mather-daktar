import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F5132",
          dark: "#073B22",
          light: "#E8F5E9",
        },
        harvest: {
          DEFAULT: "#D97706",
          light: "#FFFBEB",
          border: "#FDE68A",
        },
        ground: {
          DEFAULT: "#F4F7F4",
          surface: "#FFFFFF",
          border: "#E2E8F0",
        },
        ink: {
          DEFAULT: "#0F172A",
          muted: "#475569",
        },
        danger: {
          DEFAULT: "#DC2626",
          light: "#FEF2F2",
        },
        success: {
          DEFAULT: "#16A34A",
          light: "#ECFDF5",
        },
      },
      fontFamily: {
        bengali: ["var(--font-noto-bengali)", "sans-serif"],
      },
      minHeight: {
        target: "56px",
      },
    },
  },
  plugins: [],
};
export default config;
