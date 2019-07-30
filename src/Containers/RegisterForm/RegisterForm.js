import React , {useState, useContext, useEffect} from 'react';
import {connect} from 'react-redux';
import {inputChangedHandler, validFormHandler, changeInputsFormText, cancelForm, checkIdentity} from '../../shared/utility';
import Input from '../../Components/UI/Input/Input';
import Spinner from '../../Components/UI/Spinner/Spinner';
import Modal from '../../Components/UI/Modal/Modal'; 
import AppContext from '../../context/app-context';
import * as actions from '../../store/actions/index';

const LogIn = props => {

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
                placeholder: props.registerText.password
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
    const [showModal, setShowModal] = useState({show:false, message: null})
    const [formIsValid, setFormIsValid] = useState(false);
    const {setShowRegister} = useContext(AppContext);
    const formElementsArray = [];
    const formElementsKeyArray = [];
    for ( let key in controls ) {
        formElementsArray.push( {
            id: key,
            config: controls[key]
        });
        formElementsKeyArray.push(key);
    };
        
    useEffect(() => {
        validFormHandler(controls, setFormIsValid);
    }, [controls]);

    useEffect(() => {
        changeInputsFormText(controls, formElementsKeyArray, props.registerText, setControls)
    // eslint-disable-next-line
    }, [props.registerText]);

    useEffect(() => {
        if(props.error) {
            setShowModal({
                show:true,
                message: <p>{props.errorText[props.error.toString()]}</p> || <p>{props.error}</p>                
            })
        }
    // eslint-disable-next-line
    },[props.error]);

    useEffect(() => {
        if(props.registerEmail) {
            setShowModal({show:true,
                message:<p>{props.registerText.registerSuccess1} {props.registerEmail} {<br></br>} {props.registerText.registerSuccess2}</p>
            })
        }
    // eslint-disable-next-line
    },[props.registerEmail]);

    const checkIdentityHandler = (event) => {
        event.preventDefault();
        if(!checkIdentity(controls.email.value, controls.email2.value)) {
            return setShowModal({show:true, message: props.registerText.emailNotIdentity})
        }
        else {
            if(!checkIdentity(controls.password.value, controls.password2.value)) {
                return setShowModal({show:true, message: props.registerText.passwordNotIdentity})
            }
        };
        submitHandler()
    };
    
    const submitHandler = ( event ) => {        
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
                password: controls.password.value,
                date: new Date().getTime(),
                workers: [],
                orders: [],
                invoices: [],
                activ: 0,
                permission: 1
            },
            _csrf: props._csrf
        };
       props.onSubmitHandler(data);
    };

    const cancelHandler = (event) => {
        if(event) event.preventDefault();
        cancelForm(controls, formElementsKeyArray, setControls);
        props.clearError();
        setShowRegister(false);
    };
    const hideModal = () => {
        props.clearError();
        setShowModal({show: false, message: null});
    }
     
    let form = formElementsArray.map( formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}            
            register={true}
            padding="3px"
            changed={( event ) => inputChangedHandler( event, controls, formElement.id, setControls)}
        />
    ));
    return (        
        <>
            {props.loading ? <Spinner /> : null}
            <Modal show={showModal.show}>
                <div>{showModal.message}</div>
                <button
                    className="btn btn-danger btn-sm mt-3"
                    onClick={props.registerEmail ? cancelHandler : hideModal}>
                    {props.registerText.cancel}
                </button>              
            </Modal>
            <form onSubmit={checkIdentityHandler}>                                
                {form}
                <div style={{margin: '1rem 0'}}>
                    <input 
                    style={{transform: 'scale(1.5)'}}
                    type="checkbox"
                    required />
                    <small style={{padding: '1.5rem'}}>{props.registerText.clause}</small>
                </div>                
                <button 
                className='btn btn-primary btn-sm' 
                disabled={!formIsValid || props.loading} 
                style={{marginRight: '1rem'}}>{props.registerText.submit}</button>
                <button onClick={cancelHandler} className='btn btn-secondary btn-sm'>{props.registerText.cancel}</button>
            </form>            
        </>
    );
};

const mapStateToProps = state => {
    return {
        _csrf: state.initLang._csrf,
        error: state.regReducer.error,
        loading: state.regReducer.loading,
        errorText: state.initLang.textHome.serverResErrors,
        registerText: state.initLang.textHome.registerForm,
        registerEmail: state.regReducer.registerEmail
    };
};
const mapDispatchToProps = dispatch => {
    return {
       onSubmitHandler: (data) => dispatch(actions.registerProcess(data)),
       clearError: () => dispatch(actions.registerClearError())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);