import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import MenuContext from '../../../context/menu-context';
import { Driver } from './driverModel';
import { inputChangedHandler, validFormHandler, changeInputsFormText, cancelForm } from '../../../shared/utility';
import DriverInstruction from '../../../Components/Owner/Instructions/DriverInstruction';
import Input from '../../../Components/UI/Input/Input';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import { Drawer } from 'antd';

const AddDriver = props => {

    const [controls, setControls] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                placeholder: props.driversText.name,
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
            placeholder: props.driversText.lastName,
            validation: {
                required: true,
                minLength: 2,
                maxLength: 20
            },
            valid: false,
            touched: false
        },
        document: {
            elementType: 'input',
            elementConfig: {
                placeholder: props.driversText.document,
                type: 'text'
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
    const { showAddDriver, setShowAddDriver } = useContext(MenuContext);
    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccesMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [formIsValid, setFormIsValid] = useState(false);
    const [showInstruction, setShowInstruction] = useState(false);

    const formElementsArray = [];
    const formElementsKeyArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        });
        formElementsKeyArray.push(key);
    };

    useEffect(() => {
        validFormHandler(controls, setFormIsValid);
    }, [controls]);

    useEffect(() => {
        changeInputsFormText(controls, formElementsKeyArray, props.driversText, setControls)
        // eslint-disable-next-line
    }, [props.driversText]);
    
    const submitHandler = () => {        
        if(props.demo) { props.demoModal(true); return; }
        const driver = new Driver(
            {
                id: controls.document.value.toLowerCase().trim(),
                Driver: {
                    name: controls.name.value.trim(),
                    lastName: controls.lastName.value.trim(),
                    date: (new Date()).getTime(),
                    routes: []
                }
            }
        );        
        driver.addDriver(setSuccesMsg, setShowInstruction, setErrorMsg, setIsLoading);
    };
    const cancelHandler = () => {        
        cancelForm(controls, formElementsKeyArray, setControls);        
        setShowAddDriver(false);
        setSuccesMsg(null);
        setErrorMsg(null);
        setShowInstruction(false);
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

    const formElement = (
        <>
            <h6>{props.driversText.addPanelName}</h6>
            <form  style={{ display: "inline", textAlign: 'center' }}>
                {form}
                <button
                    className='btn btn-primary btn-sm'
                    disabled={!formIsValid || isLoading}
                    onClick={submitHandler}
                    style={{ margin: '1rem' }}>
                    {props.driversText ? props.driversText.submit : null}
                </button>
            </form>
        </>
    )
    return (
        successMsg ?
        <DriverInstruction 
            visible={showInstruction}
            onClose={cancelHandler}
            name= {successMsg.name}
            lastName= {successMsg.lastName}
            id={successMsg.id}>
        </DriverInstruction> :
        <Drawer
            visible={showAddDriver}
            placement="left"
            closable={false}
            width='auto'
            style={{ textAlign: 'center' }}
            onClose={cancelHandler}
        >
            {
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

            <button
                onClick={cancelHandler}
                className='btn btn-secondary btn-sm'>
                {props.driversText ? props.driversText.cancel : null}
            </button>
        </Drawer>
    );
};

const mapStateToProps = state => {
    return {
        errorText: state.initLang.textHome.serverResErrors,
        driversText: state.initLang.textOwner.driversForm,
        demo: state.authReducer.demo
    };
};
export default connect(mapStateToProps)(AddDriver)