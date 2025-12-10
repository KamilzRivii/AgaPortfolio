import { Box, Typography } from '@mui/material';
import { Project } from '@/types/project';
import { LAYOUT_CONSTANTS } from '@/constants/layout';

type ProjectCardProps = {
  project: Project;
  onClick: (project: Project) => void;
};

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => (
  <Box
    onClick={() => onClick(project)}
    sx={{
      cursor: 'pointer',
      borderRadius: 2,
      overflow: 'hidden',
      height: LAYOUT_CONSTANTS.PROJECTS.CARD_HEIGHT,
      border: '1px solid',
      borderColor: 'grey.300',
      boxShadow: 3,
      transition: 'box-shadow 0.3s',
      '&:hover': {
        boxShadow: 8,
      },
    }}
  >
    <Box
      component="img"
      src={project.img}
      alt={project.title}
      sx={{
        width: '100%',
        height: LAYOUT_CONSTANTS.PROJECTS.IMAGE_HEIGHT,
        objectFit: 'cover',
      }}
    />
    <Box
      sx={{
        p: 2,
        bgcolor: 'white',
        height: LAYOUT_CONSTANTS.PROJECTS.CONTENT_HEIGHT,
        overflowY: 'auto',
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: { xs: 14, lg: 16 },
        }}
      >
        {project.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {project.descriptionMain}
      </Typography>
    </Box>
  </Box>
);