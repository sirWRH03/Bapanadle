import { ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Theme {
        slate: {
            main: string;
        };
    }
    // allow configuration using `createTheme()`
    interface ThemeOptions {
        slate?: {
            main: string;
        };
    }
}

export const themeOptions: ThemeOptions = {
    palette: {
        mode: "dark",
        primary: {
            main: "#7692B9",
        },
        secondary: {
            main: "#c6b7be",
        },
        background: {
            default: "#27313E",
            paper: "#262d3b",
        },
        error: {
            main: "#C23345",
        },
        warning: {
            main: "#C49A1b",
        },
        success: {
            main: "#2e7d32",
            dark: "#313C2F",
        },
    },
    typography: {
        fontFamily: "Noto Serif",
    },
    slate: {
        main: "#27313E",
    },
};
