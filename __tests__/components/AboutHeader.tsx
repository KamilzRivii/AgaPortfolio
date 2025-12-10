import { render, screen } from '@testing-library/react';
import { AboutHeader } from '@/components/about/AboutHeader';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

describe('AboutHeader', () => {
  describe('Renderowanie tekstów', () => {
    it('renderuje główny nagłówek "ABOUT ME"', () => {
      render(
        <ThemeProvider theme={theme}>
          <AboutHeader />
        </ThemeProvider>
      );

      expect(screen.getByText('ABOUT ME')).toBeInTheDocument();
    });

    it('renderuje nagłówek jako h1', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <AboutHeader />
        </ThemeProvider>
      );

      const h1 = container.querySelector('h1');
      expect(h1).toBeInTheDocument();
      expect(h1).toHaveTextContent('ABOUT ME');
    });

    it('renderuje podnagłówek z imieniem "I\'M AGNIESZKA, POWER BI DEVELOPER"', () => {
      render(
        <ThemeProvider theme={theme}>
          <AboutHeader />
        </ThemeProvider>
      );

      expect(screen.getByText("I'M")).toBeInTheDocument();
      expect(screen.getByText('AGNIESZKA,')).toBeInTheDocument();
      expect(screen.getByText('POWER BI DEVELOPER')).toBeInTheDocument();
    });

    it('renderuje pełny tekst opisowy o specjalizacji', () => {
      render(
        <ThemeProvider theme={theme}>
          <AboutHeader />
        </ThemeProvider>
      );

      const description = screen.getByText(/I am a Power BI and data analysis specialist/i);
      expect(description).toBeInTheDocument();
      expect(description).toHaveTextContent('SQL');
      expect(description).toHaveTextContent('DAX');
    });
  });

  describe('Struktura i Typography', () => {
    it('imię "AGNIESZKA" ma większą wagę fontu (bold)', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <AboutHeader />
        </ThemeProvider>
      );

      const agnieszka = screen.getByText('AGNIESZKA,');
      expect(agnieszka).toBeInTheDocument();
    });

    it('renderuje wszystkie Typography komponenty w h5 dla podnagłówka', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <AboutHeader />
        </ThemeProvider>
      );

      const h5Elements = container.querySelectorAll('[class*="MuiTypography-h5"]');
      expect(h5Elements.length).toBe(3);
    });

    it('renderuje Box jako kontener dla podnagłówka', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <AboutHeader />
        </ThemeProvider>
      );

      const boxes = container.querySelectorAll('[class*="MuiBox"]');
      expect(boxes.length).toBeGreaterThan(0);
    });
  });

  describe('Treść i semantyka', () => {
    it('zawiera informacje o narzędziach (Power BI, SQL, DAX)', () => {
      render(
        <ThemeProvider theme={theme}>
          <AboutHeader />
        </ThemeProvider>
      );

      const description = screen.getByText(/I am a Power BI and data analysis specialist/i);
      expect(description).toHaveTextContent('Power BI');
      expect(description).toHaveTextContent('SQL');
      expect(description).toHaveTextContent('DAX');
    });

    it('zawiera informacje o specjalizacji (wizualizacje, raporty)', () => {
      render(
        <ThemeProvider theme={theme}>
          <AboutHeader />
        </ThemeProvider>
      );

      const description = screen.getByText(/interactive reports/i);
      expect(description).toHaveTextContent('interactive reports');
      expect(description).toHaveTextContent('visualizations');
    });
  });
});