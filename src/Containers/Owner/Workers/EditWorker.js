import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import MenuContext from '../../../context/menu-context';
import { Worker } from './workerModel';
import { inputChangedHandler, validFormHandler, cancelForm, changeInputsFormText } from '../../../shared/utility';
import Input from '../../../Components/UI/Input/Input';
import { Drawer, Select, Button, Modal } from 'antd';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Axios from 'axios';
import _ from 'lodash';
const { Option } = Select;
const { confirm } = Modal;

const EditWorker = props => {

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
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: props.workerText.password3
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

    const { showEditWorker, setShowEditWorker } = useContext(MenuContext);
    const [allWorkers, setAllWorkers] = useState([]);
    const [workerCurrentEmail, setWorkerCurrentEmail] = useState(null);
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

    const getWorkers = () => {
        setIsLoading(true);
        Axios.get('/api/workers/getWorkers')
            .then(res => { setAllWorkers(res.data); setIsLoading(false) })
            .catch(e => { console.log(e); setIsLoading(false); setErrorMsg(e) })
    };
    useEffect(() => {
        if (showEditWorker) getWorkers();
    }, [showEditWorker]);

    useEffect(() => {
        validFormHandler(controls, setFormIsValid);
    }, [controls]);

    useEffect(() => {
        changeInputsFormText(controls, formElementsKeyArray, props.workerText, setControls)
        // eslint-disable-next-line
    }, [props.workerText]);

    const setWorker = val => {
        setWorkerCurrentEmail(val);
        const actualWorker = allWorkers.find(elem => elem.email === val);
        const copyControls = _.cloneDeep(controls);
        formElementsKeyArray.forEach(elem => {
            copyControls[elem].value = actualWorker[elem];
            copyControls[elem].valid = true;
            copyControls[elem].touched = true;
        });
        copyControls['password'].valid = false;
        setControls(copyControls);
    };

    const submitHandler = () => {       
        if (props.demo) { props.demoModal(true); return; }
        const worker = new Worker(
            {
                id: workerCurrentEmail,
                newData: {
                    name: controls.name.value.trim(),
                    lastName: controls.lastName.value.trim(),
                    email: controls.email.value.trim(),
                    password: controls.password.value.trim(),
                }
            }
        );
        worker.updateWorker(setSuccesMsg, setErrorMsg, setIsLoading, getWorkers);
    };
    const deleteHandler = () => {        
        if (props.demo) { props.demoModal(true); return; }
        const worker = new Worker({
            id: controls.email.value.trim()
        });
        confirm({
            title: controls.name.value + ' ' + controls.lastName.value,
            content: props.workerText.deleteConfirm,
            onOk() {
                worker.deleteWorker(setSuccesMsg, setErrorMsg, setIsLoading, getWorkers);
            },
            onCancel() { return }
        });        
    };
    const cancelHandler = () => {        
        cancelForm(controls, formElementsKeyArray, setControls);
        setShowEditWorker(false);
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

    if (allWorkers.length) {
        options = allWorkers.map(worker => {
            return <Option value={worker.email} key={worker.email}>
                {worker.lastName + ' ' + worker.name}
            </Option>
        })
    };

    const formElement = (
        <>
            <h6>{props.workerText.editPanelName}</h6>
            <p>{props.workerText.restrictionText}</p>
            <p>{props.workerText.choiceWorker}</p>
            <Select
                style={{ width: "100%" }}
                onChange={(value) => setWorker(value)}
                defaultValue={props.textMenu.workers}>
                {options}
            </Select>
            <form  style={{ display: "inline", textAlign: 'center' }}>
                {form}       
                <Button
                    onClick={submitHandler}
                    disabled={!formIsValid || isLoading || !props.perm}
                >
                    {props.workerText ? props.workerText.submitChange : ''}
                </Button>
                <Button
                    type="danger"
                    disabled={!formIsValid || isLoading || !props.perm}
                    style={{ margin: '1rem' }}
                    onClick={deleteHandler}
                >
                    {props.workerText ? props.workerText.delete : ''}
                </Button>
            </form>
        </>
    );
    return (
        <Drawer
            visible={showEditWorker}
            placement="left"
            closable={false}
            width='auto'
            style={{ textAlign: 'center' }}
            onClose={cancelHandler}
        >
            {
                !allWorkers.length ? <h6 style={{ margin: 20, color: 'rgba(43, 144, 143, 0.85)' }}>{props.workerText.noWorkers}</h6> :
                    successMsg ?
                        <div style={{ margin: 20, textAlign: 'center' }}>
                            <h5 style={{ color: 'rgba(43, 144, 143, 0.85)' }}>
                                {props.workerText.editWorkerSuccess}</h5>
                            <h6>{successMsg === 1 ?
                                controls.name.value + ' ' + controls.lastName.value :
                                successMsg}</h6>
                        </div> :
                        errorMsg ?
                            <div style={{ margin: '1.5rem' }}>
                                <h6 style={{ color: 'red' }}>{
                                    props.errorText[errorMsg] ?
                                        props.errorText[errorMsg] :
                                        props.workerText.addWorkerError
                                }</h6>
                            </div> :
                            isLoading ? <Spinner /> :
                                formElement
            }
            <Button onClick={cancelHandler} >
                {props.workerText ? props.workerText.cancel : ''}
            </Button>
        </Drawer>
    );
};

const mapStateToProps = state => {
    return {
        errorText: state.initLang.textHome.serverResErrors,
        workerText: state.initLang.textOwner.workerForm,
        textMenu: state.initLang.textOwner.userMenu,
        perm: state.authReducer.perm,
        demo: state.authReducer.demo
    };
};
export default connect(mapStateToProps)(EditWorker)