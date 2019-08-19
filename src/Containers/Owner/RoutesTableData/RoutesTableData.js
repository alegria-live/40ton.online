import React, { useEffect, useState } from 'react';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import { Select, DatePicker } from 'antd';
import locale_es from 'antd/lib/date-picker/locale/es_ES';
import locale_pl from 'antd/lib/date-picker/locale/pl_PL';
import moment from 'moment';
import Axios from 'axios';

const { Option } = Select;
const { RangePicker } = DatePicker;

const RoutesTableData = props => {
    
    const [activeTrucksArr, setActiveTrucksArr] = useState([]);
    const [truckId, setTruckId] = useState(null);
    const [from, setFrom] = useState(new Date(moment().startOf('month').subtract(1, 'month')).getTime());
    const [end, setEnd] = useState(new Date(moment()).getTime());

    useEffect(() => {
        Axios.get('/system/allTrucks')
        .then(res => {
            if (res.data.length) {
                setActiveTrucksArr(res.data.map(truck => {
                    if(!truck.routesLength) return null;
                    return (<Option
                        value={truck._id}
                        key={truck._id}>
                        {truck._id}
                    </Option>)
                }));
            }
        })
        .catch(e => console.log(e.message.data))
        
        // eslint-disable-next-line
    }, []);

    const changeTruckHandler = truckId => {
        setTruckId(truckId);
        props.getTruck(truckId, from, end)
    };

    const changeDatesHandler = (dates, dateStrings) => {
        const fromPicker = new Date(dateStrings[0]).getTime();
        const endPicker = new Date(dateStrings[1]).getTime()       
        setFrom(fromPicker);
        setEnd( endPicker);
        props.getTruck(truckId, fromPicker, endPicker)
    };

    return (
        <>  
            <span>{ props.text.selectTruck }</span>
            <Select
                defaultValue="--------------------------------------"
                style={{ width: 280, margin: 15 }}
                onChange={(value) => changeTruckHandler(value)}>
                {activeTrucksArr}
            </Select>
            <span style={{margin:'0 15px'}}>{ props.text.dateChoice }</span>
            <RangePicker
                locale={props.language === 'es' ? locale_es : locale_pl}
                allowClear={false}
                disabled={!truckId}
                defaultValue={[
                    moment().startOf('month').subtract(1, 'month'),
                    moment()
                ]}
                ranges={{
                    [props.text.thisMonth]: [moment().startOf('month'), moment().endOf('month')],
                    [props.text.lastMonth]:
                        [moment().startOf('month').subtract(1, 'month'),
                        moment().startOf('month').subtract(1, 'day')]
                }}
                onChange={changeDatesHandler}
            />
        </>
    )
};
const mapStateToProps = state => {
    return {
        text: state.initLang.textOwner.routes,
        language: state.initLang.textHome.language
    }
};
const mapDispatchToProps = dispatch => {
    return {
        getTruck: (truckId, from, end) => dispatch(actions.truckRoutesProcess(truckId, from, end))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(RoutesTableData);

