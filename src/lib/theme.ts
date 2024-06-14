import { createTheme } from "@mantine/core";

const theme = createTheme({
  breakpoints: {
    mobleSM: '320px',
    mobileMD: '375px',
    mobileLG: '425px',
    tablet: '800px',
    laptop: '1024px',
    xl: '90em',
  },
});

export default theme;