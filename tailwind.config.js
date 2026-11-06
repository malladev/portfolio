const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // Hover styles only apply on devices that really hover, so they never stick after a tap.
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0B0B0F", raised: "#131318", line: "#26262E" },
        paper: { DEFAULT: "#EFE9DD", muted: "#A9A59A" },
        saffron: "#FFB52E",
        iris: "#7C4DFF",
      },
      fontFamily: {
        sans: ["Bricolage Grotesque", ...defaultTheme.fontFamily.sans],
        serif: ["Instrument Serif", ...defaultTheme.fontFamily.serif],
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};
