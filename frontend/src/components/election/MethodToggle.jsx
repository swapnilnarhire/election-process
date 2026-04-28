import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, ToggleButtonGroup, ToggleButton, Tooltip, Typography, Icon, Fade } from '@mui/material';
import { setMethod } from '../../features/election/electionSlice';
import { selectActiveMethod, selectAvailableMethods } from '../../features/election/electionSelectors';

const MethodToggle = () => {
  const dispatch = useDispatch();
  const activeMethod = useSelector(selectActiveMethod);
  const availableMethods = useSelector(selectAvailableMethods);

  const handleChange = (event, newMethod) => {
    if (newMethod !== null) {
      dispatch(setMethod(newMethod));
    }
  };

  if (!availableMethods.length) return null;

  return (
    <Fade in timeout={600}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500, color: 'text.secondary' }}>
          Choose Voting Method
        </Typography>
        <ToggleButtonGroup
          value={activeMethod}
          exclusive
          onChange={handleChange}
          aria-label="voting method"
          sx={{
            '& .MuiToggleButton-root': {
              px: 3,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              '&.Mui-selected': {
                background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                color: '#fff',
                boxShadow: '0 4px 14px rgba(25, 118, 210, 0.35)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1565c0 0%, #1e88e5 100%)',
                },
              },
            },
          }}
        >
          {availableMethods.map((m) => (
            <Tooltip key={m.id} title={m.description || ''} arrow placement="top">
              <ToggleButton value={m.id} aria-label={m.label}>
                <Icon sx={{ mr: 1 }}>{m.icon}</Icon>
                {m.label}
              </ToggleButton>
            </Tooltip>
          ))}
        </ToggleButtonGroup>
      </Box>
    </Fade>
  );
};

export default MethodToggle;
