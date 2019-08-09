import React, {useState, useEffect, useContext} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import MenuContext from '../../../context/menu-context';
import NavForBigDevices from '../../Nav/NavForBigDevices/NavForBigDevices';
import Menu from '../Menu/Menu';
import Inside from '../Inside/Inside';
import AddDriver from '../../../Containers/Owner/Drivers/AddDriver';
import AddTruck from '../../../Containers/Owner/Trucks/AddTruck';
import EditTruck from '../../../Containers/Owner/Trucks/EditTruck';
import Theft from '../../../Containers/Owner/Trucks/Theft';
import AddWorker from '../../../Containers/Owner/Workers/AddWorker';
import EditWorker from '../../../Containers/Owner/Workers/EditWorker';
import EditCompany from '../../../Containers/Owner/Company/EditCompany';
import Payments from '../../../Containers/Owner/Company/Payments';
import PhoneInstruction from '../../../Components/Owner/Instructions/PhoneInstruction';
import AppContext from '../../../context/app-context';
import {Modal} from 'antd';
import classes from './OwnerLayout.css';
const EditDriver = React.lazy(() => import('../../../Containers/Owner/Drivers/EditDriver'));


const OwnerLayout = props => {
    
    const { setShowOwner } = useContext(AppContext);

    useEffect(() => {
       if(!props.token) {
        setShowOwner(false);
        props.onLogout();
       } // eslint-disable-next-line
    }, [props.token]);

    const [showAddDriver, setShowAddDriver] = useState(false);
    const [showEditDriver, setShowEditDriver] = useState(false);
    const setAddDriver = val => setShowAddDriver(val);
    const setEditDriver = val => setShowEditDriver(val);

    const [showAddTruck, setShowAddTruck] = useState(false);
    const [showEditTruck, setShowEditTruck] = useState(false);
    const [showTheft, setShowTheft] = useState(false);
    const setAddTruck = val => setShowAddTruck(val);
    const setEditTruck = val => setShowEditTruck(val);
    const setTheft = val => setShowTheft(val);

    const [showAddWorker, setShowAddWorker] = useState(false);
    const [showEditWorker, setShowEditWorker] = useState(false);
    const setAddWorker = val => setShowAddWorker(val);
    const setEditWorker = val => setShowEditWorker(val);

    const [showEditCompany, setShowEditCompany] = useState(false);
    const setEditCompany = val => setShowEditCompany(val);

    const [showPayments, setShowPayments] = useState(false);
    const setPayments = val => setShowPayments(val);

    const [showPhoneInstruction, setShowPhoneInstruction] = useState(false);
    const setPhoneInstruction = val => setShowPhoneInstruction(val);

    const [showDemoModal, setShowDemoModal] = useState(false);

    return (
        <MenuContext.Provider value ={{
            showAddDriver,
            setShowAddDriver: setAddDriver,
            showEditDriver,
            setShowEditDriver: setEditDriver,
            showAddTruck,
            setShowAddTruck: setAddTruck,
            showEditTruck,
            setShowEditTruck: setEditTruck,
            showTheft,
            setShowTheft: setTheft,
            showAddWorker,
            setShowAddWorker:setAddWorker,
            showEditWorker,
            setShowEditWorker: setEditWorker,
            showEditCompany,
            setShowEditCompany: setEditCompany,
            showPayments,
            setShowPayments:setPayments,
            showPhoneInstruction,
            setShowPhoneInstruction: setPhoneInstruction
            }}>
            <div>
                <NavForBigDevices />
                <div className={classes.Container}>
                    <Menu />
                    <Inside />
                </div>                       
            </div>
            <Modal
                visible={showDemoModal}
                closable={false}
                zIndex={2000}
                cancelButtonProps={{disabled: true}}
                onOk={() => setShowDemoModal(false)}
                >
                {props.demoText}
            </Modal>
            <AddDriver demoModal={setShowDemoModal} />
            <EditDriver demoModal={setShowDemoModal} />
            <AddTruck demoModal={setShowDemoModal} />
            <EditTruck demoModal={setShowDemoModal} />
            <Theft demoModal={setShowDemoModal} />
            <AddWorker demoModal={setShowDemoModal} />
            <EditWorker demoModal={setShowDemoModal} />
            <EditCompany demoModal={setShowDemoModal}/>
            <Payments />
            <PhoneInstruction />           
        </MenuContext.Provider>
    );
};
const mapStateToProps = state => {
    return {
        token: state.authReducer.token,
        demoText: state.initLang.textOwner.userMenu.demo
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logoutUser())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OwnerLayout);
