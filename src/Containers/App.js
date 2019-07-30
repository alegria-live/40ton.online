import React, {useState, useEffect, Suspense} from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import AppContext from '../context/app-context';
import * as actions from '../store/actions/index';
import ChoiceLang from '../Components/Home/ChoiceLang/ChoiceLang';
import Spinner from '../Components/UI/Spinner/Spinner';
import './App.css';

const Activation = React.lazy(() => import('../Components/Activation/Activation'));
const HomeLayout = React.lazy(() => import('../hoc/HomeLayout/HomeLayout'));

function App({autoInitLang, ...props}) {
  
  useEffect(() => {
    autoInitLang();
  }, [autoInitLang]);
  
  const [showLogIn, changeShowLogin] = useState(false);
  const [showNewPass, changeShowNewPass] = useState(false);
  const [showRegister, changeShowRegister] = useState(false);
  const [showOwner, changeShowOwner] = useState(false);

  const choiceLang = chosenLang => props.setLang(chosenLang);
  const setShowLogIn = val => changeShowLogin(val);
  const setShowRegister = val => changeShowRegister(val);
  const setShowNewPass = () => changeShowNewPass(!showNewPass);
  const setShowOwner = val => changeShowOwner(val);

  let routes = (
    <Switch>
      <Route path="/activation" component={Activation} />      
      <Route path="/" render={()=>(<div className="App"> {props.appLanguage === null ? <ChoiceLang /> : <HomeLayout />} </div>)} />
    </Switch>
  );
  
  return (
    <AppContext.Provider value = {{
      appLanguage: props.appLanguage,
      choiceLang,
      showLogIn,
      setShowLogIn,
      showNewPass,
      setShowNewPass,
      showRegister,
      setShowRegister,
      showOwner,
      setShowOwner
      }}>
        <Suspense fallback={<Spinner />}>{routes}</Suspense>
    </AppContext.Provider>    
  );
};
const mapStateToProps = state => {
  return {
    appLanguage: state.initLang.language
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setLang: (language) => dispatch(actions.initLanguage(language)),
    autoInitLang: () => dispatch(actions.autoInitLang())
  };
};
export default withRouter( connect(mapStateToProps, mapDispatchToProps)(App) );
