import { Box, Typography } from '@mui/material';
import { Skill } from '@/types/about';

type SkillCardProps = {
  skill: Skill;
};

export const SkillCard = ({ skill }: SkillCardProps) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    {/* Icon Circle */}
    <Box
      sx={(theme) => ({
        width: 100,
        height: 100,
        borderRadius: '50%',
        bgcolor: 'primary.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: 'secondary.main',
        [theme.breakpoints.down('lg')]: {
          borderRadius: 0,
          width: '100%',
          height: 'auto',
          px: 1,
        },
      })}
    >
      {/* Desktop: show icon */}
      <Box
        sx={{
          display: { xs: 'none', lg: 'block' },
        }}
      >
        {skill.icon}
      </Box>

      {/* Mobile: show full content */}
      <Box
        sx={{
          display: { xs: 'block', lg: 'none' },
          textAlign: 'center',
          py: 1,
        }}
      >
        <Typography sx={{ color: 'secondary.main', fontWeight: 900, fontSize: 14 }}>
          {skill.title}
        </Typography>
        <Typography sx={{ color: 'secondary.main', fontWeight: 500, fontSize: 12 }}>
          {skill.description}
        </Typography>
      </Box>
    </Box>

    {/* Desktop: show text beside icon */}
    <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
      <Typography sx={{ color: 'secondary.main', fontWeight: 900, fontSize: 16 }}>
        {skill.title}
      </Typography>
      <Typography sx={{ color: 'secondary.main', fontWeight: 500, fontSize: 12 }}>
        {skill.description}
      </Typography>
    </Box>
  </Box>
);