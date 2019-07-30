import React, { useEffect, useState } from 'react';
import RoutesTableData from '../../../../Containers/Owner/RoutesTableData/RoutesTableData';
import { Table } from 'antd';
import { connect } from 'react-redux';

const RouteTable = props => {
	const [data, setData] = useState([]);
	useEffect(() => {
		if (props.routes !== undefined && props.routes.length) {
			const routesSorted = props.routes.sort((prev, next) => {
				return next._id - prev._id
			});
			setData(
				routesSorted.map(route => {
					return {
						...route,
						dtStop: (new Date(route.dtStop)).toLocaleDateString(),
						type: checkAction(route.type),
						full: route.full ? props.text.yes : route.type === 3 ? props.text.no : '-',
						tonIn: route.type === 1 ? route.tonOut : '-',
						tonOut: route.type === 2 ? route.tonIn - route.tonOut : '-',
						key: route['_id'],
						litres: route.type === 3 ? route.litres : '-',
						comments: ''
					}
				})
			)
		}// eslint-disable-next-line
	}, [props.routes]);
	
	const checkAction = (val) => {
		switch (val) {
			case (1): return props.text.loading;
			case (2): return props.text.unloading;
			case (3): return props.text.fuel;
			case (4): return props.text.periodEnd;
			case (5): return props.text.driversChange;
			default: return ''
		}
	};

	const columns = [
		{
			title: props.text.date,
			dataIndex: 'dtStop',
			width: 150,
		},
		{
			title: props.text.driver,
			dataIndex: 'driverId',
			width: 250,
		},
		{
			title: props.text.action,
			dataIndex: 'type',
			width: 150,
		},
		{
			title: props.text.country,
			dataIndex: 'country',
			width: 150,
		},
		{
			title: props.text.zip,
			dataIndex: 'postal',
			width: 100,
		},
		{
			title: props.text.loading,
			dataIndex: 'tonIn',
			width: 90,
		},
		{
			title: props.text.unloading,
			dataIndex: 'tonOut',
			width: 90,
		},
		{
			title: props.text.fuel,
			dataIndex: 'litres',
			width: 100,
		},
		{
			title: props.text.full,
			dataIndex: 'full',
			width: 90,
		},
		{
			title: props.text.count,
			dataIndex: 'kmStop',
			width: 90,
		},
		{
			title: props.text.comments,
			dataIndex: 'comments'
		},
	];

	return (
		<Table
			columns={columns}
			dataSource={data}
			bordered
			loading={props.isLoading}
			size="small"
			pagination={{ pageSize: 20 }}
			title={() => (<RoutesTableData />)}
			footer={() => props.text.registration + ' ' + (props.truckId ? props.truckId: "")}
		/>
	);
};
const mapStateToProps = state => {
	return {
		routes: state.truckRoutes.truckRoutes,
		isLoading: state.truckRoutes.isLoading,
		truckId: state.truckRoutes.truckId,
		text: state.initLang.textOwner.routes
	}
};
export default connect(mapStateToProps)(RouteTable);