import { Box, Button, Grid, Paper, TextField, Typography, CircularProgress, Alert } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CheckComplaint() {
  const [refNumber, setRefNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/check-complaint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refNumber,
          mobileNumber,
        }),
      });

      const data = await response.json();

      if (response.status === 200 && data.complaint) {
        // Redirect to complaint profile page with complaint data
        navigate('/ComplaintProfile', { state: { complaint: data.complaint } });
      } else {
        setError(data.message || 'Complaint not found');
      }
    } catch (error) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={7} sx={{ padding: 4, width: '80vw', maxWidth: '400px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom align="center">
        Check Your Complaint
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Reference Number"
              name="refNumber"
              value={refNumber}
              onChange={(e) => setRefNumber(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mobile Number"
              name="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              sx={{ textTransform: 'none', mt: 2, width: '100%' }} 
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Paper>
  );
}

export default CheckComplaint;
