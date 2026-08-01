import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const theme = createSystem(
  defaultConfig,
  defineConfig({
    theme: {
      tokens: {
        colors: {
          black: { value: "#16161D" },
          text: { value: "#16161D" },
          heroGradientStart: { value: "#7928CA" },
          heroGradientEnd: { value: "#FF0080" },
        },
        fonts: {
          mono: { value: "'Menlo', monospace" },
        },
        breakpoints: {
          sm: { value: "40em" },
          md: { value: "52em" },
          lg: { value: "64em" },
          xl: { value: "80em" },
        },
      },
    },
  }),
);

export default theme;
