
import { Link } from 'react-router-dom';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Tabs from '@mui/material/Tabs';
import { Button } from '@mui/material';
import { Passage } from '@passageidentity/passage-js';
import './NavBar.css'
// import { useAuthStatus } from './hooks/useAuthStatus';


const NavBar = ({ signedIn, handleLogout }) => {
  const [pageMenu, setPage] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const passage = new Passage(process.env.REACT_APP_PASSAGE_APP_ID);
  const session = passage.getCurrentSession();
  const authToken = async () => { return await session.getAuthToken(); };

  const handleMenu = (stateFunc, currentState) => {
    stateFunc(!currentState);
  };

  const handleClose = (stateFunc) => {
    stateFunc(null);
  };

  return (
    <Box className='navbox' sx={{ flexGrow: 1 }}>
      <AppBar className='navbox' position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PagePal
          </Typography>


          <Button className='tab'> <Link to="/">Home</Link> </Button>
          {/* <MenuItem onClick={() => handleClose(setPage)}> <Link to="/read">Read</Link> </MenuItem> */}
          <Button className='tab'> <Link to="/library">Library</Link> </Button>




          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => handleMenu(setAnchorEl)}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
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
              onClose={() => handleClose(setAnchorEl, anchorEl)}
            >
              <MenuItem onClick={() => handleClose(setAnchorEl)}><Link to="/profile">Profile</Link></MenuItem>
              <MenuItem onClick={() => handleClose(setAnchorEl)}><Link to="/write">Add a book</Link></MenuItem>
              {signedIn && <MenuItem onClick={() => handleLogout()}><Link to="/">Sign Out</Link></MenuItem>}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );

};

export default NavBar;

