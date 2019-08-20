import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import MenuContext from '../../../context/menu-context';
import ChartsContext from '../../../context/charts-context';
import { Truck } from './truckModel';
import { Drawer, Select, Button, DatePicker  } from 'antd';
import locale_es from 'antd/lib/date-picker/locale/es_ES';
import locale_pl from 'antd/lib/date-picker/locale/pl_PL';
import Spinner from '../../../Components/UI/Spinner/Spinner';
const { Option } = Select;

const EditTruck = props => {

    const { showTheft, setShowTheft } = useContext(MenuContext);
    const {allActiveTrucks, getActiveTrucks} = useContext(ChartsContext);
    const [activeTrucksArr, setActiveTrucksArr] = useState([]);
    const [activeTruck, setActiveTruck] = useState(null);
    const [theftDate, setTheftDate] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccesMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);       

    useEffect(() => {
		if (allActiveTrucks.length) {
			setActiveTrucksArr(allActiveTrucks.map(truck => {
				return (<Option
					value={truck._id}
					key={truck._id}>
					{truck._id}
				</Option>)
			}));
			
		}		
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);    

    const submitHandler = event => {
        event.preventDefault();
        if(props.demo) { props.demoModal(true); return; }
        const truck = new Truck(
            {
               id: activeTruck,
               date: theftDate
            }
        );
        truck.theft(setSuccesMsg, setErrorMsg, setIsLoading);
    };

    const cancelHandler = () => {
        if(successMsg) {getActiveTrucks()}  
        setShowTheft(false);
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

    const formElement = (
        <>
            <h6>{props.trucksText.theftPanelName}</h6>
            <p>{props.trucksText.theftPanelDescription}</p>
            <p>{props.trucksText.choiceTheftData}</p>
            
            <form style={{ display: "inline", textAlign: 'center' }}>
                <Select
                    style={{ width: 240, margin: '20px 0'}}
                    onChange={value => setActiveTruck(value)}
                    defaultValue='-------------------------------'>
                    {activeTrucksArr}
                </Select>
                <br></br>         
                <DatePicker
                    locale={props.language === 'es' ? locale_es : locale_pl}
                    style={{ width: 240, marginBottom: 35}}
                    onChange={date => setTheftDate((date._d).getTime())} />
                <br></br>
                <Button
                    style={{marginRight: 20}}
                    disabled={!activeTruck || !theftDate || isLoading}
                    onClick={submitHandler}
                >
                    {props.trucksText ? props.trucksText.theftSubmit : ''}
                </Button>                
            </form>
        </>
    );
    return (
        <Drawer
            visible={showTheft}
            placement="left"
            closable={false}
            width='auto'
            style={{ textAlign: 'center' }}
            onClose={cancelHandler}
        >
            {
                !allActiveTrucks.length ? 
                <h6 style={{margin: 20, color: 'rgba(43, 144, 143, 0.85)'}}>
                    {props.trucksText.noTrucks}
                </h6> :
                successMsg ?
                    <div style={{ margin: 20, textAlign: 'center' }}>
                        <h5 style={{color: 'rgba(43, 144, 143, 0.85)'}}>
                        {props.trucksText.theftSuccess}</h5>
                        <h6>{successMsg}</h6>
                    </div> :
                    errorMsg ?
                    <div style={{margin: '1.5rem'}}>
                            <h6 style={{color: 'red'}}>{
                                props.errorText[errorMsg] ? 
                                props.errorText[errorMsg] : 
                                props.trucksText.theftError
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
        language: state.initLang.language,
        demo: state.authReducer.demo
    };
};
export default connect(mapStateToProps)(EditTruck)