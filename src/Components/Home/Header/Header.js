import React from 'react';
import classes from './Header.css';
import Slogan from './Slogan/Slogan';
import NavBig from '../../Nav/NavForBigDevices/NavForBigDevices';
import NavSmall from '../../Nav/NavForSmallDevices/NavForSmallDevices';

const Header = () => (
    <header className={classes.Header}>            
        <Slogan />
        <NavBig />
        <NavSmall />
    </header>
    
);
export default Header;