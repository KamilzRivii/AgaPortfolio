import { Box, Typography } from '@mui/material';
import { ValueProposition } from '@/types/about';

type ValueCardProps = {
  value: ValueProposition;
};

export const ValueCard = ({ value }: ValueCardProps) => (
  <Box
    sx={(theme) => ({
      width: 160,
      height: 160,
      borderRadius: '50%',
      bgcolor: 'secondary.main',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      p: 1,
      // Mobile: full width horizontal bar
      [theme.breakpoints.down('lg')]: {
        width: '100%',
        height: 'auto',
        minHeight: 40,
        borderRadius: 0,
        flexDirection: 'row',
        gap: 2,
      },
    })}
  >
    <Typography
      sx={{
        color: 'primary.main',
        fontWeight: 700,
        fontSize: { xs: 14, lg: 18 },
      }}
    >
      {value.label}
    </Typography>
    <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 12 }}>
      =
    </Typography>
    <Typography sx={{ color: 'white', fontWeight: 500, fontSize: 14 }}>
      {value.value}
    </Typography>
  </Box>
);