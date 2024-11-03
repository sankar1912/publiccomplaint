import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Grid,
  InputLabel,
  Select,
  FormControl,
  Paper,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid'; // For generating unique reference numbers
import stateData from './StateData.json'; // Import the JSON for state, district, taluk

const informationLinks = [
  ['Agriculture', 'Commerce', 'Defence', 'Environment & Forest', 'Food & Public Distribution', 'Governance & Administration', 'Housing', 'Industries', 'Information & Broadcasting', 'Law & Justice'],
  ['Rural', 'Social Development', 'Travel & Tourism', 'Art & Culture', 'Communication', 'Education', 'Finance & Taxes', 'Foreign Affairs', 'Health & Family Welfare', 'Transport'],
];

const ComplaintForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    state: '',
    district: '',
    taluk: '',
    adminName: '',
    adminContact: '',
    complaintTitle: '',
    complaintPlace: '',
    complaintDescription: '',
    photo: null,
    video: null,
  });
  const [refNumber, setRefNumber] = useState('');

  const [districts, setDistricts] = useState([]);
  const [taluks, setTaluks] = useState([]);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input changes
  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  // Handle state selection
  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    const stateInfo = stateData.India.states.find((state) => state.name === selectedState);
    setDistricts(stateInfo ? stateInfo.districts : []);
    setFormData({
      ...formData,
      state: selectedState,
      district: '',
      taluk: '',
      adminName: '',
      adminContact: ''
    });
    setTaluks([]);
  };

  // Handle district selection
  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    const districtInfo = districts.find((district) => district.name === selectedDistrict);
    setTaluks(districtInfo ? districtInfo.taluks : []);
    setFormData({
      ...formData,
      district: selectedDistrict,
      taluk: '',
      adminName: '',
      adminContact: ''
    });
  };

  // Handle taluk selection
  const handleTalukChange = (event) => {
    const selectedTaluk = event.target.value;
    const talukInfo = taluks.find((taluk) => taluk.name === selectedTaluk);
    setFormData({
      ...formData,
      taluk: selectedTaluk,
      adminName: talukInfo ? talukInfo.admin.name : '',
      adminContact: talukInfo ? talukInfo.admin.contact : ''
    });
  };

  // Handle next/previous step navigation
  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const generatedRefNumber = uuidv4().replace(/-/g, '').slice(0, 16);
    setRefNumber(generatedRefNumber);
    
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append('refNumber', generatedRefNumber);
    
    try {
      const response = await fetch('http://localhost:5000/complaints', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        alert(`Complaint submitted! Reference Number: ${generatedRefNumber}`);
        setFormData({
          name: '',
          email: '',
          phone: '',
          department: '',
          state: '',
          district: '',
          taluk: '',
          adminName: '',
          adminContact: '',
          complaintTitle: '',
          complaintPlace: '',
          complaintDescription: '',
          photo: null,
          video: null,
        });
        setStep(0);
      } else {
        alert('Failed to submit complaint. Please try again.');
      }
    } catch (error) {
      alert('An error occurred while submitting the complaint. Please try again.');
    }
  };

  // Render review section
  const renderReview = () => (
    <List>
      <ListItem>
        <ListItemText primary="Name" secondary={formData.name} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Email" secondary={formData.email} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Phone" secondary={formData.phone} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Department" secondary={formData.department} />
      </ListItem>
      <ListItem>
        <ListItemText primary="State" secondary={formData.state} />
      </ListItem>
      <ListItem>
        <ListItemText primary="District" secondary={formData.district} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Taluk" secondary={formData.taluk} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Admin Name" secondary={formData.adminName} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Admin Contact" secondary={formData.adminContact} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Complaint Title" secondary={formData.complaintTitle} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Complaint Place" secondary={formData.complaintPlace} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Complaint Description" secondary={formData.complaintDescription} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Photo" secondary={formData.photo ? formData.photo.name : 'No photo uploaded'} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Video" secondary={formData.video ? formData.video.name : 'No video uploaded'} />
      </ListItem>
    </List>
  );

  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper elevation={7} sx={{ padding: 4, width: '80vw', maxWidth: '700px' }}>
        <Typography variant="h4" gutterBottom align="center">
          File a Complaint
        </Typography>
        <LinearProgress variant="determinate" value={(step + 1) * 25} sx={{ mb: 2 }} />
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          {step === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Department</InputLabel>
                  <Select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  >
                    {informationLinks.flat().map((dept, idx) => (
                      <MenuItem key={idx} value={dept}>
                        {dept}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* State Dropdown */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>State</InputLabel>
                  <Select
                    name="state"
                    value={formData.state}
                    onChange={handleStateChange}
                  >
                    {stateData.India.states.map((state, idx) => (
                      <MenuItem key={idx} value={state.name}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* District Dropdown */}
              <Grid item xs={12}>
                <FormControl fullWidth disabled={!districts.length}>
                  <InputLabel>District</InputLabel>
                  <Select
                    name="district"
                    value={formData.district}
                    onChange={handleDistrictChange}
                  >
                    {districts.map((district, idx) => (
                      <MenuItem key={idx} value={district.name}>
                        {district.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Taluk Dropdown */}
              <Grid item xs={12}>
                <FormControl fullWidth disabled={!taluks.length}>
                  <InputLabel>Taluk</InputLabel>
                  <Select
                    name="taluk"
                    value={formData.taluk}
                    onChange={handleTalukChange}
                  >
                    {taluks.map((taluk, idx) => (
                      <MenuItem key={idx} value={taluk.name}>
                        {taluk.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Admin Details */}
              {formData.adminName && (
                <Grid item xs={12}>
                  <Typography>
                    Admin Name: {formData.adminName}, Contact: {formData.adminContact}
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}

          {step === 1 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Complaint Title"
                  name="complaintTitle"
                  value={formData.complaintTitle}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Complaint Place"
                  name="complaintPlace"
                  value={formData.complaintPlace}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Complaint Description"
                  name="complaintDescription"
                  value={formData.complaintDescription}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          )}

          {step === 2 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel>Upload Photo</InputLabel>
                <TextField
                  fullWidth
                  name="photo"
                  type="file"
                  inputProps={{ accept: 'image/*' }}
                  onChange={handleFileChange}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Upload Video</InputLabel>
                <TextField
                  fullWidth
                  name="video"
                  type="file"
                  inputProps={{ accept: 'video/*' }}
                  onChange={handleFileChange}
                />
              </Grid>
            </Grid>
          )}

          {step === 3 && (
            <>
              <Typography variant="h6" gutterBottom>
                Review Your Complaint Details
              </Typography>
              {renderReview()}
            </>
          )}

          <Box mt={3} display="flex" justifyContent="space-between">
            {step > 0 && (
              <Button variant="contained" color="secondary" onClick={handleBack}>
                Back
              </Button>
            )}
            {step < 3 && (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            )}
            {step === 3 && (
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ComplaintForm;
