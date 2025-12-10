import { render, screen } from '@testing-library/react';
import { SkillsSection } from '@/components/about/SkillsSection';
import { ThemeProvider, createTheme } from '@mui/material/styles';

jest.mock('@/components/shared/SectionTitle', () => ({
  SectionTitle: ({ children, sx }: any) => (
    <div data-testid="section-title" data-sx={JSON.stringify(sx)}>
      {children}
    </div>
  ),
}));

jest.mock('@/components/about/SkillCard', () => ({
  SkillCard: ({ skill }: any) => (
    <div data-testid={`skill-card-${skill.id}`}>{skill.title}</div>
  ),
}));

jest.mock('@/constants/about', () => ({
  SKILLS: [
    { id: 'skill1', title: 'Power BI Development' },
    { id: 'skill2', title: 'Data Analysis' },
    { id: 'skill3', title: 'SQL' },
  ],
}));

const theme = createTheme();

describe('SkillsSection', () => {
  it('renderuje tytuł mobilny "What I Do?"', () => {
    render(
      <ThemeProvider theme={theme}>
        <SkillsSection />
      </ThemeProvider>
    );

    expect(screen.getByText('What I Do?')).toBeInTheDocument();
  });

  it('renderuje wszystkie skill cards z SKILLS', () => {
    render(
      <ThemeProvider theme={theme}>
        <SkillsSection />
      </ThemeProvider>
    );

    expect(screen.getByTestId('skill-card-skill1')).toBeInTheDocument();
    expect(screen.getByTestId('skill-card-skill2')).toBeInTheDocument();
    expect(screen.getByTestId('skill-card-skill3')).toBeInTheDocument();
  });

  it('renderuje poprawną liczbę skill cards', () => {
    render(
      <ThemeProvider theme={theme}>
        <SkillsSection />
      </ThemeProvider>
    );

    const skillCards = screen.getAllByTestId(/skill-card-/);
    expect(skillCards).toHaveLength(3);
  });

  it('przekazuje skill object do każdej SkillCard', () => {
    render(
      <ThemeProvider theme={theme}>
        <SkillsSection />
      </ThemeProvider>
    );

    expect(screen.getByText('Power BI Development')).toBeInTheDocument();
    expect(screen.getByText('Data Analysis')).toBeInTheDocument();
    expect(screen.getByText('SQL')).toBeInTheDocument();
  });
});
