import React , {useState, useContext, useEffect} from 'react';
import {connect} from 'react-redux';
import {inputChangedHandler, validFormHandler, changeInputsFormText, cancelForm} from '../../shared/utility';
import Input from '../../Components/UI/Input/Input';
import Spinner from '../../Components/UI/Spinner/Spinner';
import AppContext from '../../context/app-context';
import * as actions from '../../store/actions/index';

const LogIn = props => {

    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: props.loginText.email
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
                placeholder: props.loginText.password
            },
            value: '',
            validation: {
                required: true,
                minLength: 4
            },
            valid: false,
            touched: false
        }        
    });

    const [formIsValid, setFormIsValid] = useState(false);
    const {setShowLogIn, setShowNewPass} = useContext(AppContext);
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
        changeInputsFormText(controls, formElementsKeyArray, props.loginText, setControls)
    // eslint-disable-next-line
    }, [props.loginText]);

    useEffect(() => {
        if(props.token) {
            cancelHandler();
        }
    // eslint-disable-next-line
    },[props.token])

    const submitHandler = ( event ) => {
        event.preventDefault();
        const data = {
            email: controls.email.value,
            password: controls.password.value,
            _csrf: props._csrf
        };
        props.onSubmitHandler(data);
    };

    const cancelHandler = (event) => {
        if(event) event.preventDefault();
        cancelForm(controls, formElementsKeyArray, setControls);
        props.clearError();
        setShowLogIn();
    };

    const forgotPswHandler = (event) => {
        cancelHandler(event);
        setShowNewPass();
    };
     
    let form = formElementsArray.map( formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={( event ) => inputChangedHandler( event, controls, formElement.id, setControls)}
        />
    ));

    return (        
        <>           
            {props.loading ? <Spinner /> : null}
            <form onSubmit={submitHandler}>
                {props.error ? <p>{props.errorText[props.error.toString()] || props.error}</p>: null}                
                {form}
                <button 
                className='btn btn-primary btn-sm' 
                disabled={!formIsValid || props.loading}
                style={{marginRight: '1rem'}}>{props.loginText.submit}</button>
                <button onClick={cancelHandler} className='btn btn-secondary btn-sm'>{props.loginText.cancel}</button>
            </form>
            <p 
            style={{marginTop: '2rem', cursor: 'pointer'}}
            onClick={forgotPswHandler}>{props.loginText.forgotPsw}</p>
        </>
    );
};

const mapStateToProps = state => {
    return {
        _csrf: state.initLang._csrf,
        error: state.authReducer.error,
        loading: state.authReducer.loading,
        errorText: state.initLang.textHome.serverResErrors,
        loginText: state.initLang.textHome.logIn,
        token: state.authReducer.token
    };
};
const mapDispatchToProps = dispatch => {
    return {
       onSubmitHandler: (data) => dispatch(actions.authProcess(data)),
       clearError: () => dispatch(actions.authClearError())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);