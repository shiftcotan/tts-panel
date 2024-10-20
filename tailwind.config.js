/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "foreground": "#ffffff",
        "background": "#1e2030",
      },
    },
  },
  plugins: [],
};
