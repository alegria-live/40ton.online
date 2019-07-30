import React from 'react';
import classes from './Nav.css';

const Nav = ({navHeaderArr, onClickHandler, appLanguage, company}) => (
    <nav className={classes.Nav}>        
        <ul>
            {company ? <li className={classes.Company}>{company}</li> : null} 
            {navHeaderArr ? navHeaderArr.map(el => <li
            key={el.text}
            onClick={appLanguage !== el.text.toLowerCase() ? () => onClickHandler(el.fn): null}
            className={appLanguage === el.text.toLowerCase() ? classes.Active : null}>
            {el.text}</li>) : null}
        </ul>            
    </nav>
);
export default Nav;