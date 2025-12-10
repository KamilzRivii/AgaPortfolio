import { render, screen } from '@testing-library/react';
import Contact from '@/app/contact/page';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const mockPathname = '/contact';
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

jest.mock('@/components/contact/SocialLink', () => ({
  SocialLink: ({ social }: any) => (
    <div data-testid={`social-link-${social.id}`}>
      Social Link: {social.label}
    </div>
  ),
}));

jest.mock('@/constants/social', () => ({
  SOCIAL_LINKS: [
    { id: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com', icon: () => null },
    { id: 'email', label: 'Gmail', url: 'mailto:test@gmail.com', icon: () => null },
    { id: 'github', label: 'GitHub', url: 'https://github.com', icon: () => null },
  ],
}));

jest.mock('@/constants/layout', () => ({
  LAYOUT_CONSTANTS: {
    CONTACT: {
      MAX_WIDTH: 700,
      ICON_SIZE: 150,
      ICON_FONT_SIZE: 96,
    },
  },
}));

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Contact page', () => {
  describe('Renderowanie podstawowych komponentów', () => {
    it('renderuje SideNavigation z poprawnym zdjęciem', () => {
      renderWithTheme(<Contact />);

      const sideNav = screen.getByTestId('side-navigation');
      expect(sideNav).toBeInTheDocument();
      expect(sideNav).toHaveTextContent('Photo: /images/profile_photo_2.webp');
    });

    it('renderuje komponent Line (separator)', () => {
      renderWithTheme(<Contact />);

      expect(screen.getByTestId('line')).toBeInTheDocument();
    });

    it('renderuje główny nagłówek "CONTACT"', () => {
      renderWithTheme(<Contact />);

      expect(screen.getByText('CONTACT')).toBeInTheDocument();
    });

    it('renderuje nagłówek jako h1', () => {
      const { container } = renderWithTheme(<Contact />);

      const h1 = container.querySelector('h1');
      expect(h1).toBeInTheDocument();
      expect(h1).toHaveTextContent('CONTACT');
    });
  });

  describe('Sekcja powitalna', () => {
    it('renderuje tekst powitalny "Feel free to contact me!"', () => {
      renderWithTheme(<Contact />);

      expect(screen.getByText('Feel')).toBeInTheDocument();
      expect(screen.getByText('free')).toBeInTheDocument();
      expect(screen.getByText('to contact me!')).toBeInTheDocument();
    });

    it('słowo "free" ma większą wagę fontu (bold)', () => {
      renderWithTheme(<Contact />);

      const freeText = screen.getByText('free');
      expect(freeText).toBeInTheDocument();
    });

    it('renderuje pełny tekst opisowy o otwartości na współpracę', () => {
      renderWithTheme(<Contact />);

      const description = screen.getByText(/I'm always open to new opportunities/i);
      expect(description).toBeInTheDocument();
      expect(description).toHaveTextContent('collaborations');
      expect(description).toHaveTextContent('Drop me a message');
    });
  });

  describe('Social Links', () => {
    it('renderuje wszystkie linki społecznościowe (LinkedIn, Gmail, GitHub)', () => {
      renderWithTheme(<Contact />);

      expect(screen.getByTestId('social-link-linkedin')).toBeInTheDocument();
      expect(screen.getByTestId('social-link-email')).toBeInTheDocument();
      expect(screen.getByTestId('social-link-github')).toBeInTheDocument();
    });

    it('renderuje poprawną liczbę social links', () => {
      renderWithTheme(<Contact />);

      const socialLinks = screen.getAllByTestId(/social-link-/);
      expect(socialLinks).toHaveLength(3);
    });

    it('każdy social link ma odpowiedni label', () => {
      renderWithTheme(<Contact />);

      expect(screen.getByText('Social Link: LinkedIn')).toBeInTheDocument();
      expect(screen.getByText('Social Link: Gmail')).toBeInTheDocument();
      expect(screen.getByText('Social Link: GitHub')).toBeInTheDocument();
    });
  });

  describe('Footer message', () => {
    it('renderuje wiadomość stopki', () => {
      renderWithTheme(<Contact />);

      const footerMessage = screen.getByText(
        /Your message means a lot, and I'll get back to you as soon as possible/i
      );
      expect(footerMessage).toBeInTheDocument();
    });

    it('footer message jest w Box z kolorowym tłem', () => {
      const { container } = renderWithTheme(<Contact />);

      const footerBox = screen
        .getByText(/Your message means a lot/i)
        .closest('[class*="MuiBox"]');
      expect(footerBox).toBeInTheDocument();
    });
  });

  describe('Layout i struktura', () => {
    it('renderuje główny kontener Box', () => {
      const { container } = renderWithTheme(<Contact />);

      const mainBox = container.querySelector('[class*="MuiBox"]');
      expect(mainBox).toBeInTheDocument();
    });

    it('renderuje wszystkie sekcje w odpowiedniej kolejności', () => {
      renderWithTheme(<Contact />);

      expect(screen.getByTestId('side-navigation')).toBeInTheDocument();
      expect(screen.getByTestId('line')).toBeInTheDocument();
      expect(screen.getByText('CONTACT')).toBeInTheDocument();
      expect(screen.getByText('Feel')).toBeInTheDocument();
      expect(screen.getByTestId('social-link-linkedin')).toBeInTheDocument();
      expect(screen.getByText(/Your message means a lot/i)).toBeInTheDocument();
    });
  });

  describe('Typography variants', () => {
    it('używa h4 dla tekstu powitalnego', () => {
      const { container } = renderWithTheme(<Contact />);

      const h4Elements = container.querySelectorAll('[class*="MuiTypography-h4"]');
      expect(h4Elements.length).toBeGreaterThanOrEqual(3); // Feel, free, to contact me!
    });

    it('używa h6 dla opisu', () => {
      const { container } = renderWithTheme(<Contact />);

      const h6Elements = container.querySelectorAll('[class*="MuiTypography-h6"]');
      expect(h6Elements.length).toBeGreaterThanOrEqual(1);
    });
  });
});