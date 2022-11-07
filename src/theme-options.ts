import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { Roboto } from "@next/font/google";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const themeOptions: ThemeOptions = {
  palette: {
    type: "dark",
    primary: {
      main: "#5893df",
    },
    secondary: {
      main: "#2ec5d3",
    },
    background: {
      default: "#192231",
      paper: "#24344d",
    },
    text: {
      primary: "#f3f3f3",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
    typography: {
      fontFamily: roboto.style.fontFamily,
    },
  },
};
