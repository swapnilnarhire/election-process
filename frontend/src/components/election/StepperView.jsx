import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, StepContent, Typography, Button, Paper, Icon } from '@mui/material';

const StepperView = ({ data = [] }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => setActiveStep(0);

  if (!data.length) return null;

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto' }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {data.map((step, index) => (
          <Step key={step.id}>
            <StepLabel
              icon={<Icon color={step.metadata?.color || 'primary'}>{step.metadata?.icon || 'circle'}</Icon>}
            >
              <Typography variant="h6">{step.title}</Typography>
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              {step.metadata?.image && (
                <Box sx={{ mt: 2, mb: 2, borderRadius: 2, overflow: 'hidden', boxShadow: 1, maxWidth: 300 }}>
                  <img src={step.metadata.image} alt={step.title} style={{ width: '100%', display: 'block' }} />
                </Box>
              )}
              <Box sx={{ mb: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {index === data.length - 1 ? 'Finish' : 'Continue'}
                </Button>
                <Button
                  disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === data.length && (
        <Paper square elevation={0} sx={{ p: 3, mt: 2, bgcolor: 'transparent' }}>
          <Typography>All steps completed - you&apos;re finished!</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default StepperView;
