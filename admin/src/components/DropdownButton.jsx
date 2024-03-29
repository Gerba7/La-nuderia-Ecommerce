import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/httpRequests';
import { useNavigate } from 'react-router-dom';


const TopBarIcon = styled.div`
    font-size: 24px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 15px;
`


export default function DropdownButton() {


  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    
    try {
        dispatch(logout())
        handleClose()
        navigate('/login')
    } catch(err) {
        console.log(err)
    }
    
}



  return (
    <div>
      <Button
        style={{margin: '0px', padding: '0px'}}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <TopBarIcon>
            <AccountCircleIcon color="white" style={{fontSize: 'inherit'}} />
        </TopBarIcon>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}