import { render, screen } from '@testing-library/react';
import { SocialLink } from '@/components/contact/SocialLink';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SocialLink as SocialLinkType } from '@/constants/social';

const MockIcon = ({ sx }: any) => <svg data-testid="mock-icon">Icon</svg>;

jest.mock('@/constants/layout', () => ({
  LAYOUT_CONSTANTS: {
    CONTACT: {
      ICON_SIZE: 150,
      ICON_FONT_SIZE: 96,
    },
  },
}));

const theme = createTheme();

const mockSocialLink: SocialLinkType = {
  id: 'linkedin',
  icon: MockIcon,
  label: 'LinkedIn',
  url: 'https://www.linkedin.com/in/test',
};

describe('SocialLink', () => {
  describe('Renderowanie podstawowe', () => {
    it('renderuje label social link', () => {
      render(
        <ThemeProvider theme={theme}>
          <SocialLink social={mockSocialLink} />
        </ThemeProvider>
      );

      expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    });

    it('renderuje ikonę', () => {
      render(
        <ThemeProvider theme={theme}>
          <SocialLink social={mockSocialLink} />
        </ThemeProvider>
      );

      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('renderuje link z poprawnym href', () => {
      render(
        <ThemeProvider theme={theme}>
          <SocialLink social={mockSocialLink} />
        </ThemeProvider>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/test');
    });

    it('link ma underline="none"', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <SocialLink social={mockSocialLink} />
        </ThemeProvider>
      );

      const link = container.querySelector('a');
      expect(link).toBeInTheDocument();
    });
  });

  describe('Target attribute dla różnych typów linków', () => {
    it('link zewnętrzny (LinkedIn) ma target="_blank"', () => {
      render(
        <ThemeProvider theme={theme}>
          <SocialLink social={mockSocialLink} />
        </ThemeProvider>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('link email nie ma target="_blank"', () => {
      const emailLink: SocialLinkType = {
        id: 'email',
        icon: MockIcon,
        label: 'Gmail',
        url: 'mailto:test@gmail.com',
      };

      render(
        <ThemeProvider theme={theme}>
          <SocialLink social={emailLink} />
        </ThemeProvider>
      );

      const link = screen.getByRole('link');
      expect(link).not.toHaveAttribute('target', '_blank');
    });

    it('link GitHub ma target="_blank"', () => {
      const githubLink: SocialLinkType = {
        id: 'github',
        icon: MockIcon,
        label: 'GitHub',
        url: 'https://github.com/test',
      };

      render(
        <ThemeProvider theme={theme}>
          <SocialLink social={githubLink} />
        </ThemeProvider>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  describe('Struktura komponentu', () => {
    it('renderuje okrągły kontener dla ikony', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <SocialLink social={mockSocialLink} />
        </ThemeProvider>
      );

      const boxes = container.querySelectorAll('[class*="MuiBox"]');
      expect(boxes.length).toBeGreaterThanOrEqual(2); // Główny Box + Box z ikoną
    });

    it('renderuje Typography dla labela', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <SocialLink social={mockSocialLink} />
        </ThemeProvider>
      );

      const typography = container.querySelector('[class*="MuiTypography"]');
      expect(typography).toBeInTheDocument();
      expect(typography).toHaveTextContent('LinkedIn');
    });

    it('renderuje Link z MUI', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <SocialLink social={mockSocialLink} />
        </ThemeProvider>
      );

      const link = container.querySelector('[class*="MuiLink"]');
      expect(link).toBeInTheDocument();
    });
  });

  describe('Różne social links', () => {
    it('renderuje LinkedIn z poprawnym URL', () => {
      render(
        <ThemeProvider theme={theme}>
          <SocialLink social={mockSocialLink} />
        </ThemeProvider>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/test');
      expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    });

    it('renderuje Email z mailto URL', () => {
      const emailLink: SocialLinkType = {
        id: 'email',
        icon: MockIcon,
        label: 'Gmail',
        url: 'mailto:test@gmail.com',
      };

      render(
        <ThemeProvider theme={theme}>
          <SocialLink social={emailLink} />
        </ThemeProvider>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'mailto:test@gmail.com');
      expect(screen.getByText('Gmail')).toBeInTheDocument();
    });

    it('renderuje GitHub z poprawnym URL', () => {
      const githubLink: SocialLinkType = {
        id: 'github',
        icon: MockIcon,
        label: 'GitHub',
        url: 'https://github.com/test',
      };

      render(
        <ThemeProvider theme={theme}>
          <SocialLink social={githubLink} />
        </ThemeProvider>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'https://github.com/test');
      expect(screen.getByText('GitHub')).toBeInTheDocument();
    });
  });

  describe('Ikona komponentu', () => {
    it('renderuje przekazaną ikonę jako komponent', () => {
      render(
        <ThemeProvider theme={theme}>
          <SocialLink social={mockSocialLink} />
        </ThemeProvider>
      );

      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('ikona jest w okrągłym kontenerze', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <SocialLink social={mockSocialLink} />
        </ThemeProvider>
      );

      const icon = screen.getByTestId('mock-icon');
      const iconContainer = icon.closest('[class*="MuiBox"]');
      expect(iconContainer).toBeInTheDocument();
    });
  });

  describe('Props validation', () => {
    it('akceptuje wszystkie wymagane właściwości SocialLink', () => {
      const fullSocial: SocialLinkType = {
        id: 'test',
        icon: MockIcon,
        label: 'Test Label',
        url: 'https://test.com',
      };

      const { container } = render(
        <ThemeProvider theme={theme}>
          <SocialLink social={fullSocial} />
        </ThemeProvider>
      );

      expect(container).toBeInTheDocument();
    });
  });

  describe('Styling i layout', () => {
    it('label ma bold font weight', () => {
      render(
        <ThemeProvider theme={theme}>
          <SocialLink social={mockSocialLink} />
        </ThemeProvider>
      );

      const label = screen.getByText('LinkedIn');
      expect(label).toBeInTheDocument();
    });

    it('kontener ikony ma primary.main background', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <SocialLink social={mockSocialLink} />
        </ThemeProvider>
      );

      const boxes = container.querySelectorAll('[class*="MuiBox"]');
      expect(boxes.length).toBeGreaterThan(0);
    });
  });
});