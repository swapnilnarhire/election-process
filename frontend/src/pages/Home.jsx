import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Container, Grid, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchElectionData } from '../features/election/electionSlice';
import { selectProcess, selectTimeline, selectFaqs, selectLoading } from '../features/election/electionSelectors';
import Loader from '../components/common/Loader';
import StepperView from '../components/election/StepperView';
import TimelineView from '../components/election/TimelineView';

const Home = () => {
  const dispatch = useDispatch();
  const process = useSelector(selectProcess);
  const timeline = useSelector(selectTimeline);
  const faqs = useSelector(selectFaqs);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchElectionData());
  }, [dispatch]);

  if (loading) {
    return <Loader message="Loading Election Data..." />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
        Interactive Election Assistant
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" sx={{ mb: 6 }}>
        Your comprehensive guide to the election process, timeline, and FAQs.
      </Typography>

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
            <Box mt={2}>
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
    </Container>
  );
};

export default Home;
