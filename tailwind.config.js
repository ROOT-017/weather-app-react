/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "Inter"],
        Popins: ["Poppins", "Inter"],
        Lato: ["Lato", "Inter"],
      },
      colors: {
        primary: {
          100: "#E0EEF8",
          200: "#6085E9",
          300: "#6AB2F0",
          400: "#4A67CD",
        },
        secondary: {
          100: "#C1C9D5",
        },
        font: {
          100: "#021A61",
        },
      },
    },
  },
  plugins: [],
};

//how to add google fonts to tailwind via import
//Show the steps below
// 1. npm install @tailwindcss/typography
// 2. Add to tailwind.config.js
// // tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       typography: (theme) => ({
//         DEFAULT: {
//           css: {
//             color: theme("colors.gray.700"),
//             a: {
//               color: theme("colors.blue.500"),
//               "&:hover": {
//                 color: theme("colors.blue.700"),
//               },
//             },
//           },
//         },
//       }),
//     },
//   },
//   plugins: [require("@tailwindcss/typography")],
// };
