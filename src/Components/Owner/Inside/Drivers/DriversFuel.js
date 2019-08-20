import React from 'react';
import classes from './Drivers.css';
import { connect } from 'react-redux';
import { Collapse, Icon, DatePicker } from 'antd';
import locale_es from 'antd/lib/date-picker/locale/es_ES';
import locale_pl from 'antd/lib/date-picker/locale/pl_PL';
import moment from 'moment';
import FuelChart from '../../../../Containers/Owner/Charts/DriversCharts/FuelChart';

const { RangePicker } = DatePicker;
const { Panel } = Collapse;

const genExtra = () => (
	<Icon
		type="setting"
		onClick={event => {
			event.stopPropagation();
			console.log('extra')
		}}
	/>
);

class DriversFuel extends React.Component {

	state = {
		dateFrom: moment().startOf('month').subtract(1, 'month'),
		dateEnd: moment()
	};

	onDateChange = (dates, dateStrings) => {
		this.setState(prevState => {
			return {
				dateFrom: new Date(dateStrings[0]).getTime(),
				dateEnd: new Date(dateStrings[1]).getTime()
			}
		})
	};

	render() {
		return (
			<div className={classes.Fuel}>
				<Collapse
					defaultActiveKey={['1']}
					expandIconPosition="right"
				>
					<Panel header={this.props.chartText.titleFuel} key="1" extra={genExtra()}>
						<span style={{ marginRight: 10 }}>{this.props.chartText.dateChoice}</span>
						<RangePicker
							locale={this.props.language === 'es' ? locale_es : locale_pl}
							allowClear={false}
							defaultValue={[moment().startOf('month').subtract(1, 'month'),
							moment()]}
							ranges={{
								[this.props.chartText.thisMonth]: [moment().startOf('month'), moment().endOf('month')],
								[this.props.chartText.lastMonth]:
									[moment().startOf('month').subtract(1, 'month'),
									moment().startOf('month').subtract(1, 'day')]
							}}
							onChange={this.onDateChange}
						/>
						<div className={classes.FuelChart}>
							<FuelChart
								dateFrom={new Date(this.state.dateFrom).getTime()}
								dateEnd={new Date(this.state.dateEnd).getTime()}
							/>
							<p>{this.props.chartText.descriptionFuel}</p>
						</div>
					</Panel>
				</Collapse>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		chartText: state.initLang.textOwner.driverCharts,
		language: state.initLang.language
	}
}
export default connect(mapStateToProps)(DriversFuel);