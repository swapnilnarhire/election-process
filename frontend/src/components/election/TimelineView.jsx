import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';

const TimelineView = ({ data = [] }) => {
  if (!data.length) return null;

  return (
    <Box sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, overflow: 'hidden' }}>
      <List disablePadding>
        {data.map((item, index) => (
          <React.Fragment key={item.id}>
            <ListItem alignItems="flex-start" sx={{ py: 2 }}>
              <ListItemIcon sx={{ mt: 1 }}>
                <EventIcon color="secondary" />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography variant="h6" color="text.primary">
                    {item.phase}
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography component="span" variant="body2" color="primary" sx={{ fontWeight: 'bold', display: 'block', mb: 0.5 }}>
                      {new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            {index < data.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default TimelineView;
