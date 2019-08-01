import React, { useEffect, useState, useRef } from 'react';
import RoutesTableData from '../../../../Containers/Owner/RoutesTableData/RoutesTableData';
import { Table, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import ReactToPrint from 'react-to-print';

const RouteTable = props => {
	const [data, setData] = useState([]);
	const componentRef = useRef();

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
						tonIn: route.type === 1 ? route.tonOut + ' t.': '-',
						tonOut: route.type === 2 ? (route.tonIn - route.tonOut) + ' t.' : '-',
						key: route['_id'],
						litres: route.type === 3 ? route.litres + ' l.': '-',
						comments: ''
					}
				})
			)
		}
		else {
			setData([]);
		}
		// eslint-disable-next-line
	}, [props.routes, props.text]);
	
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
		<div style={{margin: 30}} ref={componentRef}>
			<Table			
			columns={columns}
			dataSource={data}
			bordered
			loading={props.isLoading}
			size="middle"
			pagination={false}
			title={() => (
				<div style={{display:'flex', justifyContent:'space-between'}}>
					<div>
						<RoutesTableData />
					</div>
					<ReactToPrint
                    	trigger={() => <Button><Icon type="printer" /></Button>}
                    	content={() => componentRef.current}
               		/>
				</div>	
			)}
			footer={() => props.text.registration + ' ' + (props.truckId ? props.truckId: "")}
		/>
		</div>
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