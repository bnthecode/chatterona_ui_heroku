import { createMuiTheme } from "@material-ui/core";
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#202225",
      main: "#36393f",
      dark: "#202225",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#212121",
      main: "#7289da",
      dark: "#23272a",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "Open Sane",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      "Uni Sans",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": "Open Sans",
      },
    },

    MuiTooltip: {
      tooltip: {
        fontSize: 12,
        opacity: ".8",
        fontWeight: 700,
        color: "#fff",
        padding: 10,
        backgroundColor: "#202225",
      },
    },
    MuiTextField: {
      // to bring in later
    },
  },
});

export default theme;

// --header-primary: #fff;
//     --header-secondary: #b9bbbe;
//     --text-normal: #dcddde;
//     --text-muted: #72767d;
//     --text-link: #00b0f4;
//     --channels-default: #8e9297;
//     --interactive-normal: #b9bbbe;
//     --interactive-hover: #dcddde;
//     --interactive-active: #fff;
//     --interactive-muted: #4f545c;
//     --background-primary: #36393f;
//     --background-secondary: #2f3136;
//     --background-secondary-alt: #292b2f;
//     --background-tertiary: #202225;
//     --background-accent: #4f545c;
//     --background-floating: #18191c;
//     --background-mobile-primary: #36393f;
//     --background-mobile-secondary: #2f3136;
//     --background-modifier-hover: rgba(79,84,92,0.16);
//     --background-modifier-active: rgba(79,84,92,0.24);
//     --background-modifier-selected: rgba(79,84,92,0.32);
//     --background-modifier-accent: hsla(0,0%,100%,0.06);
//     --background-mentioned: rgba(250,166,26,0.05);
//     --background-mentioned-hover: rgba(250,166,26,0.08);
//     --background-message-hover: rgba(4,4,5,0.07);
//     --background-help-warning: rgba(250,166,26,0.1);
//     --background-help-info: rgba(0,176,244,0.1);
//     --scrollbar-thin-thumb: #202225;
//     --scrollbar-thin-track: transparent;
//     --scrollbar-auto-thumb: #202225;
//     --scrollbar-auto-track: #2e3338;
//     --scrollbar-auto-scrollbar-color-thumb: #202225;
//     --scrollbar-auto-scrollbar-color-track: #2f3136;
//     --elevation-stroke: 0 0 0 1px rgba(4,4,5,0.15);
//     --elevation-low: 0 1px 0 rgba(4,4,5,0.2),0 1.5px 0 rgba(6,6,7,0.05),0 2px 0 rgba(4,4,5,0.05);
//     --elevation-medium: 0 4px 4px rgba(0,0,0,0.16);
//     --elevation-high: 0 8px 16px rgba(0,0,0,0.24);
//     --logo-primary: #fff;
//     --focus-primary: #00b0f4;
//     --radio-group-dot-foreground: #8ea1e1;
//     --guild-header-text-shadow: 0 1px 1px rgba(0,0,0,0.4);
//     --channeltextarea-background: #40444b;
//     --activity-card-background: #202225;
//     --textbox-markdown-syntax: #8e9297;
//     --deprecated-card-bg: rgba(32,34,37,0.6);
//     --deprecated-card-editable-bg: rgba(32,34,37,0.3);
//     --deprecated-store-bg: #36393f;
//     --deprecated-quickswitcher-input-background: #72767d;
//     --deprecated-quickswitcher-input-placeholder: hsla(0,0%,100%,0.3);
//     --deprecated-text-input-bg: rgba(0,0,0,0.1);
