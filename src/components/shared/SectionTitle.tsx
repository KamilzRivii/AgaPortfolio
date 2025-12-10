import { Box, Typography } from '@mui/material';

type SectionTitleProps = {
  children: React.ReactNode;
  sx?: object;
};

export const SectionTitle = ({ children, sx = {} }: SectionTitleProps) => (
  <Box
    sx={{
      display: 'inline-block',
      px: 3,
      py: 1.5,
      width: 'fit-content',
      minWidth: 200,
      mb: 2,
      bgcolor: 'primary.main',
      borderRadius: '24px',
      ...sx,
    }}
  >
    <Typography
      variant="h6"
      sx={{
        fontWeight: 900,
        fontSize: 16,
        letterSpacing: 0,
        color: 'secondary.main',
      }}
    >
      {children}
    </Typography>
  </Box>
);