'use client';

import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { CssBaseline, responsiveFontSizes } from '@mui/material';
import { ReactNode, useMemo } from 'react';
import { theme as baseTheme } from '@/theme';

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useMemo(() => responsiveFontSizes(baseTheme), []);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}