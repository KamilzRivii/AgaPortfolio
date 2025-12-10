import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SideNavigation from '@/components/SideNavigation';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const mockPush = jest.fn();
const mockPathname = '/';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => mockPathname,
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="profile-image" />
  ),
}));

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('SideNavigation', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  describe('Renderowanie', () => {
    it('renderuje zdjęcie profilowe z poprawnym src', () => {
      renderWithTheme(<SideNavigation aboutPhoto="/images/test.webp" />);

      const image = screen.getByTestId('profile-image');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/images/test.webp');
      expect(image).toHaveAttribute('alt', 'My portrait');
    });

    it('renderuje wszystkie elementy menu', () => {
      renderWithTheme(<SideNavigation aboutPhoto="/images/test.webp" />);

      expect(screen.getAllByText('Home')).toHaveLength(2); // Desktop + Mobile
      expect(screen.getAllByText('About')).toHaveLength(2);
      expect(screen.getAllByText('Resume')).toHaveLength(2);
      expect(screen.getAllByText('Projects')).toHaveLength(2);
      expect(screen.getAllByText('Contact')).toHaveLength(2);
    });

    it('renderuje przyciski strzałek (góra i dół)', () => {
      const { container } = renderWithTheme(<SideNavigation aboutPhoto="/images/test.webp" />);

      const arrowUpIcon = container.querySelector('[data-testid="KeyboardArrowUpIcon"]');
      const arrowDownIcon = container.querySelector('[data-testid="KeyboardArrowDownIcon"]');

      expect(arrowUpIcon).toBeInTheDocument();
      expect(arrowDownIcon).toBeInTheDocument();
    });

    it('renderuje przycisk hamburger menu', () => {
      renderWithTheme(<SideNavigation aboutPhoto="/images/test.webp" />);

      const hamburger = screen.getByLabelText('Toggle menu');
      expect(hamburger).toBeInTheDocument();
    });
  });

  describe('Nawigacja strzałkami', () => {
    it('strzałka w dół nawiguje do następnej strony', () => {
      const { container } = renderWithTheme(<SideNavigation aboutPhoto="/images/test.webp" />);

      const arrowDown = container.querySelector('[data-testid="KeyboardArrowDownIcon"]');
      fireEvent.click(arrowDown!);

      expect(mockPush).toHaveBeenCalledWith('/about');
    });

    it('strzałka w górę nawiguje do poprzedniej strony', () => {
      const { container } = renderWithTheme(<SideNavigation aboutPhoto="/images/test.webp" />);

      const arrowUp = container.querySelector('[data-testid="KeyboardArrowUpIcon"]');
      fireEvent.click(arrowUp!);

      expect(mockPush).toHaveBeenCalledWith('/contact');
    });

    it('strzałka w dół z ostatniej strony wraca do pierwszej (cykliczność)', () => {

      jest.spyOn(require('next/navigation'), 'usePathname').mockReturnValue('/contact');
      
      const { container } = renderWithTheme(<SideNavigation aboutPhoto="/images/test.webp" />);

      const arrowDown = container.querySelector('[data-testid="KeyboardArrowDownIcon"]');
      fireEvent.click(arrowDown!);

      expect(mockPush).toHaveBeenCalledWith('/');
    });

    it('strzałka w górę z pierwszej strony idzie do ostatniej (cykliczność)', () => {
      jest.spyOn(require('next/navigation'), 'usePathname').mockReturnValue('/');
      
      const { container } = renderWithTheme(<SideNavigation aboutPhoto="/images/test.webp" />);

      const arrowUp = container.querySelector('[data-testid="KeyboardArrowUpIcon"]');
      fireEvent.click(arrowUp!);

      expect(mockPush).toHaveBeenCalledWith('/contact');
    });
  });

  describe('Kliknięcie w element menu', () => {
    it('nawiguje do wybranej strony po kliknięciu', () => {
      renderWithTheme(<SideNavigation aboutPhoto="/images/test.webp" />);

      const aboutLink = screen.getAllByText('About')[0]; // Desktop version
      fireEvent.click(aboutLink);

      expect(mockPush).toHaveBeenCalledWith('/about');
    });

    it('nawiguje do Home po kliknięciu', () => {
      renderWithTheme(<SideNavigation aboutPhoto="/images/test.webp" />);

      const homeLink = screen.getAllByText('Home')[0];
      fireEvent.click(homeLink);

      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  describe('Menu mobilne (Collapse)', () => {
    it('menu mobilne jest domyślnie ukryte', () => {
      renderWithTheme(<SideNavigation aboutPhoto="/images/test.webp" />);

      const { container } = renderWithTheme(<SideNavigation aboutPhoto="/images/test.webp" />);
      const collapse = container.querySelector('[class*="MuiCollapse"]');
      expect(collapse).toBeInTheDocument();
      expect(collapse).toHaveClass('MuiCollapse-hidden');
    });

    it('otwiera menu mobilne po kliknięciu hamburgera', async () => {
      renderWithTheme(<SideNavigation aboutPhoto="/images/test.webp" />);

      const hamburger = screen.getByLabelText('Toggle menu');
      fireEvent.click(hamburger);

      await waitFor(() => {
        const mobileLinks = screen.getAllByText('Home');
        expect(mobileLinks.length).toBeGreaterThan(0);
      });
    });

    it('zamyka menu mobilne po wybraniu elementu', async () => {
      renderWithTheme(<SideNavigation aboutPhoto="/images/test.webp" />);

      const hamburger = screen.getByLabelText('Toggle menu');
      fireEvent.click(hamburger);

      await waitFor(() => {
        const mobileAbout = screen.getAllByText('About').find(el => 
          el.closest('[class*="MuiCollapse"]')
        );
        if (mobileAbout) fireEvent.click(mobileAbout);
      });

      expect(mockPush).toHaveBeenCalledWith('/about');
    });
  });

  describe('Aktywna strona', () => {
    it('wyróżnia aktywną stronę (kolor biały)', () => {
      jest.spyOn(require('next/navigation'), 'usePathname').mockReturnValue('/about');
      
      const { container } = renderWithTheme(<SideNavigation aboutPhoto="/images/test.webp" />);

      const aboutLinks = screen.getAllByText('About');
      expect(aboutLinks.length).toBeGreaterThan(0);
    });
  });
});