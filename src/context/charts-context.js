import React from 'react';
const chartContext = React.createContext({
    allActiveDrivers: {},
    getActiveDrivers: () => {},
    allActiveTrucks: {},
    getActiveTrucks: () => {}
});
export default chartContext;