import { Box } from '@mui/material';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ValueCard } from './ValueCard';
import { VALUE_PROPOSITIONS } from '@/constants/about';

export const ValuesSection = () => (
  <Box
    sx={(theme) => ({
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 4,
      mt: 4,
      width: '50%',
      [theme.breakpoints.down('lg')]: {
        gridTemplateColumns: 'repeat(1, 1fr)',
        justifyItems: 'center',
        alignContent: 'start',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    })}
  >
    {/* Mobile Title */}
    <SectionTitle sx={{ display: { xs: 'inline-block', sm: 'none' }, minWidth: '100%' }}>
      Value I Deliver
    </SectionTitle>

    {/* Values */}
    {VALUE_PROPOSITIONS.map((value) => (
      <ValueCard key={value.id} value={value} />
    ))}
  </Box>
);