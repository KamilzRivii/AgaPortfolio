import { render, screen } from '@testing-library/react';
import Line from '@/components/Line';
import { ThemeProvider, createTheme } from '@mui/material/styles';

jest.mock('@/constants/layout', () => ({
  LAYOUT_CONSTANTS: {
    LINE: {
      TOP_OFFSET: 100,
      WIDTH: 2,
      HEIGHT: 600,
    },
    LINE_DOT: {
      WIDTH: 20,
      HEIGHT: 20,
    },
    RADIUS: {
      STANDARD: '50%',
    },
  },
}));

const theme = createTheme();

describe('Line', () => {
  it('renderuje komponent Line', () => {
    render(
      <ThemeProvider theme={theme}>
        <Line />
      </ThemeProvider>
    );

    const { container } = render(
      <ThemeProvider theme={theme}>
        <Line />
      </ThemeProvider>
    );

    const boxes = container.querySelectorAll('[class*="MuiBox"]');
    expect(boxes.length).toBeGreaterThan(0);
  });

  it('renderuje linię i kropkę', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Line />
      </ThemeProvider>
    );

    const boxes = container.querySelectorAll('[class*="MuiBox"]');
    expect(boxes.length).toBeGreaterThanOrEqual(3);
  });
});