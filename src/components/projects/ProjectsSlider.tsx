import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Project } from '@/types/project';
import { ProjectCard } from './ProjectCard';
import { LAYOUT_CONSTANTS } from '@/constants/layout';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type ProjectsSliderProps = {
  projects: Project[];
  onProjectClick: (project: Project) => void;
};

export const ProjectsSlider = ({ projects, onProjectClick }: ProjectsSliderProps) => (
  <Box
    sx={{
      '& .swiper-button-next, & .swiper-button-prev': {
        color: 'primary.main',
      },
      '& .swiper-pagination-bullet': {
        backgroundColor: 'grey.500',
        opacity: 0.7,
      },
      '& .swiper-pagination-bullet-active': {
        backgroundColor: 'primary.main',
        opacity: 1,
      },
    }}
  >
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 7000 }}
      loop
      style={{ height: LAYOUT_CONSTANTS.PROJECTS.SLIDER_HEIGHT }}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        651: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      }}
    >
      {projects.map((project) => (
        <SwiperSlide key={project.id}>
          <ProjectCard project={project} onClick={onProjectClick} />
        </SwiperSlide>
      ))}
    </Swiper>
  </Box>
);