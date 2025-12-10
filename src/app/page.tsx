'use client';

import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { DecorativeBar } from '@/components/DecorativeBar';
import { HeroContent } from '@/components/HeroContent';
import { ProfileImage } from '@/components/ProfileImage';
import { CircularNavigation } from '@/components/CircularNavigation';
import { LinearNavigation } from '@/components/LinearNavigation';
import { NAV_ITEMS } from '@/constants/navigation';

const Home = () => {
  const theme = useTheme();
  const pathname = usePathname();
  const isLargeScreen = useMediaQuery(theme.breakpoints.down('xl'), { noSsr: true });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <DecorativeBar position="left" />
      <DecorativeBar position="right" />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: { xs: 3, lg: 10 },
          minHeight: '100vh',
        }}
      >
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          spacing={2}
          alignItems="center"
          sx={{ py: { xs: 3, lg: 0 } }}
        >
          <HeroContent />

          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <ProfileImage />

              {mounted && (
                <>
                  {isLargeScreen ? (
                    <LinearNavigation items={NAV_ITEMS} currentPath={pathname} />
                  ) : (
                    <CircularNavigation items={NAV_ITEMS} currentPath={pathname} />
                  )}
                </>
              )}
            </Box>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Home;