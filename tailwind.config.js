/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        kairos: {
          primary: "#1E3A8A",
          dark: "#0F172A",
          accent: "#06B6D4",
        },
      },
    },
  },
  plugins: [],
};
