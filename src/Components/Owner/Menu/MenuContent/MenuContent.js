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
		setShowTheft,
		setShowAddWorker,
		setShowEditWorker,
		setShowEditCompany,
		setShowPayments,
		setShowPhoneInstruction,
		setShowManualRoutes
	} = useContext(MenuContext);
	
	return (
		<div className='container'>
			<Button type="primary" onClick={() => setCollapsed(!collapsed)} style={{ marginBottom: 20 }}>
				<Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
			</Button>
			<Menu
				defaultSelectedKeys={['1']}				
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
					<Menu.Item onClick={() => setShowTheft(true)} key="6">{props.textMenu.theft}</Menu.Item>
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
					<Menu.Item onClick={() => setShowAddWorker(true)} key="7">{props.textMenu.addWorker}</Menu.Item>
					<Menu.Item onClick={() => setShowEditWorker(true)} key="8">{props.textMenu.editWorker}</Menu.Item>
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
					<Menu.Item onClick={() => setShowEditCompany(true)} key="9">{props.textMenu.editCompany}</Menu.Item>
					<Menu.Item onClick={() => setShowPayments(true)} key="10">{props.textMenu.payments}</Menu.Item>
					<Menu.Item onClick={() => {} } key="11">{props.textMenu.orders}</Menu.Item>
					<Menu.Item onClick={() => {}} key="12">{props.textMenu.invoices}</Menu.Item>
				</SubMenu>
				<SubMenu
					key="instructions"
					title={
						<span>
							<Icon type="info-circle" />
							<span>{props.textMenu.instructions}</span>
						</span>
					}
				>					
					<Menu.Item onClick={() => {} } key="13">
						<a 
							href={props.textMenu.systemInstructionLink}
							target='_blanc'>{props.textMenu.systemInstruction}
						</a>
					</Menu.Item>
					<Menu.Item onClick={() => setShowPhoneInstruction(true)} key="14">{props.textMenu.driverInstruction}</Menu.Item>
				</SubMenu>
				<SubMenu
					key="routes"
					title={
						<span>
							<Icon type="car" />
							<span>{props.textMenu.routes}</span>
						</span>
					}
				>
					<Menu.Item onClick={() => setShowManualRoutes(true)} key="15">{props.textMenu.manualRoutes}</Menu.Item>
				</SubMenu>
			</Menu>
		</div>
	);
}
const mapStateToProps = state => {
	return {
		textMenu: state.initLang.textOwner.userMenu		
	}
}
export default connect(mapStateToProps)(MenuContent)