import { Box } from '@mui/material';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { SkillCard } from './SkillCard';
import { SKILLS } from '@/constants/about';

export const SkillsSection = () => (
  <Box
    sx={(theme) => ({
      display: 'flex',
      justifyContent: 'start',
      width: '50%',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        borderBottom: '2px solid',
        borderColor: 'primary.main',
        pb: 4,
      },
    })}
  >
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 4 }}>
      {/* Mobile Title */}
      <SectionTitle sx={{ display: { xs: 'flex', sm: 'none' }, minWidth: '100%' }}>
        What I Do?
      </SectionTitle>

      {/* Skills */}
      {SKILLS.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </Box>
  </Box>
);