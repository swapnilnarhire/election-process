import React from 'react';
import { Paper, Typography, Box, Stack } from '@mui/material';

const MapLegend = ({ parties }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        position: 'absolute',
        bottom: 24,
        left: 24,
        zIndex: 1000,
        p: 2,
        borderRadius: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(8px)',
        border: '1px solid',
        borderColor: 'divider',
        maxWidth: 200
      }}
    >
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>
        Political Parties
      </Typography>
      <Stack spacing={1}>
        {parties.map((party) => (
          <Box key={party.name} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: party.color,
                border: '1px solid rgba(0,0,0,0.1)'
              }}
            />
            <Typography variant="caption" sx={{ fontWeight: 500 }}>
              {party.name}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default MapLegend;
