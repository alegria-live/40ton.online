import React, { useState, useEffect, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AppContext from '../context/app-context';
import * as actions from '../store/actions/index';
import ChoiceLang from '../Components/Home/ChoiceLang/ChoiceLang';
import Spinner from '../Components/UI/Spinner/Spinner';
import { Helmet } from "react-helmet";
import './App.css';
import favicon from '../assets/img/favicon.png';
const Activation = React.lazy(() => import('../Components/Activation/Activation'));
const HomeLayout = React.lazy(() => import('../hoc/HomeLayout/HomeLayout'));

export const App = ({autoInitLang, ...props}) => {
	
	useEffect(() => { autoInitLang() }, [autoInitLang]);

	const [showLogIn, changeShowLogin] = useState(false);
	const [showNewPass, changeShowNewPass] = useState(false);
	const [showRegister, changeShowRegister] = useState(false);
	const [showContactForm, changeShowContactForm] = useState(false);
	const [showOwner, changeShowOwner] = useState(false);
	const [smallResolutionDemoModal, changeSmallResolutionDemoModal] = useState(false);

	const choiceLang = chosenLang => props.setLang(chosenLang);
	const setShowLogIn = val => changeShowLogin(val);
	const setShowRegister = val => changeShowRegister(val);
	const setShowNewPass = () => changeShowNewPass(!showNewPass);
	const setShowContactForm = val => changeShowContactForm(val);
	const setShowOwner = val => changeShowOwner(val);
	const setSmallResolutionDemoModal = val => changeSmallResolutionDemoModal(val);

	let routes = (
		<Switch>
			<Route path="/activation" component={Activation} />
			<Route path="/" render={() => 
				(<div
					className="App"> {!props.appLanguage ? <ChoiceLang /> : <HomeLayout />}
				</div>)} />
		</Switch>
	);

	return (
		<>
			<Helmet>				
				<title>{props.headText ? props.headText.title : null}</title>
				<meta name="description" content={props.headText ? props.headText.description : null} />
				<link rel="icon" type="image/png" href={favicon} sizes="16x16" />
			</Helmet>

			<AppContext.Provider value={{
				appLanguage: props.appLanguage,
				choiceLang,
				showLogIn,
				setShowLogIn,
				showNewPass,
				setShowNewPass,
				showRegister,
				setShowRegister,
				showContactForm,
				setShowContactForm,
				showOwner,
				setShowOwner,
				smallResolutionDemoModal,
				setSmallResolutionDemoModal
			}}>
				<Suspense fallback={<Spinner />}>{routes}</Suspense>
			</AppContext.Provider>
		</>
	);
};
const mapStateToProps = state => {
	return {
		appLanguage: state.initLang.language,
		headText: state.initLang.textHome.headText
	};
};
const mapDispatchToProps = dispatch => {
	return {
		setLang: (language) => dispatch(actions.initLanguage(language)),
		autoInitLang: () => dispatch(actions.autoInitLang())
	};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
