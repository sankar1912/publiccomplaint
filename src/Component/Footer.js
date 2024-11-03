import React from 'react';
import { Container, Grid, Typography, Box, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
const Footer = () => {
  const informationLinks = [
    ['Agriculture', 'Commerce', 'Defence', 'Environment & Forest', 'Food & Public Distribution', 'Governance & Administration', 'Housing', 'Industries', 'Information & Broadcasting', 'Law & Justice'],
    ['Rural', 'Social Development', 'Travel & Tourism', 'Art & Culture', 'Communication', 'Education', 'Finance & Taxes', 'Foreign Affairs', 'Health & Family Welfare', 'Transport'],
  ];

  const governmentLinks = [
    ['Constitution of India', 'Government Directory', 'Indian Parliament', 'Publications', "Who's Who", 'President of India', 'Vice-President of India'],
    ['Prime Minister of India', 'Cabinet Ministers', 'Chiefs of Armed Forces', 'Members of Parliament'],
  ];
const date = new Date();
  return (
    <Box
      sx={{
        backgroundColor: '#1f1f1f',
        color: 'white',
        py: 4,
        mt: 4,
        bottom:'0',
        position:'static'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left Section */}
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h6" gutterBottom>
              Information Related To
            </Typography>
            <Grid container spacing={1}>
              {informationLinks.map((column, index) => (
                <Grid item xs={6} key={index}>
                  {column.map((linkText, linkIndex) => (
                    <Box key={linkIndex} sx={{ mb: 1 }}>
                      <MuiLink 
                        component={Link} 
                        to="/Overview" 
                        color="inherit" 
                        underline="hover"
                        onClick={(e)=>{
                          Cookies.set("Infofield",`${linkText.replace(/\s+/g, '-').toLowerCase()}`);
                        }}
                      >
                        {linkText}
                      </MuiLink>
                    </Box>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Right Section */}
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h6" gutterBottom>
              About the Government
            </Typography>
            <Grid container spacing={1}>
              {governmentLinks.map((column, index) => (
                <Grid item xs={6} key={index}>
                  {column.map((linkText, linkIndex) => (
                    <Box key={linkIndex} sx={{ mb: 1 }}>
                      <MuiLink 
                        component={Link} 
                        to={`/${linkText.replace(/\s+/g, '-').toLowerCase()}`} 
                        color="inherit" 
                        underline="hover"
                      >
                        {linkText}
                      </MuiLink>
                    </Box>
                  ))}
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 2 }}>
              <img
                src="open-data-portal-icon.png"
                alt="Open Data Portal"
                style={{ width: 50, marginRight: 10 }}
              />
              <img
                src="pib-icon.png"
                alt="Press Information Bureau"
                style={{ width: 50 }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="body2" color="inherit">
            This Portal is a Software Engineering Mini Project under the guidence of Dr. A. S. Karthikannan, and is owned, designed, and developed by Sankara Narayanan K, Aswin Murugan A.S,Esakkiappan N,  Department of Information Technology Students MSEC.
          </Typography>
          <Typography variant="body2" color="inherit" sx={{ mt: 1 }}>
            Last reviewed and updated on {date.getFullYear}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
