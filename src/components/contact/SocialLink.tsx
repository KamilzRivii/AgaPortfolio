import { Box, Link, Typography } from '@mui/material';
import { SocialLink as SocialLinkType } from '@/constants/social';
import { LAYOUT_CONSTANTS } from '@/constants/layout';

type SocialLinkProps = {
  social: SocialLinkType;
};

export const SocialLink = ({ social }: SocialLinkProps) => {
  const Icon = social.icon;

  return (
    <Box sx={{ display: 'block', alignItems: 'center', mb: { xs: 3, sm: 0 } }}>
      <Link href={social.url} target={social.id !== 'email' ? '_blank' : undefined} underline="none">
        <Box
          sx={{
            width: LAYOUT_CONSTANTS.CONTACT.ICON_SIZE,
            height: LAYOUT_CONSTANTS.CONTACT.ICON_SIZE,
            cursor: 'pointer',
            borderRadius: '50%',
            bgcolor: 'primary.main',
            display: 'flex',
            mb: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon
            sx={{
              fontSize: LAYOUT_CONSTANTS.CONTACT.ICON_FONT_SIZE,
              color: 'secondary.main',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.2)',
              },
            }}
          />
        </Box>
        <Typography
          sx={{
            color: 'secondary.main',
            fontWeight: 900,
            width: LAYOUT_CONSTANTS.CONTACT.ICON_SIZE,
            justifyContent: 'center',
            display: 'flex',
            fontSize: 16,
          }}
        >
          {social.label}
        </Typography>
      </Link>
    </Box>
  );
};