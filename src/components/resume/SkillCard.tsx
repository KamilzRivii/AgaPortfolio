import { Box, Typography } from '@mui/material';
import { Skill } from '@/constants/resume';
import { LAYOUT_CONSTANTS } from '@/constants/layout';

type SkillCardProps = {
  skill: Skill;
};

export const SkillCard = ({ skill }: SkillCardProps) => (
  <Box
    sx={(theme) => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      minWidth: LAYOUT_CONSTANTS.RESUME.SKILL_CARD_MIN_WIDTH,
      [theme.breakpoints.down('sm')]: {
        minWidth: '100%',
      },
    })}
  >
    <Box
      sx={(theme) => ({
        display: 'inline-block',
        px: 3,
        py: 0.5,
        bgcolor: 'secondary.main',
        minWidth: LAYOUT_CONSTANTS.RESUME.SKILL_CARD_MIN_WIDTH,
        borderRadius: '24px',
        color: 'white',
        fontWeight: 700,
        mb: 1,
        [theme.breakpoints.down('md')]: {
          minWidth: '100%',
        },
      })}
    >
      <Typography
        sx={{
          fontWeight: 900,
          fontSize: 14,
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        {skill.title}
      </Typography>
    </Box>
    <Typography sx={{ color: 'secondary.main', fontSize: 12 }}>
      {skill.description}
    </Typography>
  </Box>
);