import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { COLORS } from '@/constants/layout';

export const HeroContent = () => (
  <Box sx={{ flex: 1, textAlign: 'left' }}>
    <Typography
      variant="h4"
      sx={{
        fontWeight: 700,
        fontSize: { xs: 36, md: 50 },
        mb: 0,
        color: COLORS.PRIMARY,
      }}
    >
      HI THERE!
    </Typography>
    
    <Box sx={{ width: 100, height: 6, bgcolor: COLORS.PRIMARY, mb: 3 }} />

    <Box sx={{ display: 'flex', gap: 2, pb: 2, flexWrap: 'wrap' }}>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 900,
          WebkitTextStroke: '2px black',
          color: COLORS.LIGHT,
          textTransform: 'uppercase',
          fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' },
        }}
      >
        I'M
      </Typography>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 900,
          WebkitTextStroke: `2px ${COLORS.PRIMARY}`,
          color: COLORS.LIGHT,
          textTransform: 'uppercase',
          fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' },
        }}
      >
        AGNIESZKA
      </Typography>
    </Box>

    <Box
      sx={{
        display: 'inline-block',
        px: 3,
        py: 0.5,
        minWidth: { xs: '100%', sm: 320 },
        mb: 2,
        bgcolor: COLORS.PRIMARY,
        color: COLORS.DARK,
        fontWeight: 700,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 900, fontSize: 16 }}>
        POWER BI DEVELOPER / DATA ANALYST
      </Typography>
    </Box>

    <Box
      sx={{
        display: 'inline-block',
        px: 3,
        py: 0.5,
        minWidth: { xs: '100%', sm: 320 },
        mb: 4,
        bgcolor: COLORS.DARK,
        color: COLORS.PRIMARY,
        fontWeight: 700,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 900, fontSize: 16 }}>
        TURNING DATA INTO DECISIONS
      </Typography>
    </Box>

    <Typography
      variant="body1"
      sx={{ maxWidth: 500, color: COLORS.MUTED, mb: 4 }}
    >
      I transform complex data into clear, interactive dashboards with Power BI.
      My goal is to turn numbers into actionable insights, helping businesses make
      smarter decisions. I combine analytical thinking with clean design so that
      data speaks for itself.
    </Typography>

    <Link href="/about" passHref style={{ textDecoration: 'none' }}>
      <Box
        component="span"
        sx={{
          display: 'inline-block',
          px: 3,
          py: 1.5,
          bgcolor: COLORS.DARK,
          color: COLORS.LIGHT,
          fontWeight: 700,
          borderRadius: '24px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': { transform: 'scale(1.03)' },
          width: { xs: '100%', sm: 'auto' },
          textAlign: 'center',
        }}
      >
        MORE ABOUT ME
      </Box>
    </Link>
  </Box>
);