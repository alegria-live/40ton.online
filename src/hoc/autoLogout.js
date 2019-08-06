import React from 'react';
import {Modal} from 'antd';
import {countDownModal} from '../shared/utility';
import * as actions from '../store/actions';

export default function (WrappedComponent) {	
	
	return class extends React.Component {

		state = { warningTime: 1000 * 60 * 30 };

		componentDidMount() {
			this.events = [
				'load',
				'mousemove',
				'mousedown',
				'click',
				'scroll',
				'keypress'
			];
			this.events.forEach(e => window.addEventListener(e, this.resetTimeout))
			this.setTimeout();		
		};

		resetTimeout = () => {
			this.clearTimeoutFunc();
			this.setTimeout();		
		};

		setTimeout = () => {
			this.warnTimeout = setTimeout(() => countDownModal(15, Modal, this.props.dispatch, actions,
				this.props.textHome.autoLogout),
				this.state.warningTime);			
		};

		clearTimeoutFunc = () => {
			if (this.warnTimeout) clearTimeout(this.warnTimeout);			
		};

		render() {
			return (<WrappedComponent {...this.props} />);
		}
	}	
}