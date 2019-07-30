import React, { useContext, useEffect, useState } from 'react';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import ChartsContext from '../../../context/charts-context';
import { Select } from 'antd';

const { Option } = Select;

const RoutesTableData = props => {
    const { allActiveTrucks } = useContext(ChartsContext);
    const [activeTrucksArr, setActiveTrucksArr] = useState([]);

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
        // eslint-disable-next-line
    }, []);
    return (
        <Select
            defaultValue={props.text.selectTruck}
            style={{ width: 280, margin: 15 }}
            onChange={(value) => props.getTruck(value)}>
            {activeTrucksArr}
        </Select>
    )
};
const mapStateToProps = state => {
    return {
        text: state.initLang.textOwner.routes
    }
};
const mapDispatchToProps = dispatch => {
    return {
        getTruck: (truckId) => dispatch(actions.truckRoutesProcess(truckId))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(RoutesTableData);

