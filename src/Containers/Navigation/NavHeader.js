import React, {useContext} from 'react';
import {connect} from 'react-redux';
import { withRouter} from 'react-router-dom'
import AppContext from '../../context/app-context';
import Nav from '../../Components/Nav/NavElements/Nav';
import * as actions from '../../store/actions/index'; 

const NavHeader = props => {
    
    const {
        choiceLang,
        setShowLogIn,
        setShowRegister,
        showRegister,
        setShowOwner,
        showOwner } = useContext(AppContext);

    let navHeaderArr = props.navHeader;
    
    if(props.token) {
        navHeaderArr = props.navHeaderSigned
    };
    if(props.token && showOwner) {
        navHeaderArr = props.navHeaderOwner
    }

    const onLoginHandler = (val) => {
        if(showRegister || showOwner ) return
        setShowLogIn(val)
    };
    const onSignInHanler = (val) => {
        if(showRegister) return
        setShowRegister(val);
        window.scrollTo(0, 400);
    };
    const toSytemPage = () => {
        setShowOwner(true);
    };
    const toHomePage = () => {
        setShowOwner(false);
    }
    const onLogoutHandler = () => {
        setShowOwner(false);
        props.onLogout();
    }
    
    const onClickHandler = (data) => {
       switch(data) {
           case('onLoginHandler'):
           onLoginHandler(true); break
           case('onSignInHanler'):
           onSignInHanler(true); break;
           case('onSetLangPl'):
           choiceLang('pl');break
           case('onSetLangEs'):
           choiceLang('es');break
           case('toSytemPage'):
           toSytemPage();break
           case('toHomePage'):
           toHomePage();break
           case('onLogoutHandler'):
           onLogoutHandler();break
           default: console.log("default");
       };
    };
    return <Nav
            onClickHandler={onClickHandler}
            navHeaderArr={navHeaderArr}
            appLanguage={props.appLanguage}
            company={props.company}
        /> 
};
const mapStateToProps = state => {
    return {
        navHeader: state.initLang.textHome.navHeader,
        navHeaderSigned: state.initLang.textHome.navHeaderSigned,
        navHeaderOwner: state.initLang.textHome.navHeaderOwner,
        appLanguage: state.initLang.language,
        token: state.authReducer.token,
        company: state.authReducer.company
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logoutUser())
    }
}
export default withRouter( connect(mapStateToProps, mapDispatchToProps)(NavHeader) );