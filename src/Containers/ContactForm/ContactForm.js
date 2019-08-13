import React , {useState, useContext, useEffect} from 'react';
import {connect} from 'react-redux';
import {inputChangedHandler, validFormHandler, changeInputsFormText, cancelForm} from '../../shared/utility';
import Input from '../../Components/UI/Input/Input';
import Spinner from '../../Components/UI/Spinner/Spinner';
import AppContext from '../../context/app-context';
import Axios from 'axios';

const ContactForm = props => {

    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: props.text.email
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: props.text.imię
            },
            value: '',
            validation: {
                required: true,
                minLength: 2
            },
            valid: false,
            touched: false
        },
        content: {
            elementType: 'textarea',
            elementConfig: {
                type: 'textarea',
                rows: 8,
                placeholder: props.text.content,
            },
            value: '',
            validation: {
                required: true,
                minLength: 10
            },
            valid: false,
            touched: false
        }
    });

    const [formIsValid, setFormIsValid] = useState(false);
    const {setShowContactForm} = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccesMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
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
        changeInputsFormText(controls, formElementsKeyArray, props.text, setControls)
    // eslint-disable-next-line
    }, [props.text]);    

    const submitHandler = () => {
        const data = {
            email: controls.email.value,
            name: controls.name.value,
            content: controls.content.value,
            _csrf: props._csrf
        };
        setIsLoading(true);
        Axios.post('/sendForm', data)
        .then(res =>{
            setIsLoading(false)
            setSuccesMsg(props.text.success)
        })
        .catch(e => {
            setIsLoading(false)
            setErrorMsg(e.response.data)
        });
    };

    const cancelHandler = () => {       
        cancelForm(controls, formElementsKeyArray, setControls);
        setSuccesMsg(null);
        setErrorMsg(null);
        setShowContactForm(false);
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
            {isLoading ? <Spinner /> : null}
            {successMsg ? <p>{successMsg}</p> : 
            <form style={{display: 'inline'}}>
                {errorMsg ? <p>{props.errorText[errorMsg.toString()] || errorMsg}</p>: null}                
                {form}
                <button 
                    className='btn btn-primary btn-sm' 
                    disabled={!formIsValid || isLoading}
                    onClick={submitHandler}
                    style={{marginRight: '1rem'}}>
                    {props.text.submit}
                </button>
            </form>}
            <button
                onClick={cancelHandler}
                className='btn btn-secondary btn-sm'>
                {props.text.cancel}
            </button>         
        </>
    );
};

const mapStateToProps = state => {
    return {
        _csrf: state.initLang._csrf,
        errorText: state.initLang.textHome.serverResErrors,
        text: state.initLang.textHome.contactForm
    };
};

export default connect(mapStateToProps)(ContactForm);