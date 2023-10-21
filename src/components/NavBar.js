
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

const NavBar = () => {
   const [pageMenu, setPage] = React.useState(null);
   const [anchorEl, setAnchorEl] = React.useState(null);

   const handleMenu = (stateFunc, currentState) => {
    stateFunc(!currentState);
   };

   const handleClose = (stateFunc) => {
    stateFunc(null);
   };
   return (
     <Box sx={{ flexGrow: 1 }}>
       <AppBar position="static">
         <Toolbar>
           <IconButton
             size="large"
             edge="start"
             color="inherit"
             aria-label="menu"
             sx={{ mr: 2 }}
             onClick={() => handleMenu(setPage, pageMenu)}
           >
             <MenuIcon/>
             <Menu
                 id="menu-appbar"
                 anchorEl={pageMenu}
                 anchorOrigin={{
                   vertical: 'top',
                   horizontal: 'left',
                 }}
                 keepMounted
                 transformOrigin={{
                   vertical: 'top',
                   horizontal: 'left',
                 }}
                 open={Boolean(pageMenu)}
                 onClose={() => handleClose(setPage)}
               >
                 <MenuItem onClick={() => handleClose(setPage)}> <Link to="/">Home</Link> </MenuItem>
                 {/* <MenuItem onClick={() => handleClose(setPage)}> <Link to="/read">Read</Link> </MenuItem> */}
                 <MenuItem onClick={() => handleClose(setPage)}> <Link to="/library">Library</Link> </MenuItem>
               </Menu>
           </IconButton>
           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
             PagePal
           </Typography>
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
                 <MenuItem onClick={() => handleClose(setAnchorEl)}><Link to="/Login">Login</Link></MenuItem>
               </Menu>
             </div>
         </Toolbar>
       </AppBar>
     </Box>
   );

};

export default NavBar;