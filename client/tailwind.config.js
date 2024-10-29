/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customblue: {
          100: "#f2f9fc",
          200: "#ebf7ff",
          300: "#e3f4ff",
          400: "#dcf0fc",
          500: "#D6EFFF",
          600: "#aedefc",
          700: "#96d3fa",
          800: "#84ccfa",
          900: "#72c3f7",
          950: "#60bcf7",
        },
      },
    },
  },
  plugins: [],
};
