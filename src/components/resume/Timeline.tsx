import { Box } from '@mui/material';
import { LAYOUT_CONSTANTS } from '@/constants/layout';

const TIMELINE_POSITIONS = [270, 485, 685];

export const Timeline = () => (
  <Box sx={{ display: { xs: 'none', xxl: 'block' } }}>
    {/* Horizontal lines with dots */}
    {TIMELINE_POSITIONS.map((top, index) => (
      <Box
        key={index}
        sx={{
          display: 'flex',
          alignItems: 'center',
          mx: 6,
          top,
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
            width: LAYOUT_CONSTANTS.RESUME.TIMELINE_DOT_SIZE,
            height: LAYOUT_CONSTANTS.RESUME.TIMELINE_DOT_SIZE,
            borderRadius: '50%',
            bgcolor: 'secondary.main',
            ml: -1,
          }}
        />
      </Box>
    ))}

    {/* Vertical line */}
    <Box
      sx={{
        width: LAYOUT_CONSTANTS.RESUME.TIMELINE_LINE_WIDTH,
        top: 230,
        left: 48,
        position: 'relative',
        height: LAYOUT_CONSTANTS.RESUME.TIMELINE_LINE_HEIGHT,
        bgcolor: 'secondary.main',
      }}
    />
  </Box>
);