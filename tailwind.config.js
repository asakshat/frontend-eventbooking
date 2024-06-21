/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        retro: {
          primary: "#ea986b",
          secondary: "#a7dfef",
          accent: "#ff5722",
          neutral: "#ce7822",
          "base-100": "#f3eed7",
          info: "#2196f3",
          success: "#4caf50",
          warning: "#fb8c00",
          error: "#f44336",
        },
        night: {
          primary: "#5989ff",
          secondary: "#e362d1",
          accent: "#8b5cf6",
          neutral: "#2a2e37",
          "base-100": "#18181b",
          info: "#0ea5e9",
          success: "#22c55e",
          warning: "#eab308",
          error: "#ef4444",
        },
      },
    ],
  },
};
