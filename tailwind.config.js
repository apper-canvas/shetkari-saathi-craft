/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2E7D32",
        secondary: "#558B2F",
        accent: "#FF6F00",
        success: "#43A047",
        warning: "#FB8C00",
        error: "#E53935",
        info: "#1E88E5",
        surface: "#FFFFFF",
        background: "#F1F8E9",
      },
      fontFamily: {
        display: ['Tiro Devanagari Marathi', 'serif'],
        body: ['Noto Sans Devanagari', 'sans-serif'],
      },
    },
  },
  plugins: [],
}