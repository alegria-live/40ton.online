import React, { useEffect, useState, useContext } from 'react';
import { connect } from 'react-redux';
import autoLogout from '../../hoc/autoLogout';
import axios from 'axios';
import { preloadImage } from '../../shared/utility';
import headerImg from '../../assets/img/motorway_trucks.jpg';
import Spinner from '../../Components/UI/Spinner/Spinner';
import Header from '../../Components/Home/Header/Header';
import Main from '../../Components/Home/Main/Main';
import LogIn from '../../Containers/LogIn/LogIn';
import NewPass from '../../Containers/LogIn/NewPass';
import ContactForm from '../../Containers/ContactForm/ContactForm';
import AppContext from '../../context/app-context';
import ChartsContext from '../../context/charts-context';
import Modal from '../../Components/UI/Modal/Modal';

const Register = React.lazy(() => import('../../Components/Home/Register/Register'));
const Owner = React.lazy(() => import('../../Components/Owner/OwnerLayout/OwnerLayout'));

export const HomeLayout = (props) => {
	const {
		showLogIn,
		showNewPass,
		showRegister,
		showOwner,
		showContactForm
	} = useContext(AppContext);
	const [allActiveDrivers, setAllActiveDrivers] = useState({});
	const [allActiveTrucks, setAllActiveTrucks] = useState({});
	const [driversLoaded, setDriversLoaded] = useState(false);
	const [trucksLoaded, setTrucksLoaded] = useState(false);

	const getActiveDrivers = () => {
		setDriversLoaded(false)
		axios.get('/system/activeDrivers')
			.then(res => {
				setDriversLoaded(true);
				setAllActiveDrivers(res.data)
			})
			.catch(e => console.log(e))
	}
	const getActiveTrucks = () => {
		setTrucksLoaded(false);
		axios.get('/system/activeTrucks')
			.then(res => {
				setTrucksLoaded(true);
				setAllActiveTrucks(res.data)				
			})
			.catch(e => console.log(e));
	};
	let component = (
		<>
			<Modal show={showLogIn} ><LogIn /></Modal>
			<Modal show={showNewPass} ><NewPass /></Modal>
			<Modal show={showContactForm} ><ContactForm /></Modal>
			<Header />			
			<React.Suspense>
				{showRegister ? <Register formName={props.registerText.formName} /> : <Main />}
			</React.Suspense>
		</>
	);

	if (showOwner) {
		component = (
			!driversLoaded || !trucksLoaded ? <Spinner /> :
			<React.Suspense>
				<ChartsContext.Provider value={{
					getActiveDrivers,
					allActiveDrivers,
					getActiveTrucks,
					allActiveTrucks
				}}>
					<Owner />	
				</ChartsContext.Provider>
			</React.Suspense>
		);
	};

	const [imgLoaded, setImgLoaded] = useState(false);

	useEffect(() => {
		preloadImage(headerImg).then((data) => setImgLoaded(data))
	}, []);

	useEffect(() => {
		if (showOwner) {
			getActiveDrivers();
			getActiveTrucks();
		}
	}, [showOwner])

	return (
		<>
			{!imgLoaded || 
				(props._csrf.length !== 36 && props.textHome) || 
				props.isLoading ? <Spinner /> : component}			
		</>
	);
};

const setStateToProps = state => {
	return {
		_csrf: state.initLang._csrf,
		textHome: state.initLang.textHome,
		error: state.initLang.error,
		registerText: state.initLang.textHome.registerForm,
		isLoading: state.authReducer.loading
	};
};
export default connect(setStateToProps)(autoLogout(HomeLayout));