import React from 'react';
import { connect } from 'react-redux';
import classes from './Slogan.css';

const Slogan = ({headerSlogan}) => (
    <section className={classes.Slogan}>
        <h1>{headerSlogan}</h1>
    </section>
);
const mapStateToProps = state => {
    return {
        headerSlogan: state.initLang.textHome.headerSlogan
    };
};
export default connect(mapStateToProps)(Slogan);