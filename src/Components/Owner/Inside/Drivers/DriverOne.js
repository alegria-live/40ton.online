import React from 'react';
import classes from './Drivers.css';
import { connect } from 'react-redux';
import { Collapse } from 'antd';
import OneDriverChart from '../../../../Containers/Owner/Charts/DriversCharts/OneDriverChart';

const { Panel } = Collapse;

class DriverOne extends React.Component {

	render() {
		return (
			<div className={classes.Fuel}>
				<Collapse
					defaultActiveKey={['1']}
					expandIconPosition="right">
					<Panel header={this.props.chartText.title} key="1">
						<div className={classes.FuelChart}>
							<OneDriverChart />
							<p>{this.props.chartText.description}</p>
						</div>
					</Panel>
				</Collapse>
			</div>
		);
	}
};
const mapStateToProps = state => {
	return {
		chartText: state.initLang.textOwner.oneDriverChart,
		language: state.initLang.language
	}
};
export default connect(mapStateToProps)(DriverOne);