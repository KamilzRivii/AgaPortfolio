import { render, screen } from '@testing-library/react';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

describe('SectionTitle', () => {
  it('renderuje tytuł z przekazanym tekstem', () => {
    render(
      <ThemeProvider theme={theme}>
        <SectionTitle>Test Title</SectionTitle>
      </ThemeProvider>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renderuje jako Typography variant h6', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <SectionTitle>Test Title</SectionTitle>
      </ThemeProvider>
    );

    const typography = container.querySelector('[class*="MuiTypography-h6"]');
    expect(typography).toBeInTheDocument();
  });

  it('akceptuje custom sx props', () => {
    render(
      <ThemeProvider theme={theme}>
        <SectionTitle sx={{ backgroundColor: 'red' }}>Custom Style</SectionTitle>
      </ThemeProvider>
    );

    expect(screen.getByText('Custom Style')).toBeInTheDocument();
  });

  it('renderuje Box jako kontener', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <SectionTitle>Boxed Title</SectionTitle>
      </ThemeProvider>
    );

    const box = container.querySelector('[class*="MuiBox"]');
    expect(box).toBeInTheDocument();
  });
});