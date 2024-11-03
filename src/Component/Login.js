import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const loginData = { username, password };

    let result = await fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    result = await result.json();

    if (result.success) {
      alert('Login successful');
      // You can redirect the user to a dashboard or homepage here
    } else {
      alert(result.message || 'Invalid credentials');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={8} sx={{ padding: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Login
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
            Login
          </Button>
         <Link to="/NewUser" style={{textDecoration:'none'}}>  New User?Register here</Link>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
