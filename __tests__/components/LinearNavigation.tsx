import { render, screen } from '@testing-library/react';
import { LinearNavigation } from '@/components/LinearNavigation';
import { NavItem } from '@/types/navigation';

// Mock NavigationIcon
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

const mockItems: NavItem[] = [
  { id: 'home', icon: 'home', to: '/', label: 'Home' },
  { id: 'about', icon: 'info', to: '/about', label: 'About' },
  { id: 'resume', icon: 'resume', to: '/resume', label: 'Resume' },
  { id: 'projects', icon: 'work', to: '/projects', label: 'Projects' },
  { id: 'contact', icon: 'contact', to: '/contact', label: 'Contact' },
];

describe('LinearNavigation', () => {
  describe('Renderowanie', () => {
    it('renderuje wszystkie elementy nawigacji', () => {
      render(<LinearNavigation items={mockItems} currentPath="/" />);

      expect(screen.getByTestId('nav-icon-home')).toBeInTheDocument();
      expect(screen.getByTestId('nav-icon-about')).toBeInTheDocument();
      expect(screen.getByTestId('nav-icon-resume')).toBeInTheDocument();
      expect(screen.getByTestId('nav-icon-projects')).toBeInTheDocument();
      expect(screen.getByTestId('nav-icon-contact')).toBeInTheDocument();
    });

    it('renderuje poprawną liczbę przycisków nawigacyjnych', () => {
      render(<LinearNavigation items={mockItems} currentPath="/" />);

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(5);
    });

    it('renderuje przyciski z poprawnymi labelami', () => {
      render(<LinearNavigation items={mockItems} currentPath="/" />);

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Resume')).toBeInTheDocument();
      expect(screen.getByText('Projects')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('renderuje Stack z direction="row"', () => {
      const { container } = render(<LinearNavigation items={mockItems} currentPath="/" />);

      const stack = container.querySelector('[class*="MuiStack"]');
      expect(stack).toBeInTheDocument();
    });
  });

  describe('Aktywna strona', () => {
    it('oznacza Home jako aktywny gdy currentPath = "/"', () => {
      render(<LinearNavigation items={mockItems} currentPath="/" />);

      const homeButton = screen.getByTestId('nav-icon-home');
      const aboutButton = screen.getByTestId('nav-icon-about');

      expect(homeButton).toHaveAttribute('data-active', 'true');
      expect(aboutButton).toHaveAttribute('data-active', 'false');
    });

    it('oznacza About jako aktywny gdy currentPath = "/about"', () => {
      render(<LinearNavigation items={mockItems} currentPath="/about" />);

      const homeButton = screen.getByTestId('nav-icon-home');
      const aboutButton = screen.getByTestId('nav-icon-about');

      expect(homeButton).toHaveAttribute('data-active', 'false');
      expect(aboutButton).toHaveAttribute('data-active', 'true');
    });

    it('oznacza Resume jako aktywny gdy currentPath = "/resume"', () => {
      render(<LinearNavigation items={mockItems} currentPath="/resume" />);

      const resumeButton = screen.getByTestId('nav-icon-resume');
      expect(resumeButton).toHaveAttribute('data-active', 'true');
    });

    it('tylko jeden element jest aktywny jednocześnie', () => {
      render(<LinearNavigation items={mockItems} currentPath="/projects" />);

      const buttons = screen.getAllByRole('button');
      const activeButtons = buttons.filter(btn => btn.getAttribute('data-active') === 'true');

      expect(activeButtons).toHaveLength(1);
      expect(activeButtons[0]).toHaveTextContent('Projects');
    });
  });

  describe('Mapowanie elementów', () => {
    it('używa item.id jako key dla każdego elementu', () => {
      render(<LinearNavigation items={mockItems} currentPath="/" />);

      mockItems.forEach(item => {
        expect(screen.getByTestId(`nav-icon-${item.id}`)).toBeInTheDocument();
      });
    });

    it('przekazuje cały obiekt item do NavigationIcon', () => {
      render(<LinearNavigation items={mockItems} currentPath="/" />);

      mockItems.forEach(item => {
        const button = screen.getByTestId(`nav-icon-${item.id}`);
        expect(button).toHaveAttribute('aria-label', item.label);
      });
    });
  });

  describe('Edge cases', () => {
    it('renderuje się poprawnie z pustą tablicą items', () => {
      render(<LinearNavigation items={[]} currentPath="/" />);

      const buttons = screen.queryAllByRole('button');
      expect(buttons).toHaveLength(0);
    });

    it('renderuje się poprawnie z jednym elementem', () => {
      const singleItem: NavItem[] = [
        { id: 'home', icon: 'home', to: '/', label: 'Home' },
      ];

      render(<LinearNavigation items={singleItem} currentPath="/" />);

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(1);
    });

    it('nie ma aktywnego elementu gdy currentPath nie pasuje do żadnego item.to', () => {
      render(<LinearNavigation items={mockItems} currentPath="/non-existent" />);

      const buttons = screen.getAllByRole('button');
      const activeButtons = buttons.filter(btn => btn.getAttribute('data-active') === 'true');

      expect(activeButtons).toHaveLength(0);
    });
  });
});