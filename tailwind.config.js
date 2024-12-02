/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}",],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#ffffff",
        tertiary: "#242424",
        quaternary: "#C0C0C0"

      },
      fontFamily: {
        sc300: ["source-code-pro-v23-cyrillic_latin-300", "sans-serif"],
        sc500: ["source-code-pro-v23-cyrillic_latin-500", "sans-serif"],
        scSB: ["SourceCodePro-SemiBold", "sans-serif"],
        scBlack: ["SourceCodePro-Black", "sans-serif"],
        scBold: ["SourceCodePro-Bold", "sans-serif"],
        scExtraBold: ["SourceCodePro-ExtraBold", "sans-serif"],
        scExtraLight: ["SourceCodePro-ExtraLight", "sans-serif"],
        scLight: ["SourceCodePro-Light", "sans-serif"],
        scMedium: ["SourceCodePro-Medium", "sans-serif"],
        scRegular: ["SourceCodePro-Regular", "sans-serif"],
        // "SourceCodePro-Black": require("../assets/fonts/SourceCodePro-Black.ttf"),
        // "SourceCodePro-Bold": require("../assets/fonts/SourceCodePro-Bold.ttf"),
        // "SourceCodePro-ExtraBold": require("../assets/fonts/SourceCodePro-ExtraBold.ttf"),
        // "SourceCodePro-ExtraLight": require("../assets/fonts/SourceCodePro-ExtraLight.ttf"),
        // "SourceCodePro-Light": require("../assets/fonts/SourceCodePro-Light.ttf"),
        // "SourceCodePro-Medium": require("../assets/fonts/SourceCodePro-Medium.ttf"),
        // "SourceCodePro-Regular": require("../assets/fonts/SourceCodePro-Regular.ttf"),
        // "SourceCodePro-SemiBold": require("../assets/fonts/SourceCodePro-SemiBold.ttf"),
      },
    },
  },
  plugins: [],
}

