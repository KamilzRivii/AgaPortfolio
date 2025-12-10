'use client';

import { Box, Typography } from '@mui/material';
import SideNavigation from '@/components/SideNavigation';
import Line from '@/components/Line';
import { SocialLink } from '@/components/contact/SocialLink';
import { SOCIAL_LINKS } from '@/constants/social';
import { LAYOUT_CONSTANTS } from '@/constants/layout';

const Contact = () => {
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
          maxWidth: LAYOUT_CONSTANTS.CONTACT.MAX_WIDTH,
          position: 'relative',
          top: 100,
          [theme.breakpoints.down('lg')]: {
            maxWidth: '100%',
            top: 0,
          },
        })}
      >
        <Typography variant="h1" sx={{ fontWeight: 700, mb: 5 }}>
          CONTACT
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 500 }}>
            Feel
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 900 }}>
            free
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 500 }}>
            to contact me!
          </Typography>
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 500, mb: { xs: 3, sm: 8 } }}>
          I'm always open to new opportunities, collaborations, or simply a good conversation.
          Got a question, an idea, or a challenge? Drop me a message – I'll be glad to talk!
        </Typography>

        {/* Social Links */}
        <Box
          sx={(theme) => ({
            display: 'flex',
            justifyContent: 'space-around',
            mb: 10,
            [theme.breakpoints.down('sm')]: {
              display: 'block',
              justifyItems: 'center',
              mb: 3,
            },
          })}
        >
          {SOCIAL_LINKS.map((social) => (
            <SocialLink key={social.id} social={social} />
          ))}
        </Box>

        {/* Footer Message */}
        <Box sx={{ bgcolor: 'secondary.main', py: 1, px: 1, borderRadius: 2 }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 18,
              display: 'flex',
              color: 'white',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            Your message means a lot, and I'll get back to you as soon as possible.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;