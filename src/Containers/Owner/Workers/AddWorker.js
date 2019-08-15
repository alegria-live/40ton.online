import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import MenuContext from '../../../context/menu-context';
import { Worker } from './workerModel';
import { inputChangedHandler, validFormHandler, changeInputsFormText, cancelForm, checkIdentity } from '../../../shared/utility';
import Input from '../../../Components/UI/Input/Input';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import { Drawer } from 'antd';

const AddWorker = props => {

    const [controls, setControls] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                placeholder: props.workerText.name,
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
                type: 'text',
                placeholder: props.workerText.lastName
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
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: props.workerText.email
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        email2: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: props.workerText.email2
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: props.workerText.password
            },
            value: '',
            validation: {
                required: true,
                minLength: 4,
                maxLength: 50
            },
            valid: false,
            touched: false
        },
        password2: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: props.workerText.password2
            },
            value: '',
            validation: {
                required: true,
                minLength: 4,
                maxLength: 50
            },
            valid: false,
            touched: false
        }
    });
    const { showAddWorker, setShowAddWorker } = useContext(MenuContext);
    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccesMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [formIsValid, setFormIsValid] = useState(false);
    const [notIdentity, setNotIdentity] = useState(null);

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
        if(notIdentity) setNotIdentity(null)
        // eslint-disable-next-line
    }, [controls]);

    useEffect(() => {
        changeInputsFormText(controls, formElementsKeyArray, props.workerText, setControls)
        // eslint-disable-next-line
    }, [props.workerText]);

    const checkIdentityHandler = () => {        
        if(!checkIdentity(controls.email.value, controls.email2.value)) {
            setFormIsValid(false);
            setNotIdentity('email');
            return;
        }
        else {
            if(!checkIdentity(controls.password.value, controls.password2.value)) {
                setFormIsValid(false);
                setNotIdentity('password');
                return;
            }
        };
        submitHandler()
    };

    const submitHandler = () => {
        if(props.demo) { props.demoModal(true); return; }
        const worker = new Worker(
            {
                dataSet: {
                    name: controls.name.value.trim(),
                    lastName: controls.lastName.value.trim(),
                    email: controls.email.value.trim(),
                    password: controls.password.value.trim()
                }
            }
        );
        worker.addWorker(setSuccesMsg, setErrorMsg, setIsLoading);
    };
    const cancelHandler = () => {        
        cancelForm(controls, formElementsKeyArray, setControls);
        setShowAddWorker(false);
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
            <h6 style={{marginBottom: '2rem'}}>{props.workerText.addPanelName}</h6>
            <p>{props.workerText.restrictionText}</p>
            <p>{props.workerText.addPanelDescripton}</p>
            <form  style={{ display: "inline", textAlign: 'center' }}>
                {form}
                <p style={{color: 'red'}}>{
                    notIdentity === 'email' ?
                    props.registerText.emailNotIdentity :
                    notIdentity === 'password' ?
                    props.registerText.passwordNotIdentity :
                    null
                }</p>
                <button
                    className='btn btn-primary btn-sm'
                    type="button"
                    disabled={!formIsValid || isLoading || !props.perm}
                    onClick={checkIdentityHandler}
                    style={{ marginRight: '1rem' }}>
                    {props.workerText ? props.workerText.submit : ''}
                </button>
            </form>
        </>
    )
    return (
        <Drawer
            visible={showAddWorker}
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
                        {props.workerText.addWorkerSuccess}</h5>
                        <h6>{successMsg}</h6>
                    </div> :
                    errorMsg ?
                        <div style={{margin: '1.5rem'}}>
                            <h6 style={{color: 'red'}}>{
                                props.errorText[errorMsg] ? 
                                props.errorText[errorMsg] : 
                                props.workerText.addWorkerError
                            }</h6>
                        </div> :
                        isLoading ? <Spinner /> :
                            formElement
            }

            <button
                onClick={cancelHandler}
                style={{ margin: 'auto' }}
                className='btn btn-secondary btn-sm'>
                {props.workerText ? props.workerText.cancel : ''}
            </button>
        </Drawer>
    );
};

const mapStateToProps = state => {
    return {
        errorText: state.initLang.textHome.serverResErrors,
        registerText: state.initLang.textHome.registerForm,
        workerText: state.initLang.textOwner.workerForm,
        perm: state.authReducer.perm,
        demo: state.authReducer.demo
    };
};
export default connect(mapStateToProps)(AddWorker)