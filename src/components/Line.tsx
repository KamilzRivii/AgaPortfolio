import { Box } from '@mui/material';
import { LAYOUT_CONSTANTS } from '@/constants/layout';

const Line = () => {
  return (
    <Box
      sx={{
        display: { xs: 'none', lg: 'none', xxl: 'flex' },
        alignItems: 'center',
        mx: 6,
        top: LAYOUT_CONSTANTS.LINE.TOP_OFFSET,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: LAYOUT_CONSTANTS.LINE.WIDTH,
          height: LAYOUT_CONSTANTS.LINE.HEIGHT,
          bgcolor: 'secondary.main',
        }}
      />
      <Box
        sx={{
          width: LAYOUT_CONSTANTS.LINE_DOT.WIDTH,
          height: LAYOUT_CONSTANTS.LINE_DOT.HEIGHT,
          borderRadius: LAYOUT_CONSTANTS.RADIUS.STANDARD,
          bgcolor: 'secondary.main',
          ml: -1,
        }}
      />
    </Box>
  );
};

export default Line;