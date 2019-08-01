import React from 'react';
import {connect} from 'react-redux';
import DriversFuel from './Drivers/DriversFuel';
import DriversEfficiency from './Drivers/DriversEfficiency';
import DriverOne from './Drivers/DriverOne';
import TrucksFuel from './Trucks/TrucksFuel';
import TrucksEfficiency from './Trucks/TrucksEfficiency';
import TruckOne from './Trucks/TruckOne';
import RoutesTable from './RoutesTable/RoutesTable';
import { Divider } from 'antd';

const Inside = props => (
	<div className= 'container-fluid mx-auto p-5' style={{height: '92vh', overflowY: 'scroll'}}>
		<Divider>{props.titleText.driversTitle}</Divider>
		<div className="row mx-auto">
			<div className="col-md-12 col-lg-6 d-flex justify-content-center">
				<DriversFuel />
			</div>
			<div className="col-md-12 col-lg-6 d-flex justify-content-center">
				<DriversEfficiency />
			</div>
		</div>
		<div className="row mx-auto pt-5 mb-5">
			<div className="col-xs-12 col-sm-12 mx-auto">
				<DriverOne />
			</div>			
		</div>
		<Divider>{props.titleText.trucksTitle}</Divider>
		<div className="row mx-auto mt-4">
			<div className="col-md-12 col-lg-6 d-flex justify-content-center">
				<TrucksFuel />
			</div>
			<div className="col-md-12 col-lg-6 d-flex justify-content-center">
				<TrucksEfficiency />
			</div>
		</div>
		<div className="row mx-auto pt-5 mb-5">
			<div className="col-xs-12 col-sm-12 mx-auto">
				<TruckOne />
			</div>			
		</div>
		<Divider>{props.titleText.routesTitle}</Divider>
		<div className="row mx-auto mb-5">
			<div className="col-xs-12 col-sm-12 mx-auto">
				<RoutesTable />
			</div>			
		</div>
	</div>
);
const mapStateToProps = state => {
	return {
		titleText : state.initLang.textOwner.inside
	}
}
export default connect(mapStateToProps)(Inside);