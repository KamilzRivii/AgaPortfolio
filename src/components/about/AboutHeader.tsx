import { Box, Typography } from '@mui/material';

export const AboutHeader = () => (
  <>
    <Typography variant="h1" sx={{ fontWeight: 700, mb: 2 }}>
      ABOUT ME
    </Typography>

    <Box
      sx={{
        display: 'flex',
        gap: 1,
        mb: 4,
        flexWrap: 'wrap',
      }}
    >
      <Typography variant="h5" sx={{ color: 'secondary.main' }}>
        I'M
      </Typography>
      <Typography variant="h5" sx={{ color: 'secondary.main', fontWeight: 700 }}>
        AGNIESZKA,
      </Typography>
      <Typography variant="h5" sx={{ color: 'secondary.main' }}>
        POWER BI DEVELOPER
      </Typography>
    </Box>

    <Typography
      variant="body1"
      sx={{
        color: 'grey.500',
        mb: { xs: 3, lg: 4 },
      }}
    >
      I am a Power BI and data analysis specialist. I create interactive reports and
      visualizations that help businesses make smarter decisions. I combine analytical
      thinking with clean design so the numbers speak for themselves. Beyond Power BI,
      I also work with SQL, DAX, and other tools that support advanced data modeling and
      reporting.
    </Typography>
  </>
);