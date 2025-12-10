import { createTheme } from '@mui/material/styles';
import { COLORS } from '@/constants/colors';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    md2: true;
    lg: true;
    xl: true;
    xxl: true;
    xxxl: true;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.PRIMARY,
      light: COLORS.PRIMARY_LIGHT,
      dark: COLORS.PRIMARY_DARK,
      contrastText: COLORS.SECONDARY,
    },
    secondary: {
      main: COLORS.SECONDARY,
      light: COLORS.SECONDARY_LIGHT,
      dark: COLORS.SECONDARY,
      contrastText: COLORS.WHITE,
    },
    grey: {
      500: COLORS.GREY,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 700,
      md2: 800,
      lg: 1085,
      xl: 1200,
      xxl: 1400,
      xxxl: 1550,
    },
  },
  typography: {
    fontFamily: 'Georgia, sans-serif',
    h1: {
      fontWeight: 900,
    },
    h2: {
      fontWeight: 900,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 900,
    },
  },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: "url('/images/background.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          textTransform: 'none',
          fontWeight: 700,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.2)',
          },
        },
      },
    },
  },
});