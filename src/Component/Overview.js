import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {
  Paper,
  Typography,
  Grid,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Overview() {
  const [incidentData, setIncidentData] = useState([]); 
  const [openSnackbar, setOpenSnackbar] = useState(false); 
  const [selectedIncidentTitle, setSelectedIncidentTitle] = useState(''); 
  const Infofield = Cookies.get('Infofield');
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/incidents?department=${Infofield}`);
        const data = await response.json();
        setIncidentData(data); // Set the fetched data in state
      } catch (error) {
        console.error('Error fetching incident data:', error);
      }
    };

    fetchData();
  }, [Infofield]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleClick = (incident) => {
    // Store the selected incident data in a cookie
    Cookies.set('selectedIncident', JSON.stringify(incident));
    setSelectedIncidentTitle(incident.complaintTitle); // Store title for snackbar
    setOpenSnackbar(true); // Open snackbar for feedback
    navigate('/DetailedView'); // Navigate to the detailed view
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Close the snackbar
  };

  return (
    <div>
      <Paper elevation={7} sx={{ padding: '10px', marginBottom: '20px' }}>
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          {capitalizeFirstLetter(Infofield)}
        </Typography>
      </Paper>
      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
        {incidentData.map((incident) => (
          <Grid item xs={12} sm={6} md={4} key={incident.refNumber}>
            <Paper
              elevation={3}
              sx={{
                padding: '15px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: '15px',
                cursor: 'pointer',
                transition: 'transform 0.2s', // Adding a transition effect
                '&:hover': {
                  transform: 'scale(1.05)', // Scale effect on hover
                },
              }}
              onClick={() => handleClick(incident)}
            >
              <Box
                component="img"
                src={incident.photo}
                alt={incident.complaintTitle}
                sx={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  marginBottom: '15px',
                  boxShadow: 2, // Adding shadow to the image
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 1 }}>
                {incident.complaintTitle}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Place: {incident.complaintPlace}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Status: {incident.status ? incident.status : 'Pending'}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          You selected: {selectedIncidentTitle}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Overview;
