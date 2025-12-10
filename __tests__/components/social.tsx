import { SOCIAL_LINKS } from '@/constants/social';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';

describe('SOCIAL_LINKS constant', () => {
  describe('Struktura danych', () => {
    it('zawiera 3 social links', () => {
      expect(SOCIAL_LINKS).toHaveLength(3);
    });

    it('każdy link ma wszystkie wymagane pola', () => {
      SOCIAL_LINKS.forEach((link) => {
        expect(link).toHaveProperty('id');
        expect(link).toHaveProperty('icon');
        expect(link).toHaveProperty('label');
        expect(link).toHaveProperty('url');
      });
    });

    it('wszystkie id są unikalne', () => {
      const ids = SOCIAL_LINKS.map((link) => link.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('LinkedIn', () => {
    const linkedin = SOCIAL_LINKS.find((link) => link.id === 'linkedin');

    it('istnieje w tablicy', () => {
      expect(linkedin).toBeDefined();
    });

    it('ma poprawny label', () => {
      expect(linkedin?.label).toBe('LinkedIn');
    });

    it('ma poprawny URL', () => {
      expect(linkedin?.url).toContain('linkedin.com');
    });

    it('ma ikonę LinkedInIcon', () => {
      expect(linkedin?.icon).toBe(LinkedInIcon);
    });
  });

  describe('Email', () => {
    const email = SOCIAL_LINKS.find((link) => link.id === 'email');

    it('istnieje w tablicy', () => {
      expect(email).toBeDefined();
    });

    it('ma poprawny label', () => {
      expect(email?.label).toBe('Gmail');
    });

    it('ma mailto URL', () => {
      expect(email?.url).toContain('mailto:');
    });

    it('ma prawidłowy format email w URL', () => {
      expect(email?.url).toMatch(/mailto:.+@.+\..+/);
    });

    it('ma ikonę EmailIcon', () => {
      expect(email?.icon).toBe(EmailIcon);
    });
  });

  describe('GitHub', () => {
    const github = SOCIAL_LINKS.find((link) => link.id === 'github');

    it('istnieje w tablicy', () => {
      expect(github).toBeDefined();
    });

    it('ma poprawny label', () => {
      expect(github?.label).toBe('GitHub');
    });

    it('ma poprawny URL', () => {
      expect(github?.url).toContain('github.com');
    });

    it('ma ikonę GitHubIcon', () => {
      expect(github?.icon).toBe(GitHubIcon);
    });
  });

  describe('Kolejność linków', () => {
    it('LinkedIn jest pierwszy', () => {
      expect(SOCIAL_LINKS[0].id).toBe('linkedin');
    });

    it('Email jest drugi', () => {
      expect(SOCIAL_LINKS[1].id).toBe('email');
    });

    it('GitHub jest trzeci', () => {
      expect(SOCIAL_LINKS[2].id).toBe('github');
    });
  });

  describe('URLs validation', () => {
    it('wszystkie URL są stringami', () => {
      SOCIAL_LINKS.forEach((link) => {
        expect(typeof link.url).toBe('string');
      });
    });

    it('wszystkie URL są niepuste', () => {
      SOCIAL_LINKS.forEach((link) => {
        expect(link.url.length).toBeGreaterThan(0);
      });
    });

    it('zewnętrzne linki zaczynają się od https://', () => {
      const externalLinks = SOCIAL_LINKS.filter((link) => link.id !== 'email');
      externalLinks.forEach((link) => {
        expect(link.url).toMatch(/^https:\/\//);
      });
    });
  });
});