import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  useTheme,
  useMediaQuery,
  Stack
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  HowToVote, 
  Map as MapIcon, 
  Home as HomeIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home', path: '/', icon: <HomeIcon /> },
  { label: 'Election Map', path: '/map', icon: <MapIcon /> },
  { label: 'Process Details', path: '/details', icon: <InfoIcon /> },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 700, color: 'primary.main' }}>
        Election Assistant
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem 
            button 
            key={item.label} 
            onClick={() => handleNavClick(item.path)}
            selected={location.pathname === item.path}
            sx={{ borderRadius: '8px', mb: 1 }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              {item.icon}
              <ListItemText primary={item.label} />
            </Stack>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0} 
        sx={{ 
          backgroundColor: 'background.paper', 
          borderBottom: '1px solid',
          borderColor: 'divider',
          color: 'text.primary',
          backdropFilter: 'blur(8px)',
          background: 'rgba(255, 255, 255, 0.8)'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            {/* Logo */}
            <Stack 
              direction="row" 
              spacing={1} 
              alignItems="center" 
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              <HowToVote color="primary" fontSize="large" />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 800,
                  letterSpacing: '-0.5px',
                  color: 'primary.main',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                VOTE ASSIST
              </Typography>
            </Stack>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    startIcon={item.icon}
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontWeight: 600,
                      color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                      backgroundColor: location.pathname === item.path ? 'primary.light' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'primary.light',
                        color: 'primary.main',
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* Mobile Menu Toggle */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
