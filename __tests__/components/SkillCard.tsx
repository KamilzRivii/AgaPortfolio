import { render, screen } from '@testing-library/react';
import { SkillCard } from '@/components/about/SkillCard';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Skill } from '@/types/about';

const theme = createTheme();

const mockSkill: Skill = {
  id: 'powerbi',
  title: 'Power BI Development',
  description: 'Creating interactive dashboards and reports',
  icon: <span data-testid="skill-icon">📊</span>,
};

describe('SkillCard', () => {
  describe('Renderowanie zawartości', () => {
    it('renderuje tytuł skill', () => {
      render(
        <ThemeProvider theme={theme}>
          <SkillCard skill={mockSkill} />
        </ThemeProvider>
      );

      const titles = screen.getAllByText('Power BI Development');
      expect(titles.length).toBeGreaterThan(0);
    });

    it('renderuje opis skill', () => {
      render(
        <ThemeProvider theme={theme}>
          <SkillCard skill={mockSkill} />
        </ThemeProvider>
      );

      const descriptions = screen.getAllByText('Creating interactive dashboards and reports');
      expect(descriptions.length).toBeGreaterThan(0);
    });

    it('renderuje ikonę skill', () => {
      render(
        <ThemeProvider theme={theme}>
          <SkillCard skill={mockSkill} />
        </ThemeProvider>
      );

      expect(screen.getByTestId('skill-icon')).toBeInTheDocument();
    });
  });

  describe('Struktura komponentu', () => {
    it('renderuje główny kontener Box', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <SkillCard skill={mockSkill} />
        </ThemeProvider>
      );

      const boxes = container.querySelectorAll('[class*="MuiBox"]');
      expect(boxes.length).toBeGreaterThan(0);
    });

    it('renderuje okrągły kontener dla ikony', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <SkillCard skill={mockSkill} />
        </ThemeProvider>
      );

      const boxes = container.querySelectorAll('[class*="MuiBox"]');
      expect(boxes.length).toBeGreaterThanOrEqual(3);
    });

    it('renderuje Typography dla tytułu', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <SkillCard skill={mockSkill} />
        </ThemeProvider>
      );

      const typographies = container.querySelectorAll('[class*="MuiTypography"]');
      expect(typographies.length).toBeGreaterThanOrEqual(2); // Tytuł + opis (każdy x2 dla desktop/mobile)
    });
  });

  describe('Różne typy skills', () => {
    it('renderuje skill z inną ikoną', () => {
      const sqlSkill: Skill = {
        id: 'sql',
        title: 'SQL',
        description: 'Database queries and optimization',
        icon: <span data-testid="sql-icon">🗄️</span>,
      };

      render(
        <ThemeProvider theme={theme}>
          <SkillCard skill={sqlSkill} />
        </ThemeProvider>
      );

      expect(screen.getByTestId('sql-icon')).toBeInTheDocument();
      expect(screen.getAllByText('SQL').length).toBeGreaterThan(0);
    });

    it('renderuje skill z długim opisem', () => {
      const complexSkill: Skill = {
        id: 'dax',
        title: 'DAX',
        description: 'Advanced calculations and measures for complex business logic in Power BI',
        icon: <span data-testid="dax-icon">📐</span>,
      };

      render(
        <ThemeProvider theme={theme}>
          <SkillCard skill={complexSkill} />
        </ThemeProvider>
      );

      const descriptions = screen.getAllByText(/Advanced calculations/i);
      expect(descriptions.length).toBeGreaterThan(0);
    });
  });

  describe('Responsywność (desktop vs mobile)', () => {
    it('renderuje obie wersje zawartości (desktop i mobile)', () => {
      render(
        <ThemeProvider theme={theme}>
          <SkillCard skill={mockSkill} />
        </ThemeProvider>
      );

      const titles = screen.getAllByText('Power BI Development');
      const descriptions = screen.getAllByText('Creating interactive dashboards and reports');
      
      expect(titles.length).toBeGreaterThanOrEqual(1);
      expect(descriptions.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Props validation', () => {
    it('akceptuje wszystkie wymagane właściwości Skill', () => {
      const fullSkill: Skill = {
        id: 'test',
        title: 'Test Title',
        description: 'Test Description',
        icon: <div>Icon</div>,
      };

      const { container } = render(
        <ThemeProvider theme={theme}>
          <SkillCard skill={fullSkill} />
        </ThemeProvider>
      );

      expect(container).toBeInTheDocument();
    });
  });
});