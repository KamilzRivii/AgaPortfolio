import { NavItem } from '@/types/navigation';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', icon: 'home', to: '/', label: 'Home' },
  { id: 'about', icon: 'info', to: '/about', label: 'About' },
  { id: 'resume', icon: 'resume', to: '/resume', label: 'Resume' },
  { id: 'projects', icon: 'work', to: '/projects', label: 'Projects' },
  { id: 'contact', icon: 'contact', to: '/contact', label: 'Contact' },
];