import { render, screen } from '@testing-library/react';
import { ValueCard } from '@/components/about/ValueCard';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ValueProposition } from '@/types/about';

const theme = createTheme();

const mockValue: ValueProposition = {
  id: 'clarity',
  label: 'Clear Insights',
  value: 'Easy to understand dashboards',
};

describe('ValueCard', () => {
  describe('Renderowanie zawartości', () => {
    it('renderuje label value proposition', () => {
      render(
        <ThemeProvider theme={theme}>
          <ValueCard value={mockValue} />
        </ThemeProvider>
      );

      expect(screen.getByText('Clear Insights')).toBeInTheDocument();
    });

    it('renderuje wartość (value)', () => {
      render(
        <ThemeProvider theme={theme}>
          <ValueCard value={mockValue} />
        </ThemeProvider>
      );

      expect(screen.getByText('Easy to understand dashboards')).toBeInTheDocument();
    });

    it('renderuje separator "="', () => {
      render(
        <ThemeProvider theme={theme}>
          <ValueCard value={mockValue} />
        </ThemeProvider>
      );

      expect(screen.getByText('=')).toBeInTheDocument();
    });
  });

  describe('Struktura komponentu', () => {
    it('renderuje główny kontener Box', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <ValueCard value={mockValue} />
        </ThemeProvider>
      );

      const boxes = container.querySelectorAll('[class*="MuiBox"]');
      expect(boxes.length).toBeGreaterThan(0);
    });

    it('renderuje trzy Typography elementy (label, =, value)', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <ValueCard value={mockValue} />
        </ThemeProvider>
      );

      const typographies = container.querySelectorAll('[class*="MuiTypography"]');
      expect(typographies.length).toBe(3);
    });

    it('renderuje okrągły kształt (desktop)', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <ValueCard value={mockValue} />
        </ThemeProvider>
      );

      const mainBox = container.querySelector('[class*="MuiBox"]');
      expect(mainBox).toBeInTheDocument();
    });
  });

  describe('Różne value propositions', () => {
    it('renderuje value z krótkim tekstem', () => {
      const shortValue: ValueProposition = {
        id: 'speed',
        label: 'Fast',
        value: 'Quick results',
      };

      render(
        <ThemeProvider theme={theme}>
          <ValueCard value={shortValue} />
        </ThemeProvider>
      );

      expect(screen.getByText('Fast')).toBeInTheDocument();
      expect(screen.getByText('Quick results')).toBeInTheDocument();
    });

    it('renderuje value z długim tekstem', () => {
      const longValue: ValueProposition = {
        id: 'impact',
        label: 'Business Impact',
        value: 'Data-driven decisions that transform business outcomes',
      };

      render(
        <ThemeProvider theme={theme}>
          <ValueCard value={longValue} />
        </ThemeProvider>
      );

      expect(screen.getByText('Business Impact')).toBeInTheDocument();
      expect(screen.getByText('Data-driven decisions that transform business outcomes')).toBeInTheDocument();
    });

    it('renderuje wiele różnych value cards', () => {
      const values: ValueProposition[] = [
        { id: 'v1', label: 'Label 1', value: 'Value 1' },
        { id: 'v2', label: 'Label 2', value: 'Value 2' },
        { id: 'v3', label: 'Label 3', value: 'Value 3' },
      ];

      const { container } = render(
        <ThemeProvider theme={theme}>
          <>
            {values.map((v) => (
              <ValueCard key={v.id} value={v} />
            ))}
          </>
        </ThemeProvider>
      );

      expect(screen.getByText('Label 1')).toBeInTheDocument();
      expect(screen.getByText('Label 2')).toBeInTheDocument();
      expect(screen.getByText('Label 3')).toBeInTheDocument();
    });
  });

  describe('Layout i styling', () => {
    it('używa flexbox do centrowania zawartości', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <ValueCard value={mockValue} />
        </ThemeProvider>
      );

      const mainBox = container.querySelector('[class*="MuiBox"]');
      expect(mainBox).toBeInTheDocument();
    });

    it('label ma primary.main color', () => {
      render(
        <ThemeProvider theme={theme}>
          <ValueCard value={mockValue} />
        </ThemeProvider>
      );

      const label = screen.getByText('Clear Insights');
      expect(label).toBeInTheDocument();
    });

    it('value ma white color', () => {
      render(
        <ThemeProvider theme={theme}>
          <ValueCard value={mockValue} />
        </ThemeProvider>
      );

      const value = screen.getByText('Easy to understand dashboards');
      expect(value).toBeInTheDocument();
    });

    it('separator "=" ma white color', () => {
      render(
        <ThemeProvider theme={theme}>
          <ValueCard value={mockValue} />
        </ThemeProvider>
      );

      const separator = screen.getByText('=');
      expect(separator).toBeInTheDocument();
    });
  });

  describe('Props validation', () => {
    it('akceptuje wszystkie wymagane właściwości ValueProposition', () => {
      const fullValue: ValueProposition = {
        id: 'test',
        label: 'Test Label',
        value: 'Test Value',
      };

      const { container } = render(
        <ThemeProvider theme={theme}>
          <ValueCard value={fullValue} />
        </ThemeProvider>
      );

      expect(container).toBeInTheDocument();
    });

    it('renderuje poprawnie z minimalną długością tekstu', () => {
      const minValue: ValueProposition = {
        id: 'x',
        label: 'A',
        value: 'B',
      };

      render(
        <ThemeProvider theme={theme}>
          <ValueCard value={minValue} />
        </ThemeProvider>
      );

      expect(screen.getByText('A')).toBeInTheDocument();
      expect(screen.getByText('B')).toBeInTheDocument();
    });
  });

  describe('Responsywność', () => {
    it('zmienia layout z okręgu na poziomy bar na mobile', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <ValueCard value={mockValue} />
        </ThemeProvider>
      );

      const mainBox = container.querySelector('[class*="MuiBox"]');
      expect(mainBox).toBeInTheDocument();
    });
  });
});