/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      rotate: {
        25: "25deg",
      },
      height: {
        "1/10": "10%",
        "9/10": "90%",
      },
    },
    plugins: [],
  },
};
