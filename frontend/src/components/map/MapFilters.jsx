import React from 'react';
import { 
  Drawer, 
  Box, 
  Typography, 
  IconButton, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Slider, 
  Button, 
  Stack,
  TextField
} from '@mui/material';
import { Close, FilterList, MyLocation, RestartAlt } from '@mui/icons-material';

const MapFilters = ({ 
  open, 
  onClose, 
  filters, 
  onFilterChange, 
  parties, 
  onNearMe,
  onReset 
}) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 350 }, p: 3 }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <FilterList color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Map Filters</Typography>
        </Stack>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      <Stack spacing={4}>
        {/* Search by Constituency */}
        <TextField
          label="Search Constituency"
          variant="outlined"
          fullWidth
          value={filters.constituency || ''}
          onChange={(e) => onFilterChange('constituency', e.target.value)}
        />

        {/* Party Filter */}
        <FormControl fullWidth>
          <InputLabel>Political Party</InputLabel>
          <Select
            value={filters.party || ''}
            label="Political Party"
            onChange={(e) => onFilterChange('party', e.target.value)}
          >
            <MenuItem value="">All Parties</MenuItem>
            {parties.map((party) => (
              <MenuItem key={party.name} value={party.name}>
                {party.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Radius Search */}
        <Box>
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
            Search Radius (km): {filters.radius || 10}
          </Typography>
          <Slider
            value={filters.radius || 10}
            min={1}
            max={100}
            onChange={(_, val) => onFilterChange('radius', val)}
            valueLabelDisplay="auto"
          />
        </Box>

        <Button
          variant="outlined"
          startIcon={<MyLocation />}
          onClick={onNearMe}
          fullWidth
          sx={{ borderRadius: '8px', py: 1.5 }}
        >
          Candidates Near Me
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          variant="text"
          startIcon={<RestartAlt />}
          onClick={onReset}
          color="error"
          sx={{ mt: 'auto' }}
        >
          Reset All Filters
        </Button>
      </Stack>
    </Drawer>
  );
};

export default MapFilters;
