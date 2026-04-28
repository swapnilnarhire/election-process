import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Container, Grid, Paper, Accordion, AccordionSummary, AccordionDetails, Fade, Chip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchElectionData } from '../features/election/electionSlice';
import {
  selectFilteredProcess,
  selectFilteredTimeline,
  selectFilteredFaqs,
  selectLoading,
  selectActiveMethod,
  selectOfflineProcess,
  selectOnlineProcess,
} from '../features/election/electionSelectors';
import Loader from '../components/common/Loader';
import StepperView from '../components/election/StepperView';
import TimelineView from '../components/election/TimelineView';
import MethodToggle from '../components/election/MethodToggle';

const Home = () => {
  const dispatch = useDispatch();
  const process = useSelector(selectFilteredProcess);
  const timeline = useSelector(selectFilteredTimeline);
  const faqs = useSelector(selectFilteredFaqs);
  const loading = useSelector(selectLoading);
  const activeMethod = useSelector(selectActiveMethod);
  const offlineProcess = useSelector(selectOfflineProcess);
  const onlineProcess = useSelector(selectOnlineProcess);

  useEffect(() => {
    dispatch(fetchElectionData());
  }, [dispatch]);

  if (loading) {
    return <Loader message="Loading Election Data..." />;
  }

  const isCompare = activeMethod === 'compare';

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
        Interactive Election Assistant
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" sx={{ mb: 4 }}>
        Your comprehensive guide to the election process, timeline, and FAQs.
      </Typography>

      {/* Method Toggle */}
      <MethodToggle />

      <Fade in key={activeMethod} timeout={400}>
        <div>
          {/* Compare Mode */}
          {isCompare ? (
            <Grid container spacing={4}>
              {/* Offline Column */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 3, height: '100%', borderTop: '4px solid', borderColor: 'warning.main' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Chip label="Offline" color="warning" size="small" />
                    <Typography variant="h5" color="warning.dark">
                      Traditional Method
                    </Typography>
                  </Box>
                  <StepperView data={offlineProcess} />
                </Paper>
              </Grid>

              {/* Online Column */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 3, height: '100%', borderTop: '4px solid', borderColor: 'info.main' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Chip label="Online" color="info" size="small" />
                    <Typography variant="h5" color="info.dark">
                      Digital Method
                    </Typography>
                  </Box>
                  <StepperView data={onlineProcess} />
                </Paper>
              </Grid>

              {/* Timeline */}
              <Grid size={{ xs: 12 }}>
                <Paper sx={{ p: 3, mt: 2 }}>
                  <Typography variant="h5" gutterBottom color="secondary">
                    Combined Timeline
                  </Typography>
                  <TimelineView data={timeline} />
                </Paper>
              </Grid>

              {/* FAQ */}
              <Grid size={{ xs: 12 }}>
                <Paper sx={{ p: 3, mt: 2 }}>
                  <Typography variant="h5" gutterBottom color="secondary">
                    Frequently Asked Questions
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {faqs.map((faq) => (
                      <Accordion key={faq.id}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography fontWeight="medium">{faq.question}</Typography>
                            {faq.methods?.map((m) => (
                              <Chip key={m} label={m} size="small" variant="outlined" />
                            ))}
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography color="textSecondary">{faq.answer}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                    {!faqs.length && <Typography color="textSecondary">No FAQs available at the moment.</Typography>}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          ) : (
            /* Single Method Mode */
            <Grid container spacing={4}>
              {/* Process Section */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h5" gutterBottom color="secondary">
                    Step-by-Step Process
                  </Typography>
                  <StepperView data={process} />
                </Paper>
              </Grid>

              {/* Timeline Section */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h5" gutterBottom color="secondary">
                    Election Timeline
                  </Typography>
                  <TimelineView data={timeline} />
                </Paper>
              </Grid>

              {/* FAQ Section */}
              <Grid size={{ xs: 12 }}>
                <Paper sx={{ p: 3, mt: 2 }}>
                  <Typography variant="h5" gutterBottom color="secondary">
                    Frequently Asked Questions
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {faqs.map((faq) => (
                      <Accordion key={faq.id}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography fontWeight="medium">{faq.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography color="textSecondary">{faq.answer}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                    {!faqs.length && <Typography color="textSecondary">No FAQs available at the moment.</Typography>}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          )}
        </div>
      </Fade>
    </Container>
  );
};

export default Home;
