'use client';

import { Box } from '@mui/material';
import SideNavigation from '@/components/SideNavigation';
import Line from '@/components/Line';
import { AboutHeader } from '@/components/about/AboutHeader';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { SkillsSection } from '@/components/about/SkillsSection';
import { ValuesSection } from '@/components/about/ValuesSection';

const About = () => {
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
      <Line />

      <Box
        sx={(theme) => ({
          maxWidth: 700,
          position: 'relative',
          top: 100,
          [theme.breakpoints.down('lg')]: {
            maxWidth: '100%',
            top: 0,
          },
        })}
      >
        <AboutHeader />

        {/* Section Titles - Desktop Only */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            justifyContent: 'space-around',
          }}
        >
          <SectionTitle>What I Do?</SectionTitle>
          <SectionTitle>Value I Deliver</SectionTitle>
        </Box>

        {/* Main Content */}
        <Box
          sx={(theme) => ({
            display: 'flex',
            gap: 4,
            [theme.breakpoints.down('sm')]: {
              display: 'block',
              justifyItems: 'center',
            },
          })}
        >
          <SkillsSection />
          <ValuesSection />
        </Box>
      </Box>
    </Box>
  );
};

export default About;