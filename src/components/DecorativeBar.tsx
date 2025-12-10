import { Box } from '@mui/material';
import { LAYOUT_CONSTANTS, COLORS } from '@/constants/layout';

type DecorativeBarProps = {
  position: 'left' | 'right';
};

export const DecorativeBar = ({ position }: DecorativeBarProps) => (
  <Box
    sx={{
      position: 'fixed',
      [position]: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      width: LAYOUT_CONSTANTS.DECORATIVE_BAR.WIDTH,
      height: LAYOUT_CONSTANTS.DECORATIVE_BAR.HEIGHT,
      bgcolor: COLORS.PRIMARY,
      zIndex: 10,
      display: { xs: 'none', xxxl: 'block' },
    }}
  />
);