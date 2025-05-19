import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

const Navigation : React.FC<{open : boolean, toggleOpen : () => void}> = ({open, toggleOpen}) => {

    return (
        <Menu 
            anchorEl={document.querySelector('.header__menuicon')}
            onClose={toggleOpen}
            open={open}>
            <MenuItem>
                <Link to='/'>Main</Link>
            </MenuItem>
            <MenuItem>
                <Link to='/play'>Play</Link>
            </MenuItem>
        </Menu>
    )
}

export default Navigation