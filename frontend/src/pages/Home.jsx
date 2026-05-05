import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Button, 
  Card, 
  CardContent, 
  CardActions, 
  Fade,
  Stack
} from '@mui/material';
import { 
  Map as MapIcon, 
  TrendingUp, 
  Assignment as DetailsIcon,
  Security,
  VerifiedUser,
  History
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Fade in={true} timeout={800}>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 900, 
              letterSpacing: '-2.5px',
              background: 'linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3,
              fontSize: { xs: '3rem', md: '4.5rem' }
            }}
          >
            Your Vote, Your Future.
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary" 
            sx={{ 
              maxWidth: 800, 
              mx: 'auto', 
              mb: 6, 
              fontWeight: 400,
              lineHeight: 1.6
            }}
          >
            The Election Assistant is your one-stop portal for all things voting. 
            From interactive candidate maps to detailed process guides, we've got you covered.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mb: 8 }}>
            <Button 
              variant="contained" 
              size="large" 
              startIcon={<MapIcon />}
              onClick={() => navigate('/map')}
              sx={{ px: 4, py: 1.5, borderRadius: '12px', fontSize: '1.1rem', fontWeight: 600 }}
            >
              Explore Candidate Map
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              startIcon={<DetailsIcon />}
              onClick={() => navigate('/details')}
              sx={{ px: 4, py: 1.5, borderRadius: '12px', fontSize: '1.1rem', fontWeight: 600 }}
            >
              View Process Details
            </Button>
          </Stack>
        </Box>

        {/* Feature Cards */}
        <Grid container spacing={4}>
          {[
            {
              title: 'Interactive Map',
              desc: 'Locate candidates and polling stations in your area with our real-time GPS map.',
              icon: <MapIcon sx={{ fontSize: 40 }} />,
              path: '/map',
              color: '#1a73e8'
            },
            {
              title: 'Process Guide',
              desc: 'Step-by-step instructions for both Online and Offline voting registration.',
              icon: <DetailsIcon sx={{ fontSize: 40 }} />,
              path: '/details',
              color: '#34a853'
            },
            {
              title: 'Candidate Comparison',
              desc: 'Compare candidates side-by-side on metrics like win probability and past votes.',
              icon: <TrendingUp sx={{ fontSize: 40 }} />,
              path: '/map', // For now, comparison starts at the map
              color: '#ea4335'
            }
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  borderRadius: '24px', 
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': { 
                    transform: 'translateY(-10px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    borderColor: feature.color
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ 
                    width: 64, 
                    height: 64, 
                    borderRadius: '16px', 
                    backgroundColor: `${feature.color}15`, 
                    color: feature.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 800 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                    {feature.desc}
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 4, pb: 4 }}>
                  <Button 
                    fullWidth 
                    variant="text" 
                    onClick={() => navigate(feature.path)}
                    sx={{ 
                      justifyContent: 'flex-start', 
                      p: 0, 
                      fontWeight: 700, 
                      color: feature.color,
                      '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' }
                    }}
                  >
                    Learn More &rarr;
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Trust Badges Section */}
        <Box sx={{ mt: 12, p: 6, borderRadius: '32px', backgroundColor: 'action.hover', textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '2px' }}>
            Powered by Secure Technology
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              { icon: <Security />, label: 'End-to-End Encrypted' },
              { icon: <VerifiedUser />, label: 'Verified Candidates' },
              { icon: <History />, label: 'Real-time Updates' }
            ].map((badge, i) => (
              <Grid item key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ color: 'primary.main' }}>{badge.icon}</Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{badge.label}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Fade>
  );
};

export default Home;
