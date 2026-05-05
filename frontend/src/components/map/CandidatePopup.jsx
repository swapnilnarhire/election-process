import React from 'react';
import { Box, Typography, Avatar, Chip, Button, Divider, Stack } from '@mui/material';
import { TrendingUp, HowToVote, Map as MapIcon, CompareArrows } from '@mui/icons-material';

const CandidatePopup = ({ candidate, onCompare }) => {
  const { name, party, constituency, tags, metadata } = candidate;

  return (
    <Box sx={{ minWidth: 280, p: 1 }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Avatar 
          src={metadata.image} 
          sx={{ width: 64, height: 64, border: '2px solid', borderColor: 'primary.main' }}
        >
          {name.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {party}
          </Typography>
        </Box>
      </Stack>

      <Box sx={{ mb: 2 }}>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {tags.map((tag) => (
            <Chip 
              key={tag} 
              label={tag} 
              size="small" 
              variant="outlined" 
              sx={{ borderRadius: '4px', fontSize: '0.7rem' }}
            />
          ))}
        </Stack>
      </Box>

      <Divider sx={{ my: 1.5 }} />

      <Stack spacing={1.5}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <HowToVote fontSize="small" color="action" />
            <Typography variant="body2">Last Votes</Typography>
          </Stack>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {metadata.votesLastElection.toLocaleString()}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <TrendingUp fontSize="small" color="action" />
            <Typography variant="body2">Win Prob.</Typography>
          </Stack>
          <Typography variant="body2" sx={{ fontWeight: 600, color: metadata.winProbability > 0.5 ? 'success.main' : 'warning.main' }}>
            {(metadata.winProbability * 100).toFixed(0)}%
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <MapIcon fontSize="small" color="action" />
            <Typography variant="body2">Constituency</Typography>
          </Stack>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {constituency}
          </Typography>
        </Box>
      </Stack>

      <Button
        fullWidth
        variant="contained"
        startIcon={<CompareArrows />}
        onClick={() => onCompare(candidate)}
        sx={{ mt: 2, borderRadius: '8px', textTransform: 'none' }}
      >
        Compare Candidate
      </Button>
    </Box>
  );
};

export default CandidatePopup;
