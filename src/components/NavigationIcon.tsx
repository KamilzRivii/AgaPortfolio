import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import HomeIcon from '@mui/icons-material/Home';
import Portrait from '@mui/icons-material/Portrait';
import School from '@mui/icons-material/School';
import Work from '@mui/icons-material/Work';
import ContactMail from '@mui/icons-material/ContactMail';
import { NavItem } from '@/types/navigation';
import { COLORS } from '@/constants/layout';

const ICON_MAP = {
  home: HomeIcon,
  info: Portrait,
  resume: School,
  work: Work,
  contact: ContactMail,
} as const;

type NavigationIconProps = {
  item: NavItem;
  isActive: boolean;
  style?: React.CSSProperties;
  sx?: any;
};

export const NavigationIcon = ({ item, isActive, style, sx }: NavigationIconProps) => {
  const router = useRouter();
  const IconComponent = ICON_MAP[item.icon];

  return (
    <IconButton
      onClick={() => router.push(item.to)}
      aria-label={item.label}
      style={style}
      sx={{
        color: isActive ? COLORS.LIGHT : COLORS.PRIMARY,
        backgroundColor: COLORS.DARK,
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.2)',
          backgroundColor: COLORS.DARK,
        },
        ...sx,
      }}
    >
      <IconComponent />
    </IconButton>
  );
};