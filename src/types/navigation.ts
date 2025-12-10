export type NavItem = {
  id: string;
  icon: 'home' | 'info' | 'resume' | 'work' | 'contact';
  to: string;
  label: string;
};