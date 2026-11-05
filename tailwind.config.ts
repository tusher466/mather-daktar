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
          DEFAULT: "#1F6B3A",
          dark: "#154D2A",
          light: "#E8F5E9",
        },
        harvest: {
          DEFAULT: "#C9892B",
          light: "#FFF4DC",
          border: "#EAD4AA",
        },
        ground: {
          DEFAULT: "#F6F3EA",
          surface: "#FFFFFF",
          border: "#E3DDCB",
        },
        ink: {
          DEFAULT: "#1A1A1A",
          muted: "#4D4D45",
        },
        danger: {
          DEFAULT: "#B3261E",
          light: "#FDE8E8",
        },
        success: {
          DEFAULT: "#2E7D32",
          light: "#E8F5E9",
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
