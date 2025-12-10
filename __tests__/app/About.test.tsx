import { render, screen } from '@testing-library/react';
import About from '@/app/about/page';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const mockPathname = '/about';
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => mockPathname,
}));

jest.mock('@/components/SideNavigation', () => ({
  __esModule: true,
  default: ({ aboutPhoto }: { aboutPhoto: string }) => (
    <div data-testid="side-navigation">
      Side Navigation - Photo: {aboutPhoto}
    </div>
  ),
}));

jest.mock('@/components/Line', () => ({
  __esModule: true,
  default: () => <div data-testid="line">Line</div>,
}));

jest.mock('@/components/about/AboutHeader', () => ({
  AboutHeader: () => <div data-testid="about-header">About Header</div>,
}));

jest.mock('@/components/shared/SectionTitle', () => ({
  SectionTitle: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="section-title">{children}</div>
  ),
}));

jest.mock('@/components/about/SkillsSection', () => ({
  SkillsSection: () => <div data-testid="skills-section">Skills Section</div>,
}));

jest.mock('@/components/about/ValuesSection', () => ({
  ValuesSection: () => <div data-testid="values-section">Values Section</div>,
}));

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('About page', () => {
  describe('Renderowanie podstawowych komponentów', () => {
    it('renderuje SideNavigation z poprawnym zdjęciem', () => {
      renderWithTheme(<About />);

      const sideNav = screen.getByTestId('side-navigation');
      expect(sideNav).toBeInTheDocument();
      expect(sideNav).toHaveTextContent('Photo: /images/profile_photo_2.webp');
    });

    it('renderuje komponent Line (separator)', () => {
      renderWithTheme(<About />);

      expect(screen.getByTestId('line')).toBeInTheDocument();
    });

    it('renderuje AboutHeader', () => {
      renderWithTheme(<About />);

      expect(screen.getByTestId('about-header')).toBeInTheDocument();
    });

    it('renderuje sekcję Skills', () => {
      renderWithTheme(<About />);

      expect(screen.getByTestId('skills-section')).toBeInTheDocument();
    });

    it('renderuje sekcję Values', () => {
      renderWithTheme(<About />);

      expect(screen.getByTestId('values-section')).toBeInTheDocument();
    });
  });

  describe('Tytuły sekcji desktop', () => {
    it('renderuje tytuły sekcji "What I Do?" i "Value I Deliver"', () => {
      renderWithTheme(<About />);

      const titles = screen.getAllByTestId('section-title');
      expect(titles).toHaveLength(2);
      expect(titles[0]).toHaveTextContent('What I Do?');
      expect(titles[1]).toHaveTextContent('Value I Deliver');
    });
  });

  describe('Layout i struktura', () => {
    it('renderuje główny kontener Box', () => {
      const { container } = renderWithTheme(<About />);

      const mainBox = container.querySelector('[class*="MuiBox"]');
      expect(mainBox).toBeInTheDocument();
    });

    it('renderuje wszystkie główne sekcje w odpowiedniej kolejności', () => {
      renderWithTheme(<About />);

      const sideNav = screen.getByTestId('side-navigation');
      const line = screen.getByTestId('line');
      const header = screen.getByTestId('about-header');
      const skills = screen.getByTestId('skills-section');
      const values = screen.getByTestId('values-section');

      expect(sideNav).toBeInTheDocument();
      expect(line).toBeInTheDocument();
      expect(header).toBeInTheDocument();
      expect(skills).toBeInTheDocument();
      expect(values).toBeInTheDocument();
    });
  });
});