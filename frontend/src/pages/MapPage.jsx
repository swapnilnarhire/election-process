import React, { useState, useEffect, useCallback } from 'react';
import { Box, Fab, Alert, Snackbar, Typography, Fade } from '@mui/material';
import { FilterList } from '@mui/icons-material';
import CandidateMap from '../components/map/CandidateMap';
import MapFilters from '../components/map/MapFilters';
import MapLegend from '../components/map/MapLegend';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const PARTIES = [
  { name: 'National Progress Party (NPP)', color: '#1a73e8' },
  { name: 'People\'s Democratic Alliance (PDA)', color: '#34a853' },
  { name: 'United Workers Party (UWP)', color: '#ea4335' },
  { name: 'Independent', color: '#70757a' }
];

const MapPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    party: '',
    constituency: '',
    radius: 50,
    lat: null,
    lng: null
  });
  const [mapCenter, setMapCenter] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const fetchCandidates = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.party) params.append('party', filters.party);
      if (filters.constituency) params.append('constituency', filters.constituency);
      if (filters.lat && filters.lng && filters.radius) {
        params.append('lat', filters.lat);
        params.append('lng', filters.lng);
        params.append('radius', filters.radius);
      }

      const response = await axios.get(`${API_BASE_URL}/candidates?${params.toString()}`);
      if (response.data.success) {
        setCandidates(response.data.data);
      }
    } catch (err) {
      setError('Failed to load candidate data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleNearMe = () => {
    if (!navigator.geolocation) {
      setSnackbar({ open: true, message: 'Geolocation is not supported by your browser', severity: 'error' });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFilters(prev => ({ ...prev, lat: latitude, lng: longitude }));
        setMapCenter([latitude, longitude]);
        setSnackbar({ open: true, message: 'Showing candidates near you', severity: 'success' });
      },
      () => {
        setSnackbar({ open: true, message: 'Unable to retrieve your location', severity: 'error' });
      }
    );
  };

  const handleReset = () => {
    setFilters({ party: '', constituency: '', radius: 50, lat: null, lng: null });
    setMapCenter(null);
    setSnackbar({ open: true, message: 'Filters reset', severity: 'info' });
  };

  const handleCompare = (candidate) => {
    setSnackbar({ open: true, message: `Added ${candidate.name} to comparison list (Feature coming soon)`, severity: 'info' });
  };

  return (
    <Fade in={true} timeout={800}>
      <Box sx={{ height: 'calc(100vh - 64px)', width: '100%', position: 'relative', overflow: 'hidden' }}>
        {error && (
          <Alert severity="error" sx={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 2000 }}>
            {error}
          </Alert>
        )}

        <CandidateMap 
          candidates={candidates} 
          parties={PARTIES} 
          center={mapCenter}
          onCompare={handleCompare}
        />
        
        <MapLegend parties={PARTIES} />

        <Fab 
          color="primary" 
          aria-label="filter" 
          onClick={() => setFilterOpen(true)}
          sx={{ position: 'absolute', top: 24, right: 24, zIndex: 1000 }}
        >
          <FilterList />
        </Fab>

        <MapFilters 
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
          parties={PARTIES}
          onNearMe={handleNearMe}
          onReset={handleReset}
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>

        <Box sx={{ position: 'absolute', bottom: 24, right: 24, zIndex: 1000, pointerEvents: 'none' }}>
           <Typography variant="caption" sx={{ 
             backgroundColor: 'rgba(255,255,255,0.8)', 
             px: 1.5, py: 0.5, borderRadius: '20px', 
             fontWeight: 600, border: '1px solid', borderColor: 'divider',
             color: 'text.secondary'
           }}>
             {candidates.length} Candidates Found
           </Typography>
        </Box>
      </Box>
    </Fade>
  );
};

export default MapPage;
