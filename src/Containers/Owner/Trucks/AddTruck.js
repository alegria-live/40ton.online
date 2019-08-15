import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import MenuContext from '../../../context/menu-context';
import { Truck } from './truckModel';
import { inputChangedHandler, validFormHandler, changeInputsLabelText, cancelForm } from '../../../shared/utility';
import Input from '../../../Components/UI/Input/Input';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import { Drawer } from 'antd';

const AddTruck = props => {

    const [controls, setControls] = useState({
        name: {
            elementType: 'input',
            label: props.trucksText.name,
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
        consum: {
            elementType: 'input',
            label: props.trucksText.consum,
            elementConfig: {
                type: 'number'
            },
            value: 24,
            validation: {
                required: true,
                minLength: 2,
                maxLength: 2
            },
            valid: true,
            touched: true
        },
        norm: {
            elementType: 'input',
            label: props.trucksText.norm,
            elementConfig: {               
                type: 'number',
                step: 0.1
            },
            value: 0.4,
            validation: {
                required: true,
                minLength: 3,
                maxLength: 4
            },
            valid: true,
            touched: true
        },
        id: {
            elementType: 'input',
            label: props.trucksText.id,
            elementConfig: {               
                type: 'text'
            },
            value: '',
            validation: {
                required: true,
                minLength: 3,
                maxLength: 10
            },
            valid: false,
            touched: false
        }
    });
    const { showAddTruck, setShowAddTruck } = useContext(MenuContext);
    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccesMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [formIsValid, setFormIsValid] = useState(false);

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
        changeInputsLabelText(controls, formElementsKeyArray, props.trucksText, setControls);
        // eslint-disable-next-line
    }, [props.trucksText]);
    
    const submitHandler = () => {        
        if(props.demo) { props.demoModal(true); return; }
        const truck = new Truck(
            {
                id: controls.id.value.toUpperCase().trim(),
                Truck: {
                    name: controls.name.value.trim(),
                    consum: Number(controls.consum.value),
                    norm: Number(controls.norm.value),
                    date: (new Date()).getTime(),
                    fuel: [],
                    routes: [],
                    paid: (new Date()).getTime() + 3456000000
                }
            }
        );        
        truck.addTruck(setSuccesMsg, setErrorMsg, setIsLoading);
    };
    const cancelHandler = () => {       
        cancelForm(controls, formElementsKeyArray, setControls);       
        setShowAddTruck(false);
        setSuccesMsg(null);
        setErrorMsg(null);
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
            <h6>{props.trucksText.addPanelName}</h6>
            <form  style={{display: "inline", textAlign: 'center' }}>
                {form}
                <button
                    className='btn btn-primary btn-sm'
                    type="button"
                    disabled={!formIsValid || isLoading}
                    onClick={submitHandler}
                    style={{ margin: '1rem' }}>
                    {props.trucksText ? props.trucksText.submit : null}
                </button>
            </form>
        </>
    )
    return (
        <Drawer
            visible={showAddTruck}
            placement="left"
            closable={false}
            style={{ textAlign: 'center' }}
            width='auto'
            onClose={cancelHandler}
        >
            {
                successMsg ?
                    <div style={{ margin: 20, textAlign: 'center' }}>
                        <h5 style={{color: 'rgba(43, 144, 143, 0.85)'}}>
                        {props.trucksText.addTruckSuccess}</h5>
                        <h6>{successMsg}</h6>                        
                    </div> :
                    errorMsg ?
                        <div style={{margin: '1.5rem'}}>
                            <h6 style={{color: 'red'}}>{
                                props.errorText[errorMsg] ?
                                props.errorText[errorMsg] : 
                                props.trucksText.addTruckError
                            }</h6>
                        </div> :
                        isLoading ? <Spinner /> :
                            formElement
            }

            <button
                onClick={cancelHandler}
                style={{margin: 'auto'}}
                className='btn btn-secondary btn-sm'>
                {props.trucksText ? props.trucksText.cancel : null}
            </button>
        </Drawer>
    );
};

const mapStateToProps = state => {
    return {    
        errorText: state.initLang.textHome.serverResErrors,
        trucksText: state.initLang.textOwner.trucksForm,
        demo: state.authReducer.demo
    };
};
export default connect(mapStateToProps)(AddTruck)