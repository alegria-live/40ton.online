import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import MenuContext from '../../../context/menu-context';
import { Truck } from './truckModel';
import { inputChangedHandler, validFormHandler, cancelForm, changeInputsLabelText } from '../../../shared/utility';
import Input from '../../../Components/UI/Input/Input';
import { Drawer, Select, Button, Modal } from 'antd';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Axios from 'axios';
import _ from 'lodash';
const { Option } = Select;
const { confirm } = Modal;

const EditTruck = props => {

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
            value: 0,
            validation: {
                required: true,
                minLength: 2,
                maxLength: 2
            },
            valid: true,
            touched: false
        },
        norm: {
            elementType: 'input',
            label: props.trucksText.norm,
            elementConfig: {               
                type: 'number',
                step: 0.1
            },
            value: 0,
            validation: {
                required: true,
                minLength: 3,
                maxLength: 4
            },
            valid: true,
            touched: false
        },
        _id: {
            elementType: 'input',
            label: props.trucksText.id,
            elementConfig: {               
                type: 'text',
                disabled: true
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

    const { showEditTruck, setShowEditTruck } = useContext(MenuContext);
    const [allTrucks, setAllTrucks] = useState([]);
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

    const getTrucks = () => {
        setIsLoading(true);
        Axios.get('/system/allTrucks')
            .then(res => { setAllTrucks(res.data); setIsLoading(false) })
            .catch(e => { setIsLoading(false); setErrorMsg(e) })
    };
    useEffect(() => {
        if(showEditTruck) getTrucks();
    }, [showEditTruck]);

    useEffect(() => {
        getTrucks();
    }, []);

    useEffect(() => {
        validFormHandler(controls, setFormIsValid);
    }, [controls]);

    useEffect(() => {
        changeInputsLabelText(controls, formElementsKeyArray, props.trucksText, setControls)
        // eslint-disable-next-line
    }, [props.trucksText]);

    const setTruck = val => {
        const actualTruck = allTrucks.find(elem => elem._id === val);
        const copyControls = _.cloneDeep(controls);
        formElementsKeyArray.forEach(elem => {
            copyControls[elem].value = actualTruck[elem];
            copyControls[elem].valid = true;
            copyControls[elem].touched = true;
        });
        setControls(copyControls);
    };

    const submitHandler = event => {
        event.preventDefault();
        if(props.demo) { props.demoModal(true); return; }
        const truck = new Truck(
            {
                id: controls._id.value.toUpperCase().trim(),
                newData: {
                    'Truck.name': controls.name.value.trim(),
                    'Truck.consum': Number(controls.consum.value),
                    'Truck.norm': Number(controls.norm.value)
                }
            }
        );
        truck.updateTruck(setSuccesMsg, setErrorMsg, setIsLoading, getTrucks);
    };
    const deleteHandler = event => {
        if(event) event.preventDefault();
        if(props.demo) { props.demoModal(true); return; }
        const truck = new Truck({
            id: controls._id.value.toUpperCase().trim()
        });
        confirm({
            title: controls._id.value,
            content: props.trucksText.deleteConfirm,
            onOk() {
                truck.deleteTruck(setSuccesMsg, setErrorMsg, setIsLoading, getTrucks);
            },
            onCancel() { return }
        });
    };
    const cancelHandler = (event) => {
        if (event) event.preventDefault();
        cancelForm(controls, formElementsKeyArray, setControls);
        setShowEditTruck(false);
        setSuccesMsg(null);
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

    if (allTrucks.length) {
        options = allTrucks.map(truck => {
            return <Option value={truck._id} key={truck._id}>
                {truck._id}
            </Option>
        })
    };

    const formElement = (
        <>
            <h6>{props.trucksText.editPanelName}</h6>
            <p>{props.trucksText.choiceTruck}</p>
            <Select
                style={{ width: 280 }}
                onChange={(value) => setTruck(value)}
                defaultValue={props.textMenu.trucks}>
                {options}
            </Select>
            <form onSubmit={submitHandler} style={{ display: "inline", textAlign: 'center' }}>
                {form}
                <Button
                    disabled={!formIsValid || isLoading}
                    onClick={submitHandler}
                >
                    {props.trucksText ? props.trucksText.submitChange : ''}
                </Button>
                <Button
                    type='danger'
                    disabled={!formIsValid || isLoading}
                    style={{ margin: '1rem' }}
                    onClick={deleteHandler}
                >
                    {props.trucksText ? props.trucksText.delete : ''}
                </Button>
            </form>
        </>
    );
    return (
        <Drawer
            visible={showEditTruck}
            placement="left"
            closable={false}
            width='auto'
            style={{ textAlign: 'center' }}
            onClose={cancelHandler}
        >
            {
                !allTrucks.length ? 
                <h6 style={{margin: 20, color: 'rgba(43, 144, 143, 0.85)'}}>
                    {props.trucksText.noTrucks}
                </h6> :
                successMsg ?
                    <div style={{ margin: 20, textAlign: 'center' }}>
                        <h5 style={{color: 'rgba(43, 144, 143, 0.85)'}}>
                        {props.trucksText.editTruckSuccess}</h5>
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
            <Button onClick={cancelHandler} >
                {props.trucksText ? props.trucksText.cancel : ''}
            </Button>
        </Drawer>
    );
};

const mapStateToProps = state => {
    return {
        errorText: state.initLang.textHome.serverResErrors,
        trucksText: state.initLang.textOwner.trucksForm,
        textMenu: state.initLang.textOwner.userMenu,
        demo: state.authReducer.demo
    };
};
export default connect(mapStateToProps)(EditTruck)