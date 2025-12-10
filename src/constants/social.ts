import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';

export type SocialLink = {
  id: string;
  icon: React.ComponentType<{ sx?: any }>;
  label: string;
  url: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'linkedin',
    icon: LinkedInIcon,
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/agnieszka-przyby%C5%82a-46039b196/',
  },
  {
    id: 'email',
    icon: EmailIcon,
    label: 'Gmail',
    url: 'mailto:agnieszka.przybyla.2606@gmail.com',
  },
  {
    id: 'github',
    icon: GitHubIcon,
    label: 'GitHub',
    url: 'https://github.com/AGNIESZKApi',
  },
];