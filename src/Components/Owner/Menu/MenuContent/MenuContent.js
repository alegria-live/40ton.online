import React, { useState, useContext } from 'react';
import { connect } from "react-redux";
import { Menu, Icon, Button } from 'antd';
import MenuContext from '../../../../context/menu-context';
const { SubMenu } = Menu;

const MenuContent = props => {

	const [collapsed, setCollapsed] = useState(false);
	const {
		setShowAddDriver,
		setShowEditDriver,
		setShowAddTruck,
		setShowEditTruck,
		setShowAddWorker,
		setShowEditWorker,
		setShowEditCompany,
		setShowPayments
	} = useContext(MenuContext);

	return (
		<div className='container'>
			<Button type="primary" onClick={() => setCollapsed(!collapsed)} style={{ marginBottom: 20 }}>
				<Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
			</Button>
			<Menu
				defaultSelectedKeys={['1']}
				// defaultOpenKeys={['sub1']}
				mode="vertical"
				theme="dark"
				inlineCollapsed={collapsed}
			>
				<Menu.Item key="1" style={{ cursor: "none" }}>
					<Icon type="menu" />
					<span>{props.textMenu.menuName}</span>
				</Menu.Item>
				<SubMenu
					key="drivers"
					title={
						<span>
							<Icon type="user-add" />
							<span>{props.textMenu.drivers}</span>
						</span>
					}
				>
					<Menu.Item onClick={() => setShowAddDriver(true)} key="2">{props.textMenu.addDriver}</Menu.Item>
					<Menu.Item onClick={() => setShowEditDriver(true)} key="3">{props.textMenu.editDriver}</Menu.Item>
				</SubMenu>
				<SubMenu
					key="trucks"
					title={
						<span>
							<Icon type="dashboard" />
							<span>{props.textMenu.trucks}</span>
						</span>
					}
				>
					<Menu.Item onClick={() => setShowAddTruck(true)} key="4">{props.textMenu.addTruck}</Menu.Item>
					<Menu.Item onClick={() => setShowEditTruck(true)} key="5">{props.textMenu.editTruck}</Menu.Item>
				</SubMenu>
				<SubMenu
					key="workers"
					title={
						<span>
							<Icon type="usergroup-add" />
							<span>{props.textMenu.workers}</span>
						</span>
					}
				>
					<Menu.Item onClick={() => setShowAddWorker(true)} key="6">{props.textMenu.addWorker}</Menu.Item>
					<Menu.Item onClick={() => setShowEditWorker(true)} key="7">{props.textMenu.editWorker}</Menu.Item>
				</SubMenu>
				<SubMenu
					key="company"
					title={
						<span>
							<Icon type="tool" />
							<span>{props.textMenu.company}</span>
						</span>
					}
				>
					<Menu.Item onClick={() => setShowEditCompany(true)} key="8">{props.textMenu.editCompany}</Menu.Item>
					<Menu.Item onClick={() => setShowPayments(true)} key="9">{props.textMenu.payments}</Menu.Item>
				</SubMenu>
			</Menu>
		</div>
	);
}
const mapStateToProps = state => {
	return {
		textMenu: state.initLang.textOwner.userMenu,
	}
}
export default connect(mapStateToProps)(MenuContent)