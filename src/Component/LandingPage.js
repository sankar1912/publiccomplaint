import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Paper,
  Box,
  Fade,
} from '@mui/material';
import topicsData from './topicdata.json'; // Adjust the path according to your file structure
import { useNavigate } from 'react-router-dom'; // Correct import

const LandingPage = () => {
  const navigate = useNavigate(); // Correct usage of useNavigate hook
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleTopicChange = (topicData) => {
    setShowForm(false); // Hide the form before changing topic
    setSelectedTopic(topicData.topic);
    setSelectedDescription(topicData.description); // Set the description
    setTimeout(() => {
      setShowForm(true); // Show the form after changing topic
    }, 300); // Duration to match the fade-out effect
  };

  return (
    <div>
      {/* Selected Topic Description */}
      <Box sx={{ padding: 4 }}>
        {selectedTopic && (
            <div style={{ textAlign:'justify'}}>
                <Typography variant="h3" sx={{ marginBottom: 1, fontSize: '28px' }}>
                {selectedTopic}
            </Typography>
          <Typography variant="h5" sx={{ marginBottom: 1, fontSize: '20px' }}>
             {selectedDescription}
          </Typography>
            </div>
        )}
        <Typography variant="h4">Topic</Typography>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {topicsData.map((topicData) => (
            <Grid item xs={12} sm={6} md={4} key={topicData.topic}>
              <Paper elevation={3} sx={{ padding: 2, textAlign: 'center',width: '80%', height: 'auto' }}>
                <img src={topicData.image} alt={topicData.topic} style={{ width: '80%', height: '60%' }} />
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                  {topicData.topic}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleTopicChange(topicData)}
                  sx={{ marginTop: 2 }}
                >
                  View Details
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Complaint Form Section */}
      <Box sx={{ padding: 4 }}>
        {showForm && (
          <Fade in timeout={300}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Complaint Form for {selectedTopic}
              </Typography>
              {/* Add your form fields here */}
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                onClick={() => {
                  navigate("/Form"); // Correct usage of navigate
                }}
              >
                Submit Complaint
              </Button>
            </Paper>
          </Fade>
        )}
      </Box>
    </div>
  );
};

export default LandingPage;
