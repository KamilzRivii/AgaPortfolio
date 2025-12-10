'use client';

import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { Project } from '@/types/project';
import ProjectModal from '@/components/ProjectModal';
import SideNavigation from '@/components/SideNavigation';
import Line from '@/components/Line';
import { ProjectsSlider } from '@/components/projects/ProjectsSlider';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { useProjects } from '@/hooks/useProjects';
import { LAYOUT_CONSTANTS } from '@/constants/layout';

const Projects = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { projects, loading } = useProjects();

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setOpenModal(true);
  };

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
          maxWidth: LAYOUT_CONSTANTS.PROJECTS.MAX_WIDTH,
          position: 'relative',
          top: 100,
          [theme.breakpoints.down('xl')]: {
            maxWidth: LAYOUT_CONSTANTS.PROJECTS.MAX_WIDTH_TABLET,
          },
          [theme.breakpoints.down('lg')]: {
            maxWidth: LAYOUT_CONSTANTS.PROJECTS.MAX_WIDTH_MOBILE,
            top: 0,
          },
          [theme.breakpoints.down('md')]: {
            maxWidth: '100%',
          },
        })}
      >
        <Typography variant="h1" sx={{ fontWeight: 700, mb: 2 }}>
          PROJECTS
        </Typography>

        <SectionTitle sx={{ mb: 3, minWidth: { xs: '100%', sm: 270 } }}>
          Data isn't just numbers — it tells stories
        </SectionTitle>

        <Typography
          sx={{
            fontWeight: 500,
            mb: 2,
            fontSize: 18,
            borderLeft: '4px solid',
            borderColor: 'secondary.main',
            pl: 2,
          }}
        >
          My projects aim to transform raw information into meaningful insights through
          interactive dashboards. Whether it's uncovering hidden trends or highlighting key
          performance indicators, each project is designed to make data engaging and actionable.
        </Typography>

        <Typography sx={{ fontWeight: 600, mb: 3, fontSize: 18 }}>
          Here are some examples of my personal projects that showcase how I apply these
          principles in practice.
        </Typography>

        {loading ? (
          <Typography>Loading projects...</Typography>
        ) : (
          <ProjectsSlider projects={projects} onProjectClick={handleProjectClick} />
        )}
      </Box>

      <ProjectModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        project={selectedProject}
      />
    </Box>
  );
};

export default Projects;