import React from 'react';
import classes from './DrawerToggle.css';

const drawerToggle = props => {    
    return (
        <div className={classes.DrowerContainer} style = {props.disabled ? {display: "none"} : null}>
            <div
                onClick= {!props.disabled ? props.clicked : null}
                className = {classes.DrawerToggle}
                >
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>    
    );
} 
export default drawerToggle;