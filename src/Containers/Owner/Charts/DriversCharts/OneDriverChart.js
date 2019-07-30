import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import ApexChart from '../../../../Components/UI/Charts/ApexChart';
import axios from 'axios';
import { Spin, Select } from 'antd';
import moment from 'moment';
import ChartsContext from '../../../../context/charts-context';
const { Option } = Select;

const OneDriverChart = props => {

	const [chartData, setChartData] = useState(
		{
			options: {
				dataLabels: {
					enabled: false
				},
				legend: {
					offsetY: -10
				},
				stroke: {
					width: 1,
					colors: ['red', 'blue'],
					curve: 'smooth'
				},
				xaxis: {
					type: 'datetime',
					categories: [],
				},
				tooltip: {
					x: {
						format: 'dd/MM/yy'
					},
				}
			},
			series: [{
				name: props.chartText.mediaReal,
				data: []
			}, {
				name: props.chartText.mediaRoute,
				data: []
			}],			
			loading: false,
			noData: true
		}
	);

	const { allActiveDrivers } = useContext(ChartsContext);
	const [noData, setNoData] = useState(true);
	const [loading, setLoading] = useState(true);
	const [activeDriversArr, setActiveDriversArr] = useState([]);
	const [activeDriver, setActiveDriver] = useState(null)

	const getDriver = (driverId) => {
		setLoading(true);
		axios.get('/system/oneDriverData?driverId=' + driverId)
			.then((res) => {				
				if (!res.data) {
					setLoading(false);
					setNoData(true);
					return;
				};
				const newCat = res.data.datesArr.map(elem => moment(elem).format('YYYY-MM-DD'));
				const newSeries_0 = res.data.mediaRealArr;
				const newSeries_1 = res.data.mediaRouteArr;
				const updatedSeries = [
					{
						...chartData.series[0],						
						data: newSeries_0
					},
					{
						...chartData.series[1],						
						data: newSeries_1
					}
				];
				const updatedOptions = {
					...chartData.options,
					xaxis: {
						...chartData.options.xaxis,
						categories: newCat
					}
				};
				const updatedChartData = {
					options: updatedOptions,
					series: updatedSeries
				};
				setChartData(updatedChartData);
				setActiveDriver(res.data._id)
				setLoading(false);
				setNoData(false);
			})
	};

	useEffect(() => {
		if (allActiveDrivers.length) {
			setActiveDriversArr(allActiveDrivers.map(driver => {
				return (<Option
					value={driver._id}
					key={driver._id}>
					{driver.driverName}
				</Option>)
			}));
			getDriver(allActiveDrivers[0]._id)
		}
		else { setLoading(false); setNoData(true) }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);	
	
	useEffect(() => {
		const updatedSeries = [
			{
				...chartData.series[0],						
				name: props.chartText.mediaReal
			},
			{
				...chartData.series[1],						
				name: props.chartText.mediaRoute
			}
		];
		setChartData({
			options: chartData.options,
			series: updatedSeries
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.chartText])

	return (
		loading ? <Spin tip="Loading..."></Spin> :
		noData ? <h4 style={{color: '#007bff'}}>{props.chartText.noData}</h4> :
		<>
			<div style={{ textAlign: 'left' }}>
				<span style={{ marginRight: 30 }}>{props.chartText.selectDriver}</span>
				<Select
					defaultValue={activeDriver}
					style={{ width: 280 }}
					onChange={(value) => getDriver(value)}>
					{activeDriversArr}
				</Select>
			</div>
			<ApexChart
				options={chartData.options}
				series={chartData.series}
				type="area"
				height="300"
			/>
		</>
	);
};

const mapStateToProps = state => {
	return {
		chartText: state.initLang.textOwner.oneDriverChart
	}
};

export default connect(mapStateToProps)(OneDriverChart);