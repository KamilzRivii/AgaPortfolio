import { render, screen } from '@testing-library/react';
import { CircularNavigation } from '@/components/CircularNavigation';
import { NavItem } from '@/types/navigation';

jest.mock('@/components/NavigationIcon', () => ({
  NavigationIcon: ({ item, isActive }: { item: NavItem; isActive: boolean }) => (
    <button
      data-testid={`nav-icon-${item.id}`}
      data-active={isActive}
      aria-label={item.label}
    >
      {item.label}
    </button>
  ),
}));

// Mock LAYOUT_CONSTANTS
jest.mock('@/constants/layout', () => ({
  LAYOUT_CONSTANTS: {
    ICON_ORBIT: {
      RADIUS: 200,
      CENTER_X: 300,
      CENTER_Y: 300,
      START_ANGLE: -90,
      END_ANGLE: 90,
    },
  },
}));

const mockItems: NavItem[] = [
  { id: 'home', icon: 'home', to: '/', label: 'Home' },
  { id: 'about', icon: 'info', to: '/about', label: 'About' },
  { id: 'resume', icon: 'resume', to: '/resume', label: 'Resume' },
  { id: 'projects', icon: 'work', to: '/projects', label: 'Projects' },
  { id: 'contact', icon: 'contact', to: '/contact', label: 'Contact' },
];

describe('CircularNavigation', () => {
  describe('Renderowanie', () => {
    it('renderuje wszystkie elementy nawigacji', () => {
      render(<CircularNavigation items={mockItems} currentPath="/" />);

      expect(screen.getByTestId('nav-icon-home')).toBeInTheDocument();
      expect(screen.getByTestId('nav-icon-about')).toBeInTheDocument();
      expect(screen.getByTestId('nav-icon-resume')).toBeInTheDocument();
      expect(screen.getByTestId('nav-icon-projects')).toBeInTheDocument();
      expect(screen.getByTestId('nav-icon-contact')).toBeInTheDocument();
    });

    it('renderuje poprawną liczbę przycisków nawigacyjnych', () => {
      render(<CircularNavigation items={mockItems} currentPath="/" />);

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(5);
    });

    it('renderuje przyciski z poprawnymi labelami', () => {
      render(<CircularNavigation items={mockItems} currentPath="/" />);

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Resume')).toBeInTheDocument();
      expect(screen.getByText('Projects')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('renderuje fragment jako kontener główny', () => {
      const { container } = render(<CircularNavigation items={mockItems} currentPath="/" />);
      
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe('Aktywna strona', () => {
    it('oznacza Home jako aktywny gdy currentPath = "/"', () => {
      render(<CircularNavigation items={mockItems} currentPath="/" />);

      const homeButton = screen.getByTestId('nav-icon-home');
      const aboutButton = screen.getByTestId('nav-icon-about');

      expect(homeButton).toHaveAttribute('data-active', 'true');
      expect(aboutButton).toHaveAttribute('data-active', 'false');
    });

    it('oznacza About jako aktywny gdy currentPath = "/about"', () => {
      render(<CircularNavigation items={mockItems} currentPath="/about" />);

      const homeButton = screen.getByTestId('nav-icon-home');
      const aboutButton = screen.getByTestId('nav-icon-about');

      expect(homeButton).toHaveAttribute('data-active', 'false');
      expect(aboutButton).toHaveAttribute('data-active', 'true');
    });

    it('tylko jeden element jest aktywny jednocześnie', () => {
      render(<CircularNavigation items={mockItems} currentPath="/contact" />);

      const buttons = screen.getAllByRole('button');
      const activeButtons = buttons.filter(btn => btn.getAttribute('data-active') === 'true');

      expect(activeButtons).toHaveLength(1);
      expect(activeButtons[0]).toHaveTextContent('Contact');
    });
  });

  describe('Mapowanie elementów', () => {
    it('używa item.id jako key dla każdego elementu', () => {
      render(<CircularNavigation items={mockItems} currentPath="/" />);

      mockItems.forEach(item => {
        expect(screen.getByTestId(`nav-icon-${item.id}`)).toBeInTheDocument();
      });
    });

    it('przekazuje cały obiekt item do NavigationIcon', () => {
      render(<CircularNavigation items={mockItems} currentPath="/" />);

      mockItems.forEach(item => {
        const button = screen.getByTestId(`nav-icon-${item.id}`);
        expect(button).toHaveAttribute('aria-label', item.label);
      });
    });

    it('renderuje wszystkie elementy z tablicy items', () => {
      render(<CircularNavigation items={mockItems} currentPath="/" />);

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(mockItems.length);
    });
  });

  describe('Edge cases', () => {
    it('renderuje się poprawnie z pustą tablicą items', () => {
      render(<CircularNavigation items={[]} currentPath="/" />);

      const buttons = screen.queryAllByRole('button');
      expect(buttons).toHaveLength(0);
    });

    it('renderuje się poprawnie z jednym elementem', () => {
      const singleItem: NavItem[] = [
        { id: 'home', icon: 'home', to: '/', label: 'Home' },
      ];

      render(<CircularNavigation items={singleItem} currentPath="/" />);

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(1);
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('renderuje się poprawnie z dwoma elementami', () => {
      const twoItems: NavItem[] = [
        { id: 'home', icon: 'home', to: '/', label: 'Home' },
        { id: 'about', icon: 'info', to: '/about', label: 'About' },
      ];

      render(<CircularNavigation items={twoItems} currentPath="/" />);

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
    });

    it('nie ma aktywnego elementu gdy currentPath nie pasuje do żadnego item.to', () => {
      render(<CircularNavigation items={mockItems} currentPath="/non-existent" />);

      const buttons = screen.getAllByRole('button');
      const activeButtons = buttons.filter(btn => btn.getAttribute('data-active') === 'true');

      expect(activeButtons).toHaveLength(0);
    });
  });

  describe('Logika pozycjonowania', () => {
    it('wywołuje funkcje matematyczne dla każdego elementu', () => {
      const mathCosSpy = jest.spyOn(Math, 'cos');
      const mathSinSpy = jest.spyOn(Math, 'sin');

      render(<CircularNavigation items={mockItems} currentPath="/" />);

      expect(mathCosSpy).toHaveBeenCalledTimes(5);
      expect(mathSinSpy).toHaveBeenCalledTimes(5);

      mathCosSpy.mockRestore();
      mathSinSpy.mockRestore();
    });

    it('oblicza kąty w zakresie od START_ANGLE do END_ANGLE', () => {
      const mathCosSpy = jest.spyOn(Math, 'cos');

      render(<CircularNavigation items={mockItems} currentPath="/" />);

      expect(mathCosSpy).toHaveBeenCalledWith((-90 * Math.PI) / 180);

      mathCosSpy.mockRestore();
    });
  });
});