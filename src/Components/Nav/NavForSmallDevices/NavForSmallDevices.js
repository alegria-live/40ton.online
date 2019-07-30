import React, {useState, useContext, useEffect} from 'react';
import AppContext from '../../../context/app-context';
import Nav from '../../../Containers/Navigation/NavHeader';
import classes from './NavForSmallDevices.css';
import Modal from '../../UI/Modal/Modal';
import DrowerToggle from '../DrawerToggle/DrawerToggle';

const NavForSmallDevices = () => {
    const {showRegister, showLogIn} = useContext(AppContext);
    const [showNav, setShowNav] = useState(false);
    const showNavHandler = () => {
        setShowNav(!showNav);
    };
    useEffect(()=> {
        if(showRegister || showLogIn) {
            showNavHandler();
        }
        // eslint-disable-next-line
    }, [showRegister, showLogIn])  
    return(
        <div className={classes.NavForSmallDevices}>
            <DrowerToggle clicked={showNavHandler}/>
            <Modal show={showNav && !showRegister && !showLogIn} modalClosed={showNavHandler}>
                <Nav />
            </Modal>
        </div> 
    );
};
export default NavForSmallDevices;