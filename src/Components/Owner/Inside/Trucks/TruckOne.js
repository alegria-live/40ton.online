import React from 'react';
import classes from './Trucks.css';
import { connect } from 'react-redux';
import { Collapse } from 'antd';
import OneTruckChart from '../../../../Containers/Owner/Charts/TrucksCharts/OneTruckChart';

const { Panel } = Collapse;

class TruckOne extends React.Component {

	render() {
		return (
			<div className={classes.Fuel}>
				<Collapse
					defaultActiveKey={['1']}
					expandIconPosition="right">
					<Panel header={this.props.chartText.title} key="1">
						<div className={classes.FuelChart}>
							<OneTruckChart />
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
		chartText: state.initLang.textOwner.oneTruckChart,
		language: state.initLang.language
	}
};
export default connect(mapStateToProps)(TruckOne);