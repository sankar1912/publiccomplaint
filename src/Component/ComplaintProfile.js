import { Box, Typography, Paper, Grid, Avatar, Divider, Stepper, Step, StepLabel } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const steps = [
  'Submitted to Admin',
  'Under Review',
  'Verification in Progress',
  'Action Taken',
  'Resolved',
  'Closed'
];

function ComplaintProfile() {
  const location = useLocation();
  const { complaint } = location.state || {};

  // Placeholder for the complaint status, assuming it's a number between 0-5 indicating the current step.
  const [complaintStatus, setComplaintStatus] = useState(2); // Example: 'Verification in Progress'

  return (
    <Paper elevation={7} sx={{ padding: 4, margin: 'auto', width: '90vw', maxWidth: '1000px' }}>
      <Typography variant="h4" gutterBottom align="center">
        Complaint Profile
      </Typography>

      {complaint ? (
        <Grid container spacing={4}>
          {/* Left side: Profile picture or placeholder */}
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {complaint.photo ? (
              <Avatar
                src={`/uploads/${complaint.photo}`}
                alt="Complaint"
                sx={{ width: 200, height: 200 }}
              />
            ) : (
              <Avatar
                sx={{ width: 200, height: 200, fontSize: 40 }}
              >
                {complaint.name[0]}
              </Avatar>
            )}
          </Grid>

          {/* Right side: Complaint details */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Complaint Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" gutterBottom>
                <strong>Reference Number:</strong> {complaint.refNumber}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Title:</strong> {complaint.complaintTitle}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Place:</strong> {complaint.complaintPlace}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Department:</strong> {complaint.department}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Description:</strong> {complaint.complaintDescription}
              </Typography>

              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Submitted By
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Name:</strong> {complaint.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {complaint.email}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Phone:</strong> {complaint.phone}
              </Typography>
            </Paper>

            {/* Video Section */}
            {complaint.video && (
              <Paper sx={{ padding: 2, mt: 2 }}>
                <Typography variant="h6">Video</Typography>
                <Box component="video" controls sx={{ maxWidth: '100%', mt: 1 }}>
                  <source src={`/uploads/${complaint.video}`} type="video/mp4" />
                </Box>
              </Paper>
            )}
          </Grid>

          {/* Full-width Stepper for complaint status */}
          <Grid item xs={12}>
            <Paper sx={{ padding: 2, marginTop: 4 }}>
              <Typography variant="h6" gutterBottom align="center">
                Complaint Progress
              </Typography>
              <Stepper activeStep={complaintStatus} alternativeLabel>
                {steps.map((label, index) => (
                  <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h6" align="center" color="error">
          No complaint details found.
        </Typography>
      )}
    </Paper>
  );
}

export default ComplaintProfile;
