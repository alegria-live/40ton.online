import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import MenuContext from '../../../context/menu-context';
import AppContext from '../../../context/app-context';
import ChartsContext from '../../../context/charts-context';
import { inputChangedHandler, validFormHandler, cancelForm, changeInputsLabelText } from '../../../shared/utility';
import Input from '../../../Components/UI/Input/Input';
import { Drawer, Select, Button, DatePicker } from 'antd';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Axios from 'axios';
import Cookies from 'js-cookie';
const { Option } = Select;

const ManualRoutes = props => {
    const [action, setAction] = useState(0);

    const {setShowOwner} = useContext(AppContext);

    const kmStop = {
        elementType: 'input',
        label: props.manualText.kmStop,
        elementConfig: {
            type: 'number'
        },
        value: '',
        validation: {
            required: true,
            minLength: 1,
            maxLength: 7
        },
        valid: false,
        touched: false
    };
    const tonOut = {
        elementType: 'input',
        label: props.manualText.tonOut,
        elementConfig: {
            type: 'number',
            min: 0
        },
        value: '',
        validation: {
            required: true,
            minLength: 1,
            maxLength: 2
        },
        valid: false,
        touched: false
    };
    const tonIn = {
        elementType: 'input',
        label: props.manualText.tonIn,
        elementConfig: {
            type: 'number',
            min: 0
        },
        value: '',
        validation: {
            required: true,
            minLength: 1,
            maxLength: 2
        },
        valid: false,
        touched: false
    };
    const weight = {
        elementType: 'input',
        label: props.manualText.weight,
        elementConfig: {
            type: 'number',
            min: 0
        },
        value: '',
        validation: {
            required: true,
            minLength: 1,
            maxLength: 2
        },
        valid: false,
        touched: false
    };
    const country = {
        elementType: 'input',
        label: props.manualText.country,
        elementConfig: {
            type: 'text'
        },
        value: '',
        validation: {
            required: true,
            minLength: 1,
            maxLength: 20
        },
        valid: false,
        touched: false
    };
    const postal = {
        elementType: 'input',
        label: props.manualText.postal,
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
    };
    const litres = {
        elementType: 'input',
        label: props.manualText.litres,
        elementConfig: {
            type: 'number',
            min: 1
        },
        value: '',
        validation: {
            required: true,
            minLength: 1,
            maxLength: 4
        },
        valid: false,
        touched: false
    };
    const full = {
        elementType: 'select',
        label: props.manualText.full,
        elementConfig: {
            options: [
                { value: null, displayValue: '' },
                { value: 0, displayValue: props.manualText.no },
                { value: 1, displayValue: props.manualText.yes },
            ]
        },
        value: null,
        valid: false,
        validation: {
            required: true,
            minLength: 1
        }
    };
    const fullFirst = {
        elementType: 'select',
        label: props.manualText.fullFirst,
        elementConfig: {
            options: [
                { value: null, displayValue: '' },
                { value: 1, displayValue: props.manualText.yes },
            ]
        },
        value: null,
        valid: false,
        validation: {
            required: true,
            minLength: 1
        }
    };

    const [controls, setControls] = useState(null);
    const { showManualRoutes, setShowManualRoutes } = useContext(MenuContext);
    const {allActiveTrucks} = useContext(ChartsContext);
    const [_gcn] = useState(Cookies.get('_gcn'));
    const [lastRouteLength, setLastRouteLength] = useState(0);
    const [allTrucks, setAllTrucks] = useState([]);
    const [activeTruck, setActiveTruck] = useState(null);
    const [allDrivers, setAllDrivers] = useState([]);
    const [activeDriver, setActiveDriver] = useState(null);
    const [date, setDate] = useState(null);
    const [activeToRouteDelete, setActiveToRouteDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccesMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [formIsValid, setFormIsValid] = useState(false);
    let trucksOptions = <Option></Option>;
    let driversOptions = <Option></Option>;
    let trucksForRouteDelete = <Option></Option>;
    const formElementsArray = [];
    const formElementsKeyArray = [];

    if (controls) {
        for (let key in controls) {
            formElementsArray.push({
                id: key,
                config: controls[key]
            });
            formElementsKeyArray.push(key);
        };
    };

    const getData = () => {
        setIsLoading(true);
        Axios.get('/system/allTrucks')
            .then(res => {
                setAllTrucks(res.data);                
                Axios.get('/system/allDrivers')
                    .then(res => { setAllDrivers(res.data); setIsLoading(false) })
                    .catch(e => { setIsLoading(false); setErrorMsg(e) })
            })
            .catch(e => { setIsLoading(false); setErrorMsg(e) })
    };

    useEffect(() => {
        if (showManualRoutes) getData();
    }, [showManualRoutes]);

    useEffect(() => {
        if (controls) validFormHandler(controls, setFormIsValid);
    }, [controls]);

    useEffect(() => {
        changeInputsLabelText(controls, formElementsKeyArray, props.manualText, setControls)
        // eslint-disable-next-line
    }, [props.manualText]);

    const submitHandler = () => {
        if (props.demo) { props.demoModal(true); return; }
        let weightToOut = -1;
        let fullOut = 0;
        if(Number(action) === 3 && !lastRouteLength) weightToOut = Number(controls.weight.value);
        if(Number(action) === 2 ) weightToOut = Number(controls.tonIn.value);
        if(Number(action) === 1 ) weightToOut = Number(controls.tonOut.value);
        
        if(Number(action) === 3 && !lastRouteLength) fullOut = Number(controls.fullFirst.value);
        if(Number(action) === 3 && lastRouteLength) fullOut = Number(controls.full.value);

        const dataSet = {
            add: 1,
            country: controls.country.value,
            driverId: activeDriver,
            dtStop: date,
            fuel_Id: Number(action) === 3 ? -1 : 0,
            full: fullOut,
            kmStop: Number(controls.kmStop.value),
            litres: Number(action) === 3 ? Number(controls.litres.value) : 0,
            postal: controls.postal.value,
            tonOut:  weightToOut,
            truckId: activeTruck,
            type: Number(action),
            _csrf: props._csrf,
            _id: lastRouteLength
        };
        Axios.post('/system/owner/' + _gcn, dataSet)
            .then(res => {
                setIsLoading(false);
                setSuccesMsg(props.manualText.addRouteSuccess);
                setShowOwner(false);
                setShowOwner(true);
            })
            .catch(e => { setIsLoading(false); setErrorMsg(e.response.data.toString()) })
        console.log(dataSet)
    };

    const deleteHandler = () => {
        if (props.demo) { props.demoModal(true); return; }  
        Axios.delete('/system/owner/delRoute', {data: { _id: activeToRouteDelete }})
        .then(res => {
            setSuccesMsg(props.manualText.deleteRouteSuccess);
            setShowOwner(false);
            setShowOwner(true);
        })
        .catch(e => setErrorMsg(e.response.data));
       
    };
    const cancelHandler = () => {
        cancelForm(controls, formElementsKeyArray, setControls);
        setShowManualRoutes(false);
        setSuccesMsg(null);
        setIsLoading(true);
        setControls(null);
        setAction(0);
        setActiveDriver(null);
        setActiveTruck(null);
        setActiveToRouteDelete(null);
        clearSelect()
    };
    const clearSelect = () => {
        setTimeout(() => {
            setIsLoading(false)
        }, 10)
    };

    useEffect(() => {
        if (activeTruck && activeDriver && date) {
            if (action === 1) setControls({ kmStop, tonOut, postal, country })
            if (action === 2) setControls({ kmStop, tonIn, postal, country })
            if (action === 3 && lastRouteLength) setControls({ kmStop, litres, full, postal, country })
            if (action === 3 && !lastRouteLength) setControls({ kmStop, litres, fullFirst, weight, postal, country })
        }
        // eslint-disable-next-line
    }, [action]);


    const setFormElements = () => {
        const input = formElementsArray.map(formElement => {
            return <Input
                key={formElement.id}
                label={formElement.config.label}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => {
                    inputChangedHandler(event, controls, formElement.id, setControls)
                }
                }
            />
        });
        return input
    };

    let form = setFormElements();

    if (allTrucks.length) {
        trucksOptions = allTrucks.map(truck => {
            return <Option value={truck._id} key={truck._id}>
                {truck._id}
            </Option>
        })
    };

    if (allDrivers.length) {
        driversOptions = allDrivers.map(driver => {
            return <Option value={driver._id} key={driver._id}>
                {driver.lastName + ' ' + driver.name}
            </Option>
        })
    };    

    const formElement = (
        <>
            <h6>{props.manualText.title}</h6>
            <Select
                style={{ width: '100%', margin: '15px 0' }}
                onChange={value => {
                    setActiveTruck(value);
                    allTrucks.forEach(truck => {
                        if (truck._id === value) setLastRouteLength(truck.routesLength);
                    })
                }}
                defaultValue={props.manualText.choiceTruck}>
                {trucksOptions}
            </Select>
            <br></br>
            <Select
                style={{ width: '100%', margin: '15px 0' }}
                onChange={value => setActiveDriver(value)}
                defaultValue={props.manualText.choiceDriver}>
                {driversOptions}
            </Select>
            <br></br>
            <DatePicker
                style={{ width: '100%', marginTop: 15 }}
                allowClear={false}
                onChange={date => setDate((date._d).getTime())} />
            <br></br>
            <Select
                disabled={activeTruck === null || activeDriver === null || date === null}
                style={{ width: '100%', margin: '15px 0' }}
                onChange={value => setAction(value)}
                defaultValue={props.manualText.choiceAction}>
                    <Option disabled={!lastRouteLength} value={1} key={1} >{props.manualText.load}</Option>
                    <Option disabled={!lastRouteLength} value={2} key={2} >{props.manualText.unLoad}</Option>
                    <Option value={3} key={3} >{props.manualText.fuel}</Option>
            </Select>
            <hr></hr>
            <form style={{ display: "inline", textAlign: 'center' }}>
                {form}
                <Button
                    disabled={!formIsValid || isLoading}
                    onClick={submitHandler}
                    style={{ margin: '1rem' }}
                >
                    {props.manualText ? props.manualText.submitChange : ''}
                </Button>
            </form>
        </>
    );

    if (allActiveTrucks.length) {
        trucksForRouteDelete = allTrucks.map(truck => {
            if(!truck.routesLength) return null;
           return <Option value={truck._id} key={truck._id + "X"}>
                {truck._id}
            </Option>
        })
    };
    const formRouteDelete = (
        <>
            <h6>{props.manualText.deleteTitle}</h6>
            <Select
                style={{ width: '100%', margin: '15px 0' }}
                onChange={value => setActiveToRouteDelete(value)}
                defaultValue={props.manualText.choiceTruck}>
                {trucksForRouteDelete}
            </Select>
            <Button
                type='danger'
                disabled={isLoading || !activeToRouteDelete}
                style={{ margin: '1rem' }}
                onClick={deleteHandler}
            >
                {props.manualText ? props.manualText.deleteRoute : ''}
            </Button>
            <Button onClick={cancelHandler} >
                {props.manualText ? props.manualText.cancel : ''}
            </Button>
        </>
    );

    return (
        <Drawer
            visible={showManualRoutes}
            placement="left"
            closable={false}
            width='auto'
            style={{ textAlign: 'center' }}
            onClose={cancelHandler}
        >
            {
                !allTrucks.length ?
                    <h6 style={{ margin: 20, color: 'rgba(43, 144, 143, 0.85)' }}>
                        {props.manualText.noTrucks}
                    </h6> :
                    successMsg ?
                        <div style={{ margin: 20, textAlign: 'center' }}>
                            <h5 style={{ color: 'rgba(43, 144, 143, 0.85)' }}>
                                {successMsg}</h5>                            
                        </div> :
                        errorMsg ?
                            <div style={{ margin: '1.5rem' }}>
                                <h6 style={{ color: 'red' }}>{
                                    props.errorText[errorMsg] ?
                                        props.errorText[errorMsg] :
                                        props.manualText.addRouteError
                                }</h6>
                            </div> :
                            isLoading ? <Spinner /> :
                                formElement
            }
            <Button onClick={cancelHandler} >
                {props.manualText ? props.manualText.cancel : ''}
            </Button>
            
            <hr></hr>
            {errorMsg || successMsg ?  null : formRouteDelete}
        </Drawer>
    );
};

const mapStateToProps = state => {
    return {
        errorText: state.initLang.textHome.serverResErrors,
        manualText: state.initLang.textOwner.manualRoutes,
        _csrf: state.initLang._csrf,
        demo: state.authReducer.demo
    };
};
export default connect(mapStateToProps)(ManualRoutes)