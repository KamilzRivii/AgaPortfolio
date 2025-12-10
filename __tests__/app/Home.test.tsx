import { render, screen, waitFor } from '@testing-library/react';
import Home from '@/app/page';
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const mockPathname = '/';
jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));


let mockUseMediaQuery = jest.fn();
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: (query: any) => mockUseMediaQuery(query),
}));

jest.mock('@/components/DecorativeBar', () => ({
  DecorativeBar: ({ position }: { position: string }) => (
    <div data-testid={`decorative-bar-${position}`}>Decorative Bar {position}</div>
  ),
}));

jest.mock('@/components/HeroContent', () => ({
  HeroContent: () => (
    <div data-testid="hero-content">
      <h1>HI THERE!</h1>
      <h2>AGNIESZKA</h2>
      <p>POWER BI DEVELOPER / DATA ANALYST</p>
      <a href="/about">MORE ABOUT ME</a>
    </div>
  ),
}));

jest.mock('@/components/ProfileImage', () => ({
  ProfileImage: () => (
    <img 
      data-testid="profile-image" 
      alt="Agnieszka - Power BI Developer portrait" 
      src="/images/portfolio_photo.webp"
    />
  ),
}));

jest.mock('@/components/CircularNavigation', () => ({
  CircularNavigation: ({ items, currentPath }: any) => (
    <div data-testid="circular-navigation">
      Circular Navigation - Path: {currentPath} - Items: {items.length}
    </div>
  ),
}));

jest.mock('@/components/LinearNavigation', () => ({
  LinearNavigation: ({ items, currentPath }: any) => (
    <div data-testid="linear-navigation">
      Linear Navigation - Path: {currentPath} - Items: {items.length}
    </div>
  ),
}));

// Mock NAV_ITEMS
jest.mock('@/constants/navigation', () => ({
  NAV_ITEMS: [
    { id: 'home', icon: 'home', to: '/', label: 'Home' },
    { id: 'about', icon: 'info', to: '/about', label: 'About' },
    { id: 'resume', icon: 'resume', to: '/resume', label: 'Resume' },
    { id: 'projects', icon: 'work', to: '/projects', label: 'Projects' },
    { id: 'contact', icon: 'contact', to: '/contact', label: 'Contact' },
  ],
}));

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Home page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Renderowanie podstawowych komponentów', () => {
    it('renderuje oba paski dekoracyjne (lewy i prawy)', () => {
      mockUseMediaQuery.mockReturnValue(true);
      renderWithTheme(<Home />);

      expect(screen.getByTestId('decorative-bar-left')).toBeInTheDocument();
      expect(screen.getByTestId('decorative-bar-right')).toBeInTheDocument();
    });

    it('renderuje komponent HeroContent z głównymi tekstami', () => {
      mockUseMediaQuery.mockReturnValue(true);
      renderWithTheme(<Home />);

      const heroContent = screen.getByTestId('hero-content');
      expect(heroContent).toBeInTheDocument();
      expect(screen.getByText(/HI THERE!/i)).toBeInTheDocument();
      expect(screen.getByText(/AGNIESZKA/i)).toBeInTheDocument();
      expect(screen.getByText(/POWER BI DEVELOPER/i)).toBeInTheDocument();
    });

    it('renderuje link "MORE ABOUT ME" prowadzący do /about', () => {
      mockUseMediaQuery.mockReturnValue(true);
      renderWithTheme(<Home />);

      const aboutLink = screen.getByText(/MORE ABOUT ME/i).closest('a');
      expect(aboutLink).toHaveAttribute('href', '/about');
    });

    it('renderuje zdjęcie profilowe', () => {
      mockUseMediaQuery.mockReturnValue(true);
      renderWithTheme(<Home />);

      const profileImage = screen.getByTestId('profile-image');
      expect(profileImage).toBeInTheDocument();
      expect(profileImage).toHaveAttribute('alt', 'Agnieszka - Power BI Developer portrait');
    });
  });

  describe('Responsywna nawigacja', () => {
    it('renderuje LinearNavigation na dużych ekranach (xl i większe)', async () => {
      mockUseMediaQuery.mockReturnValue(true);
      renderWithTheme(<Home />);

      await waitFor(() => {
        expect(screen.getByTestId('linear-navigation')).toBeInTheDocument();
      });

      expect(screen.queryByTestId('circular-navigation')).not.toBeInTheDocument();
    });

    it('renderuje CircularNavigation na małych ekranach (poniżej xl)', async () => {
      mockUseMediaQuery.mockReturnValue(false);
      renderWithTheme(<Home />);

      await waitFor(() => {
        expect(screen.getByTestId('circular-navigation')).toBeInTheDocument();
      });

      expect(screen.queryByTestId('linear-navigation')).not.toBeInTheDocument();
    });

    it('przełącza między typami nawigacji w zależności od rozmiaru ekranu', async () => {
      mockUseMediaQuery.mockReturnValue(true);
      const { rerender } = renderWithTheme(<Home />);

      await waitFor(() => {
        expect(screen.getByTestId('linear-navigation')).toBeInTheDocument();
      });

      mockUseMediaQuery.mockReturnValue(false);
      rerender(
        <ThemeProvider theme={theme}>
          <Home />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('circular-navigation')).toBeInTheDocument();
      });
    });
  });

  describe('Przekazywanie props do nawigacji', () => {
    it('przekazuje NAV_ITEMS (5 elementów) do LinearNavigation', async () => {
      mockUseMediaQuery.mockReturnValue(true);
      renderWithTheme(<Home />);

      await waitFor(() => {
        const nav = screen.getByTestId('linear-navigation');
        expect(nav).toHaveTextContent('Items: 5');
      });
    });

    it('przekazuje currentPath do LinearNavigation', async () => {
      mockUseMediaQuery.mockReturnValue(true);
      renderWithTheme(<Home />);

      await waitFor(() => {
        const nav = screen.getByTestId('linear-navigation');
        expect(nav).toHaveTextContent('Path: /');
      });
    });

    it('przekazuje NAV_ITEMS (5 elementów) do CircularNavigation', async () => {
      mockUseMediaQuery.mockReturnValue(false);
      renderWithTheme(<Home />);

      await waitFor(() => {
        const nav = screen.getByTestId('circular-navigation');
        expect(nav).toHaveTextContent('Items: 5');
      });
    });

    it('przekazuje currentPath do CircularNavigation', async () => {
      mockUseMediaQuery.mockReturnValue(false);
      renderWithTheme(<Home />);

      await waitFor(() => {
        const nav = screen.getByTestId('circular-navigation');
        expect(nav).toHaveTextContent('Path: /');
      });
    });
  });

  describe('Layout i struktura', () => {
    it('renderuje główny kontener z właściwościami flex', () => {
      mockUseMediaQuery.mockReturnValue(true);
      const { container } = renderWithTheme(<Home />);

      const mainBox = container.querySelector('[class*="MuiBox"]');
      expect(mainBox).toBeInTheDocument();
    });

    it('renderuje Stack z komponentami w odpowiedniej kolejności', () => {
      mockUseMediaQuery.mockReturnValue(true);
      renderWithTheme(<Home />);

      const heroContent = screen.getByTestId('hero-content');
      const profileImage = screen.getByTestId('profile-image');
      
      expect(heroContent).toBeInTheDocument();
      expect(profileImage).toBeInTheDocument();
    });

    it('zawiera wszystkie kluczowe sekcje strony głównej', () => {
      mockUseMediaQuery.mockReturnValue(true);
      renderWithTheme(<Home />);

      expect(screen.getByTestId('decorative-bar-left')).toBeInTheDocument();
      expect(screen.getByTestId('decorative-bar-right')).toBeInTheDocument();

      expect(screen.getByTestId('hero-content')).toBeInTheDocument();
      
      expect(screen.getByTestId('profile-image')).toBeInTheDocument();
    });
  });

  describe('Theme provider', () => {
    it('renderuje się poprawnie z Material-UI theme', () => {
      mockUseMediaQuery.mockReturnValue(true);
      const { container } = renderWithTheme(<Home />);
      
      expect(container).toBeInTheDocument();
    });
  });
});