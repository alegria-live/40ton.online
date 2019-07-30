import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import MenuContext from '../../../context/menu-context';
import { Driver } from './driverModel';
import { inputChangedHandler, validFormHandler, cancelForm } from '../../../shared/utility';
import Input from '../../../Components/UI/Input/Input';
import { Drawer, Select, Button } from 'antd';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Axios from 'axios';
import _ from 'lodash';
const { Option } = Select;

const EditDriver = props => {

    const [controls, setControls] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text'
            },
            value: '',
            validation: {
                required: true,
                minLength: 2,
                maxLength: 20
            },
            valid: false,
            touched: false
        },
        lastName: {
            elementType: 'input',
            elementConfig: {
                type: 'text'
            },
            value: '',
            validation: {
                required: true,
                minLength: 2,
                maxLength: 20
            },
            valid: false,
            touched: false
        },
        _id: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                disabled: true
            },
            value: '',
            validation: {
                required: true,
                minLength: 6,
                maxLength: 20
            },
            valid: false,
            touched: false
        }
    });
    const { showEditDriver, setShowEditDriver } = useContext(MenuContext);
    const [allDrivers, setAllDrivers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccesMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [formIsValid, setFormIsValid] = useState(false);
    let options = <Option></Option>;
    const formElementsArray = [];
    const formElementsKeyArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        });
        formElementsKeyArray.push(key);
    };

    const getDrivers = () => {
        setIsLoading(true);
        Axios.get('/system/allDrivers')
            .then(res => { setAllDrivers(res.data); setIsLoading(false) })
            .catch(e => { setIsLoading(false); setErrorMsg(e) })
    };
    useEffect(() => {
        getDrivers();
    }, []);

    useEffect(() => {
        if(showEditDriver) getDrivers();
    }, [showEditDriver]);

    useEffect(() => {
        validFormHandler(controls, setFormIsValid);
    }, [controls]);

    const setDriver = val => {
        const actualDriver = allDrivers.find(elem => elem._id === val);
        const copyControls = _.cloneDeep(controls);
        formElementsKeyArray.forEach(elem => {
            copyControls[elem].value = actualDriver[elem];
            copyControls[elem].valid = true;
            copyControls[elem].touched = true;
        });
        setControls(copyControls);
    };

    const submitHandler = event => {
        if(event) event.preventDefault();
        if(props.demo) { props.demoModal(true); return; }
        const driver = new Driver(
            {
                id: controls._id.value.toLowerCase().trim(),
                newData: {
                    'Driver.name': controls.name.value.trim(),
                    'Driver.lastName': controls.lastName.value.trim()
                }
            }
        );
        driver.updateDriver(setSuccesMsg, setErrorMsg, setIsLoading, getDrivers);
    };
    const deleteHandler = event => {
        if(event) event.preventDefault();
        if(props.demo) { props.demoModal(true); return; }
        const driver = new Driver({
            id: controls._id.value.toLowerCase().trim()
        });
        driver.deleteDriver(setSuccesMsg, setErrorMsg, setIsLoading, getDrivers);
    };
    const cancelHandler = (event) => {
        if (event) event.preventDefault();
        cancelForm(controls, formElementsKeyArray, setControls);
        setShowEditDriver(false);
        setSuccesMsg(null);
        setErrorMsg(null);
        setIsLoading(true);
        clearSelect()
    };
    const clearSelect = () => {
        setTimeout(() => {
            setIsLoading(false)
        }, 10)
    };

    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            label={formElement.config.label}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, controls, formElement.id, setControls)}
        />
    ));

    if (allDrivers.length) {
        options = allDrivers.map(driver => {
            return <Option value={driver._id} key={driver._id}>
                {driver.lastName + ' ' + driver.name}
            </Option>
        })
    };

    const formElement = (
        <>
            <h6>{props.driversText.editPanelName}</h6>
            <p>{props.driversText.choiceDriver}</p>
            <Select
                style={{ width: 280 }}
                onChange={(value) => setDriver(value)}
                defaultValue={props.textMenu.drivers}>
                {options}
            </Select>
            <form onSubmit={submitHandler} style={{ display: 'inline', textAlign: 'center' }}>
                {form}
                <Button
                    disabled={!formIsValid || isLoading}
                    onClick={submitHandler}    
                >
                    {props.driversText ? props.driversText.submitChange : null}
                </Button>
                <Button
                    disabled={!formIsValid || isLoading}
                    type='danger'
                    style={{ margin: '1rem' }}
                    onClick={deleteHandler}
                >
                    {props.driversText ? props.driversText.delete : null}
                </Button>
            </form>
        </>
    );
    return (
        <Drawer
            visible={showEditDriver}
            placement="left"
            closable={false}
            width='auto'
            style={{ textAlign: 'center' }}
            onClose={cancelHandler}
        >
            {
                !allDrivers.length ? 
                <h6 style={{margin: 20, color: 'rgba(43, 144, 143, 0.85)'}}>
                    {props.driversText.noDrivers}
                </h6> :
                successMsg ?
                    <div style={{ margin: 20, textAlign: 'center' }}>
                        <h5 style={{color: 'rgba(43, 144, 143, 0.85)'}}>
                            {props.driversText.editDriverSuccess}
                        </h5>
                        <h6>{controls.name.value + ' ' + controls.lastName.value}</h6>
                        <p>Id: {successMsg}</p>
                    </div> :
                    errorMsg ?
                    <div style={{margin: '1.5rem'}}>
                        <h6 style={{color: 'red'}}>{
                            props.errorText[errorMsg] ? 
                            props.errorText[errorMsg] : 
                            props.driversText.addDriverError
                        }</h6>
                    </div> :
                        isLoading ? <Spinner /> :
                            formElement
            }
            <Button onClick={cancelHandler} >
                {props.driversText ? props.driversText.cancel : null}
            </Button>
        </Drawer>
    );
};

const mapStateToProps = state => {
    return {               
        errorText: state.initLang.textHome.serverResErrors,
        driversText: state.initLang.textOwner.driversForm,
        textMenu: state.initLang.textOwner.userMenu,
        demo: state.authReducer.demo
    };
};
export default connect(mapStateToProps)(EditDriver)