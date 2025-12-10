'use client';

import { Box, Typography, IconButton, Collapse } from '@mui/material';
import { useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { LAYOUT_CONSTANTS } from '@/constants/layout';

type MenuItem = {
  label: string;
  path: string;
};

type SideNavigationProps = {
  aboutPhoto: string;
};

const MENU_ITEMS: MenuItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Resume', path: '/resume' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
];

const SideNavigation = ({ aboutPhoto }: SideNavigationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const activeIndex = MENU_ITEMS.findIndex((item) => item.path === pathname) ?? 0;

  const handleArrowUp = () => {
    const newIndex = activeIndex > 0 ? activeIndex - 1 : MENU_ITEMS.length - 1;
    router.push(MENU_ITEMS[newIndex].path);
  };

  const handleArrowDown = () => {
    const newIndex = activeIndex < MENU_ITEMS.length - 1 ? activeIndex + 1 : 0;
    router.push(MENU_ITEMS[newIndex].path);
  };

  const handleMenuClick = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: LAYOUT_CONSTANTS.SIDE_NAV.WIDTH_DESKTOP,
        [theme.breakpoints.down('xxl')]: {
          paddingRight: '3rem',
        },
        [theme.breakpoints.down('lg')]: {
          width: LAYOUT_CONSTANTS.SIDE_NAV.WIDTH_TABLET,
          flexDirection: 'row',
          height: LAYOUT_CONSTANTS.SIDE_NAV.HEIGHT_MOBILE,
          paddingRight: 0,
          mb: 2,
        },
        [theme.breakpoints.down('md2')]: {
          height: 'fit-content',
          mb: 5,
          display: 'block',
        },
      })}
    >
      {/* Photo Section */}
      <Box
        sx={{
          flex: 5,
          bgcolor: 'grey.700',
          display: { xs: 'none', md2: 'flex' },
          borderTopLeftRadius: 20,
          borderTopRightRadius: { xs: 0, lg: 20 },
          borderBottomLeftRadius: { xs: 20, lg: 0 },
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={(theme) => ({
            position: 'relative',
            width: LAYOUT_CONSTANTS.SIDE_NAV.IMAGE_SIZE_DESKTOP,
            height: LAYOUT_CONSTANTS.SIDE_NAV.IMAGE_SIZE_DESKTOP,
            borderRadius: '50%',
            border: '3px solid white',
            overflow: 'hidden',
            [theme.breakpoints.down('xxl')]: {
              width: LAYOUT_CONSTANTS.SIDE_NAV.IMAGE_SIZE_LAPTOP,
              height: LAYOUT_CONSTANTS.SIDE_NAV.IMAGE_SIZE_LAPTOP,
              mx: { xs: 1, lg: 3 },
            },
            [theme.breakpoints.down('xl')]: {
              width: LAYOUT_CONSTANTS.SIDE_NAV.IMAGE_SIZE_TABLET,
              height: LAYOUT_CONSTANTS.SIDE_NAV.IMAGE_SIZE_TABLET,
              mx: { xs: 1, lg: 3 },
            },
            [theme.breakpoints.down('lg')]: {
              width: LAYOUT_CONSTANTS.SIDE_NAV.IMAGE_SIZE_MOBILE,
              height: LAYOUT_CONSTANTS.SIDE_NAV.IMAGE_SIZE_MOBILE,
              mx: { xs: 1, lg: 3 },
            },
          })}
        >
          <Image src={aboutPhoto} alt="My portrait" fill style={{ objectFit: 'cover' }} />
        </Box>
      </Box>

      {/* Menu Section */}
      <Box
        sx={{
          flex: 5,
          borderBottomLeftRadius: { xs: 20, md2: 0, lg: 20 },
          borderBottomRightRadius: 20,
          borderTopRightRadius: { xs: 20, lg: 0 },
          borderTopLeftRadius: { xs: 20, md2: 0, lg: 0 },
          bgcolor: 'primary.main',
          display: 'flex',
          flexDirection: { xs: 'row', lg: 'column' },
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 3,
          gap: { xs: 2, lg: 0 },
          width: { xs: '100%', lg: 'auto' },
        }}
      >
        {/* Mobile Hamburger */}
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' }, alignSelf: 'flex-start' }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <MenuIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
        </IconButton>

        {/* Arrow Up - Desktop Only */}
        <KeyboardArrowUpIcon
          onClick={handleArrowUp}
          sx={{
            display: { xs: 'none', lg: 'block' },
            fontSize: 40,
            color: 'secondary.main',
            cursor: 'pointer',
            '&:hover': {
              color: 'secondary.contrastText',
              transition: 'color 0.2s',
            },
          }}
        />

        {/* Menu Items - Desktop */}
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Typography
              key={item.path}
              onClick={() => handleMenuClick(item.path)}
              sx={{
                display: { xs: 'none', sm: 'flex' },
                cursor: 'pointer',
                fontSize: { xs: 18, lg: 24 },
                fontWeight: 700,
                mb: { xs: 0, md2: 2 },
                color: isActive ? 'white' : 'secondary.main',
                transition: 'color 0.2s',
                '&:hover': { color: 'white' },
              }}
            >
              {item.label}
            </Typography>
          );
        })}

        {/* Arrow Down - Desktop Only */}
        <KeyboardArrowDownIcon
          onClick={handleArrowDown}
          sx={{
            display: { xs: 'none', lg: 'block' },
            fontSize: 40,
            color: 'secondary.main',
            cursor: 'pointer',
            '&:hover': {
              color: 'secondary.contrastText',
              transition: 'color 0.2s',
            },
          }}
        />
      </Box>

      {/* Mobile Dropdown Menu */}
      <Collapse in={open} timeout={500}>
        <Box
          sx={{
            display: { xs: 'flex', sm: 'none' },
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '20px',
            mt: 2,
            py: 2,
            bgcolor: 'primary.main',
            width: '100%',
          }}
        >
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Typography
                key={item.path}
                onClick={() => handleMenuClick(item.path)}
                sx={{
                  cursor: 'pointer',
                  fontSize: 18,
                  fontWeight: 700,
                  mb: 1,
                  color: isActive ? 'white' : 'secondary.main',
                  '&:hover': { color: 'white' },
                }}
              >
                {item.label}
              </Typography>
            );
          })}
        </Box>
      </Collapse>
    </Box>
  );
};

export default SideNavigation;