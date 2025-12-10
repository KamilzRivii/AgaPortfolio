'use client';

import { Box, Typography, Modal, IconButton, Fade, Backdrop } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import HandymanRoundedIcon from '@mui/icons-material/HandymanRounded';
import TrackChangesRoundedIcon from '@mui/icons-material/TrackChangesRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Project, ProjectModalProps } from '@/types/project';
import { LAYOUT_CONSTANTS } from '@/constants/layout';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProjectModal = ({ open, onClose, project }: ProjectModalProps) => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  if (!project) return null;

  return (
    <>
      {/* Main Modal */}
      <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={open} timeout={500}>
          <Box
            sx={(theme) => ({
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'white',
              p: 4,
              borderRadius: 4,
              boxShadow: 24,
              maxWidth: LAYOUT_CONSTANTS.MODAL.MAX_WIDTH,
              maxHeight: '90vh',
              overflowY: 'auto',
              [theme.breakpoints.down('lg')]: {
                maxWidth: '100%',
              },
            })}
          >
            {/* Close Button */}
            <IconButton
              onClick={onClose}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                color: 'grey.500',
                '&:hover': {
                  color: 'secondary.main',
                  bgcolor: 'rgba(0, 0, 0, 0.05)',
                },
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* Title */}
            {project.title && (
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, pr: 4 }}>
                {project.title}
              </Typography>
            )}

            {/* Description */}
            {project.descriptionModal && (
              <Typography sx={{ mb: 2 }}>{project.descriptionModal}</Typography>
            )}

            {/* Project Goal */}
            {project.target && (
              <Typography
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  fontSize: 16,
                  gap: 2,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <TrackChangesRoundedIcon
                  sx={{ fontSize: LAYOUT_CONSTANTS.MODAL.ICON_SIZE, color: 'primary.main' }}
                />
                Project goal: {project.target}
              </Typography>
            )}

            {/* Image Slider */}
            {(project?.images?.length ?? 0) > 0 && (
              <Box
                sx={{
                  mb: 3,
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
                  spaceBetween={10}
                  slidesPerView={1}
                  navigation
                  autoplay={{ delay: 7000 }}
                  loop
                  pagination={{ clickable: true }}
                  style={{ height: LAYOUT_CONSTANTS.MODAL.IMAGE_HEIGHT }}
                >
                  {project.images?.map((image, idx) => (
                    <SwiperSlide key={idx}>
                      <Box
                        component="img"
                        src={image}
                        alt={`${project.title} view ${idx + 1}`}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          borderRadius: 2,
                          cursor: 'zoom-in',
                        }}
                        onClick={() => setZoomedImage(image)}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>
            )}

            {/* Technologies */}
            {project.tech && (
              <Typography
                variant="body2"
                sx={{
                  color: 'secondary.main',
                  my: 3,
                  gap: 2,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <HandymanRoundedIcon
                  sx={{ fontSize: LAYOUT_CONSTANTS.MODAL.ICON_SIZE, color: 'primary.main' }}
                />
                Technologies: {project.tech}
              </Typography>
            )}

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Key Features:
                </Typography>
                <ul>
                  {project.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </>
            )}

            {/* Value/Results */}
            {project.results && (
              <>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, my: 2 }}>
                  Value:
                </Typography>
                <Typography sx={{ mb: 3 }}>{project.results}</Typography>
              </>
            )}

            {/* Project Date */}
            {project.date && (
              <Typography
                variant="body2"
                sx={{
                  color: 'grey.500',
                  gap: 2,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <CalendarMonthRoundedIcon
                  sx={{ fontSize: LAYOUT_CONSTANTS.MODAL.ICON_SIZE, color: 'primary.main' }}
                />
                Project date: {project.date}
              </Typography>
            )}
          </Box>
        </Fade>
      </Modal>

      {/* Zoom Modal */}
      <Modal open={!!zoomedImage} onClose={() => setZoomedImage(null)}>
        <Fade in={!!zoomedImage}>
          <Box
            sx={(theme) => ({
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'white',
              p: 2,
              borderRadius: 2,
              maxWidth: '90%',
              maxHeight: '90%',
              [theme.breakpoints.down('lg')]: {
                width: '100%',
                height: 'fit-content',
                maxWidth: '100%',
                maxHeight: '100%',
                bgcolor: 'transparent',
                p: 0,
              },
            })}
          >
            <IconButton
              onClick={() => setZoomedImage(null)}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'grey.500',
                '&:hover': { color: 'secondary.main' },
                display: { xs: 'none', lg: 'flex' },
              }}
            >
              <CloseIcon />
            </IconButton>
            {zoomedImage && (
              <Box
                component="img"
                src={zoomedImage}
                alt="Zoomed project image"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ProjectModal;