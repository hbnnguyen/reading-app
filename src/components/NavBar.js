
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

   const handleMenu = (event) => {
     setAnchorEl(event.currentTarget);
   };
 
   const handleClose = () => {
     setAnchorEl(null);
   };
 
   const handleMenu2 = (event) => {
      setPage(event.currentTarget);
    };
  
    const handleClose2 = () => {
      setPage(null);
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
           >
             <MenuIcon 
             onClick={handleMenu2}
             />
             <Menu
                 id="menu-appbar"
                 pageMenu={pageMenu}
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
                 onClose={handleClose2}
               >
                 <MenuItem onClick={handleClose2}> <Link to="/">Home</Link> </MenuItem>
                 <MenuItem onClick={handleClose2}> <Link to="/Login">Login</Link> </MenuItem>
                 <MenuItem onClick={handleClose2}> <Link to="/read">Read</Link> </MenuItem>
                 <MenuItem onClick={handleClose2}> <Link to="/profile">Profile</Link> </MenuItem>
                 <MenuItem onClick={handleClose2}> <Link to="/library">Library</Link> </MenuItem>
               </Menu>
           </IconButton>
           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
             Reading App
           </Typography>
             <div>
               <IconButton
                 size="large"
                 aria-label="account of current user"
                 aria-controls="menu-appbar"
                 aria-haspopup="true"
                 onClick={handleMenu}
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
                 onClose={handleClose}
               >
                 <MenuItem onClick={handleClose}>Profile</MenuItem>
                 <MenuItem onClick={handleClose}>My account</MenuItem>
               </Menu>
             </div>
         </Toolbar>
       </AppBar>
     </Box>
   );

//  return (
//  <nav>
//        <ul>
//           <li>
//              <Link to="/">Home</Link>
//           </li>
//           <li>
//              <Link to="/Login">Login</Link>
//           </li>
//           <li>
//              <Link to="/read">Read</Link>
//           </li>
//           <li>
//              <Link to="/profile">Profile</Link>
//           </li>
//           <li>
//              <Link to="/library">Library</Link>
//           </li>
//        </ul>
//  </nav>
//  );
};

export default NavBar;