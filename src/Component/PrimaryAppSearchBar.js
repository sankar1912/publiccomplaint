import React, { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';

import { Autocomplete, TextField } from '@mui/material';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '50px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  }
}));


const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: '50px',
    paddingLeft: '50px', // Ensure enough padding for the search icon
    height: '40px',
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  }
}));

// Main component
function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

 
  const handleMenuItemClick = (action) => {
    handleMenuClose();
    switch (action) {
      case 'login':
        navigate("/Login");
        break;
      case 'form':
        navigate("/Form");
        break;
      case 'faq':
        console.log('FAQ clicked');
        break;
      case 'checkcomplaint':
        navigate('/CheckComplaint');
        break;
      default:
        break;
    }
  };

  const informationLinks = [
    'Agriculture', 'Commerce', 'Defence', 'Environment & Forest',
    'Food & Public Distribution', 'Governance & Administration',
    'Housing', 'Industries', 'Information & Broadcasting', 'Law & Justice',
    'Rural', 'Social Development', 'Travel & Tourism', 'Art & Culture',
    'Communication', 'Education', 'Finance & Taxes', 'Foreign Affairs',
    'Health & Family Welfare', 'Transport'
  ];

  const handleSelection = (event, value) => {
    if (value) {
      Cookies.set('Infofield', value);
      console.log(`Cookie 'Infofield' set to: ${value}`);
      navigate("Overview  ");
    }
  };
  const navigate = useNavigate();
  return (
    <Toolbar
      sx={{
        backgroundColor: 'black',
        color: 'white',
        justifyContent: 'space-between', // Ensure proper spacing between items
        alignItems: 'center',
        width: '100vw',
        position: 'fixed',
      }}
    >
      {/* Menu Icon */}
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={() => console.log('Menu button clicked')}
      >
        <MenuIcon />
      </IconButton>

      {/* App Title */}
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ display: { xs: 'none', sm: 'block' }, position:'relative', right:'10%' }}
      >
        CivicHub
      </Typography>

      {/* Search Bar */}
      <Search sx={{width:'30%', position:'relative', right:'10%'}}>
        <Autocomplete
          freeSolo
          options={informationLinks}
          inputValue={searchValue}
          onInputChange={(event, newInputValue) => setSearchValue(newInputValue)}
          onChange={handleSelection}
          renderInput={(params) => (
            <StyledTextField
              {...params}
              placeholder="Search…"
              InputProps={{
                ...params.InputProps,
                style: { color: 'white' },
              }}
            />
          )}
        />
      </Search>

      {/* Profile Icon */}
      <div style={{position:'relative', right:'3%', paddingLeft: '20px'}}>
      <IconButton
        size="large"
        edge="end"
        color="inherit"
        aria-label="account of current user"
        aria-haspopup="true"
        onClick={() => console.log('Profile button clicked')}
      >
        <AccountCircle sx={{right:'50px'}} />
      </IconButton>
      {/* More Icon */}
      <IconButton
        size="large"
        edge="end"
        color="inherit"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenuClick}

      >
        <MoreIcon />
      </IconButton>
      </div>
      
      {/* Menu */}
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleMenuItemClick('login')}>Login</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('form')}>Form</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('faq')}>FAQ</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('checkcomplaint')}>Check your complaint</MenuItem>
      </Menu>
    </Toolbar>
  );
}

export default PrimarySearchAppBar;
