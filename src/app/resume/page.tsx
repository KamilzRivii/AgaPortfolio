'use client';

import { Box, Typography } from '@mui/material';
import SideNavigation from '@/components/SideNavigation';
import Line from '@/components/Line';
import { Timeline } from '@/components/resume/Timeline';
import { SkillCategory } from '@/components/resume/SkillCategory';
import { SKILL_CATEGORIES } from '@/constants/resume';
import { LAYOUT_CONSTANTS } from '@/constants/layout';

const Resume = () => {
  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'flex-start',
        height: '100vh',
        justifyContent: 'center',
        p: 4,
        [theme.breakpoints.down('lg')]: {
          display: 'block',
          height: 'auto',
        },
      })}
    >
      <SideNavigation aboutPhoto="/images/profile_photo_2.webp" />

      <Box
        sx={{
          display: { xs: 'none', xxxl: 'block' },
        }}
        >
        <Line />
        <Timeline />
      </Box>

      <Box
        sx={(theme) => ({
          maxWidth: LAYOUT_CONSTANTS.RESUME.MAX_WIDTH,
          position: 'relative',
          paddingLeft: 2,
          top: 100,
          [theme.breakpoints.down('xxl')]: {
            paddingLeft: 3,
          },
          [theme.breakpoints.down('xl')]: {
            paddingLeft: 0,
          },
          [theme.breakpoints.down('lg')]: {
            maxWidth: '100%',
            top: 0,
          },
        })}
      >
        <Typography variant="h1" sx={{ fontWeight: 700, mb: 5 }}>
          RESUME
        </Typography>

        {SKILL_CATEGORIES.map((category) => (
          <SkillCategory key={category.id} category={category} />
        ))}
      </Box>
    </Box>
  );
};

export default Resume;