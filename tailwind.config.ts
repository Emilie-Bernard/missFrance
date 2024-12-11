import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(card|table|ripple|checkbox|spacer).js"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: "#93804c",
        "default-100": "#0a0a0a",
        "default-200": "#ffffff",
      },
    },
  },
  plugins: [nextui()],
} satisfies Config;
