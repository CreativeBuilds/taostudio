/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      backgroundImage: {
        "hover-mask":
          "linear-gradient(187deg, rgba(0, 0, 0, 0.50) 10.44%, rgba(0, 0, 0, 0.00) 100%)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        eagleLake: ["Eagle Lake", "cursive"],
      },
      boxShadow: {
        "card-inset": "0px 21px 83px 0px #00111B inset",
      },
    },
  },
  plugins: [],
};
