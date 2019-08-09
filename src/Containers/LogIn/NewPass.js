import React , {useState, useContext, useEffect} from 'react';
import {connect} from 'react-redux';
import {inputChangedHandler, validFormHandler, changeInputsFormText, cancelForm} from '../../shared/utility';
import Input from '../../Components/UI/Input/Input';
import Spinner from '../../Components/UI/Spinner/Spinner';
import AppContext from '../../context/app-context';
import * as actions from '../../store/actions/index';

const NewPass = props => {

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
        }
    });

    const [formIsValid, setFormIsValid] = useState(false);
    const {setShowNewPass} = useContext(AppContext);
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


    const submitHandler = () => {
        const data = {
            email: controls.email.value,           
            _csrf: props._csrf
        };
        props.onSubmitHandler(data);        
    };

    const cancelHandler = () => {        
        cancelForm(controls, formElementsKeyArray, setControls);
        props.clearError();
        setShowNewPass(false);
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

    const sendButton = (
        <button 
            className='btn btn-primary btn-sm' 
            onClick={submitHandler}
            disabled={!formIsValid || props.loading || props.newPassEmail}
            style={{marginRight: '1rem'}}>{props.loginText.newPassSubmit}
        </button>
    );

    const cancelButton = (
        <button
            onClick={cancelHandler}
            className='btn btn-secondary btn-sm'>
            {props.loginText.cancel}
        </button>
    );

    const successInfo = (
        <div>
            <p>{props.loginText.newPassInfoP1} {props.newPassEmail}<br></br>{props.loginText.newPassInfoP2}</p>
        </div>
    );

    return (        
        <>           
            {props.loading ? <Spinner /> : null}
            <form>
                {props.error ? <p>{props.errorText[props.error.toString()] || props.error}</p>: null}
                {props.newPassError ? <p>{props.errorText[props.newPassError.toString()] || props.error}</p>: null}
                {props.newPassEmail ? successInfo : 
                    <>
                        <p>{props.loginText.newPassRequest}</p>
                        {form}
                    </>
                    }
                {!props.newPassEmail ? sendButton: null}
                {cancelButton}
            </form>
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
        newPassEmail: state.authReducer.newPassEmail,
        newPassError: state.authReducer.newPassError
    };
};
const mapDispatchToProps = dispatch => {
    return {
       onSubmitHandler: (data) => dispatch(actions.newPassProcess(data)),
       clearError: () => dispatch(actions.authClearError())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewPass);