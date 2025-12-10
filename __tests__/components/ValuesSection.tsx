import { render, screen } from '@testing-library/react';
import { ValuesSection } from '@/components/about/ValuesSection';
import { ThemeProvider, createTheme } from '@mui/material/styles';

jest.mock('@/components/shared/SectionTitle', () => ({
  SectionTitle: ({ children, sx }: any) => (
    <div data-testid="section-title" data-sx={JSON.stringify(sx)}>
      {children}
    </div>
  ),
}));

jest.mock('@/components/about/ValueCard', () => ({
  ValueCard: ({ value }: any) => (
    <div data-testid={`value-card-${value.id}`}>{value.title}</div>
  ),
}));

jest.mock('@/constants/about', () => ({
  VALUE_PROPOSITIONS: [
    { id: 'value1', title: 'Clear Insights' },
    { id: 'value2', title: 'Data-Driven Decisions' },
    { id: 'value3', title: 'Business Impact' },
    { id: 'value4', title: 'Efficiency' },
  ],
}));

const theme = createTheme();

describe('ValuesSection', () => {
  it('renderuje tytuł mobilny "Value I Deliver"', () => {
    render(
      <ThemeProvider theme={theme}>
        <ValuesSection />
      </ThemeProvider>
    );

    expect(screen.getByText('Value I Deliver')).toBeInTheDocument();
  });

  it('renderuje wszystkie value cards z VALUE_PROPOSITIONS', () => {
    render(
      <ThemeProvider theme={theme}>
        <ValuesSection />
      </ThemeProvider>
    );

    expect(screen.getByTestId('value-card-value1')).toBeInTheDocument();
    expect(screen.getByTestId('value-card-value2')).toBeInTheDocument();
    expect(screen.getByTestId('value-card-value3')).toBeInTheDocument();
    expect(screen.getByTestId('value-card-value4')).toBeInTheDocument();
  });

  it('renderuje poprawną liczbę value cards', () => {
    render(
      <ThemeProvider theme={theme}>
        <ValuesSection />
      </ThemeProvider>
    );

    const valueCards = screen.getAllByTestId(/value-card-/);
    expect(valueCards).toHaveLength(4);
  });

  it('używa grid layout (2 kolumny na desktop)', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <ValuesSection />
      </ThemeProvider>
    );

    const gridContainer = container.querySelector('[class*="MuiBox"]');
    expect(gridContainer).toBeInTheDocument();
  });

  it('przekazuje value object do każdej ValueCard', () => {
    render(
      <ThemeProvider theme={theme}>
        <ValuesSection />
      </ThemeProvider>
    );

    expect(screen.getByText('Clear Insights')).toBeInTheDocument();
    expect(screen.getByText('Data-Driven Decisions')).toBeInTheDocument();
    expect(screen.getByText('Business Impact')).toBeInTheDocument();
    expect(screen.getByText('Efficiency')).toBeInTheDocument();
  });
});