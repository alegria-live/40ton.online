import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import MenuContext from '../../../context/menu-context';
import AppContext from '../../../context/app-context';
import { inputChangedHandler, validFormHandler, cancelForm, checkIdentity, changeInputsFormText } from '../../../shared/utility';
import Input from '../../../Components/UI/Input/Input';
import { Drawer, Button, Modal } from 'antd';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Axios from 'axios';
import * as actions from '../../../store/actions';
import _ from 'lodash';
const { confirm } = Modal;

const EditCompany = props => {

    const [controls, setControls] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',                
                placeholder: props.registerText.name
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
                placeholder: props.registerText.lastName
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
        company: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: props.registerText.company
            },
            value: '',
            validation: {
                required: true,
                minLength: 2,
                maxLength: 30
            },
            valid: false,
            touched: false
        },
        nip: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: props.registerText.nip
            },
            value: '',
            validation: {
                required: true,
                minLength: 6,
                maxLength: 20
                
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: props.registerText.street
            },
            value: '',
            validation: {
                required: true,
                minLength: 2,
                maxLength: 40
            },
            valid: false,
            touched: false
        },
        city: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: props.registerText.city
            },
            value: '',
            validation: {
                required: true,
                minLength: 2,
                maxLength: 30
            },
            valid: false,
            touched: false
        },
        post: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: props.registerText.post
            },
            value: '',
            validation: {
                required: true,
                minLength: 2,
                maxLength: 10
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: props.registerText.country
            },
            value: '',
            validation: {
                required: true,
                minLength: 2,
                maxLength: 30
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: props.registerText.email
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
                placeholder: props.registerText.email2
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
                placeholder: props.registerText.password3
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
                placeholder: props.registerText.password2
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

    const { showEditCompany, setShowEditCompany} = useContext(MenuContext);
    const { setShowOwner } = useContext(AppContext);   

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

    const getCompany = () => {
        setIsLoading(true);
        Axios.get('/api/users/findUser')
            .then(res => { setWorker(res.data); setIsLoading(false) })
            .catch(e => { setIsLoading(false); setErrorMsg(e.response.data) })
    };
    useEffect(() => {
        if(showEditCompany) getCompany();
        // eslint-disable-next-line
    }, [showEditCompany]);

    useEffect(() => {
        getCompany();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        validFormHandler(controls, setFormIsValid);
        if(notIdentity) setNotIdentity(null)
        // eslint-disable-next-line
    }, [controls]);

    useEffect(() => {
        changeInputsFormText(controls, formElementsKeyArray, props.registerText, setControls)
        // eslint-disable-next-line
    }, [props.registerText]);

    const setWorker = val => {        
        const copyControls = _.cloneDeep(controls);
        formElementsKeyArray.forEach(elem => {
            copyControls[elem].value = val[elem];
            copyControls[elem].valid = true;
            copyControls[elem].touched = true;
        });
        copyControls['password'].valid = false;
        copyControls['password2'].valid = false;
        setControls(copyControls);
    };

    const checkIdentityHandler = (event) => {
        event.preventDefault();
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
        const data = {
            dataSet : {
                name: controls.name.value,
                lastName: controls.lastName.value,
                company: controls.company.value,
                nip: controls.nip.value,
                street: controls.street.value,
                city: controls.city.value,
                post: controls.post.value,
                country: controls.country.value,
                email: controls.email.value,
                password: controls.password.value                
            }
        };
        setIsLoading(true);
        Axios.put('api/users', data)
        .then(res => {
            if(res.status === 200) {
                setSuccesMsg(true);
                setIsLoading(false);
            }
        })
        .catch(e => {
            setErrorMsg(e.response.data.toString());
            setIsLoading(false);
        })
    };
    const deleteHandler = event => {
        event.preventDefault();
        if(props.demo) { props.demoModal(true); return }
        confirm({
            title: controls.company.value,
            content: props.cText.deleteConfirm,
            onOk() {
                setIsLoading(true);
                Axios.delete('api/users')
                .then(res => {
                    if(res.status === 200) {
                        setShowOwner(false);
                        props.onLogout();
                    }
                })
                .catch(e => {
                    setErrorMsg(e.response.data.toString());
                    setIsLoading(false);
                })
            },
            onCancel() { return }
        });        
    };
    const cancelHandler = (event) => {
        if (event) event.preventDefault();
        cancelForm(controls, formElementsKeyArray, setControls);
        setShowEditCompany(false);
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

    const formElement = (
        <>
            <h6>{props.cText.panelName}</h6>
            <p>{props.restrictionText}</p>
            <form onSubmit={checkIdentityHandler} style={{ display: "inline", textAlign: 'center' }}>
                {form}
                <p style={{color: 'red'}}>{
                    notIdentity === 'email' ?
                    props.registerText.emailNotIdentity :
                    notIdentity === 'password' ?
                    props.registerText.passwordNotIdentity :
                    null
                }</p>
                <Button
                    disabled={!formIsValid || isLoading || !props.perm}
                    onClick={ checkIdentityHandler }
                >
                        {props.cText ? props.cText.submitChange : ''}
                </Button>
                <Button
                    type="danger"
                    disabled={!formIsValid || isLoading || !props.perm}
                    style={{ margin: '1rem' }}
                    onClick={ deleteHandler }
                >
                    {props.cText ? props.cText.delete : ''}
                </Button>
            </form>
        </>
    );
    return (
        <Drawer
            visible={showEditCompany}
            placement="left"
            closable={false}
            width='auto'
            style={{ textAlign: 'center' }}
            onClose={cancelHandler}
        >
            {                   
                successMsg ?
                    <div style={{ margin: 20, textAlign: 'center' }}>
                        <h5 style={{color: 'rgba(43, 144, 143, 0.85)'}}>
                        {props.cText.editCompanySuccess}</h5>                       
                    </div> :
                    errorMsg ?
                    <div style={{margin: '1.5rem'}}>
                            <h6 style={{color: 'red'}}>{
                                props.errorText[errorMsg] ? 
                                props.errorText[errorMsg] : 
                                props.cText.addWorkerError
                            }</h6>
                        </div> :
                        isLoading ? <Spinner /> :
                            formElement
            }
            <Button onClick={cancelHandler}>
                {props.cText ? props.cText.cancel : ''}
            </Button> 
        </Drawer>
    );
};

const mapStateToProps = state => {
    return {
        errorText: state.initLang.textHome.serverResErrors,
        cText: state.initLang.textOwner.companyEdit,
        registerText: state.initLang.textHome.registerForm,
        textMenu: state.initLang.textOwner.userMenu,
        restrictionText: state.initLang.textOwner.workerForm.restrictionText,
        perm: state.authReducer.perm,
        demo: state.authReducer.demo
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logoutUser())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditCompany)