import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';

function NewUser() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [state, setState] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, mobile, aadhar, state, username, password };

    let result = await fetch('http://localhost:5000/register', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    result = await result.json();
    console.warn(result);

    if (result) {
      alert('User registered successfully');
      setName("");
      setMobile("");
      setAadhar("");
      setState("");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={8} sx={{ padding: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          New User Registration
        </Typography>
        <Box
          component="form"
          onSubmit={handleOnSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            variant="outlined"
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            variant="outlined"
            label="Mobile"
            type="tel"
            fullWidth
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <TextField
            variant="outlined"
            label="Aadhar"
            type="text"
            fullWidth
            value={aadhar}
            onChange={(e) => setAadhar(e.target.value)}
            required
          />
          <TextField
            variant="outlined"
            label="State"
            fullWidth
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
          <TextField
            variant="outlined"
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default NewUser;
