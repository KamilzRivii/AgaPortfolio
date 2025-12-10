import { Stack } from '@mui/material';
import { NavigationIcon } from './NavigationIcon';
import { NavItem } from '@/types/navigation';

type LinearNavigationProps = {
  items: NavItem[];
  currentPath: string;
};

export const LinearNavigation = ({ items, currentPath }: LinearNavigationProps) => (
  <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
    {items.map((item) => (
      <NavigationIcon
        key={item.id}
        item={item}
        isActive={currentPath === item.to}
      />
    ))}
  </Stack>
);