import React from 'react';
import './navbar.css';
import { FaBars } from "react-icons/fa6";
import { Drawer, IconButton, Menu, MenuItem, List, ListItem, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../reduxSlice/authSlice'; // Ensure the path is correct
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      // Redirect to home or login page if necessary
      navigate('/'); // Navigate to home or login page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
    handleMenuClose();
  };

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className='container-fluid'>
      <div className='navbar row d-flex'>
        <div className='col-11 col-lg-7'>
          <h1 className='text-light'>
            Infin-8-Toons
          </h1>
        </div>

        <div className='col-1 d-block d-lg-none'>
          <IconButton onClick={toggleDrawer}>
            <FaBars color='white' />
          </IconButton>
        </div>

        <Drawer anchor='left' open={open} onClose={toggleDrawer}>
          <List>
            <ListItem button>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="About" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Story" />
            </ListItem>
          </List>
        </Drawer>

        <div className='d-none d-lg-block col-3'>
          <ul className='list-group d-flex flex-row p-0 m-0 justify-content-between'>
            <li className='text-light'>Home</li>
            <li className='text-light'>About</li>
            <li className='text-light'>Story</li>
          </ul>
        </div>

        <div className='col-1 w-100 d-none d-lg-block cursor-pointer'>
          {user ? (
            <>
              <div className='text-light' onClick={handleMenuClick}>
                Hi <span>{user.user?.username}</span>
              </div>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <button className='btn btn-primary w-100' onClick={handleLoginClick}>Login</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
