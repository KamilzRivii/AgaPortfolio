import { Box } from '@mui/material';
import Image from 'next/image';
import { LAYOUT_CONSTANTS } from '@/constants/layout';

export const ProfileImage = () => (
  <Box
    sx={{
      width: {
        xs: 0,
        sm: LAYOUT_CONSTANTS.PROFILE_IMAGE.MOBILE,
        lg: LAYOUT_CONSTANTS.PROFILE_IMAGE.TABLET,
        xl: LAYOUT_CONSTANTS.PROFILE_IMAGE.DESKTOP,
      },
      height: {
        xs: 0,
        sm: LAYOUT_CONSTANTS.PROFILE_IMAGE.MOBILE,
        lg: LAYOUT_CONSTANTS.PROFILE_IMAGE.TABLET,
        xl: LAYOUT_CONSTANTS.PROFILE_IMAGE.DESKTOP,
      },
      position: 'relative',
      display: { xs: 'none', sm: 'block' },
    }}
  >
    <Image
      src="/images/portfolio_photo.webp"
      alt="Agnieszka - Power BI Developer portrait"
      width={LAYOUT_CONSTANTS.PROFILE_IMAGE.DESKTOP}
      height={LAYOUT_CONSTANTS.PROFILE_IMAGE.DESKTOP}
      priority
      sizes="(max-width: 700px) 450px, 600px"
      style={{
        borderRadius: '50%',
        objectFit: 'cover',
        width: '100%',
        height: '100%',
      }}
    />
  </Box>
);