import React from 'react';
const menuContext = React.createContext({
    showAddDriver: false,
    setShowAddDriver: () => {},
    showEditDriver: false,
    setShowEditDriver: () => {},
    showAddTruck: false,
    setShowAddTruck: () => {},
    showEditTruck: false,
    setShowEditTruck: () => {},
    showEditCompny: false,
    setShowEditCompany: () => {},
    showPayments: false,
    setShowPayments: () => {},
    showOrders: false,
    setShowOrders: () => {},
    showInvoices: false,
    setShowInvoices: () => {},
    showPhoneInstruction: false,
    setShowPhoneInstruction: () => {}
});
export default menuContext;