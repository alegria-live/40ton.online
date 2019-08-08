import axios from 'axios';
export class Driver {
    constructor({ id, Driver, newData }) {
        this.driverData = {
            id,
            Driver,
            newData
        }
    };    
    addDriver(success, showInstruction, error, isLoading) {
        isLoading(true);
        axios.post('/system/addDriver', this.driverData)
            .then(res => { success(res.data); showInstruction(true); isLoading(false); })
            .catch(e => { error(e.response.data.toString()); isLoading(false) });
    };
    updateDriver(success, error, isLoading, getDrivers) {
        isLoading(true);
        axios.put('/system/update', this.driverData)
            .then(res => { success(res.data); isLoading(false); getDrivers() })
            .catch(e => { error(e.response.data.toString()); isLoading(false) });
    };
    deleteDriver(success, error, isLoading, getDrivers) {
        isLoading(true);
        axios.delete('/system/update', {data: this.driverData} )
            .then(res => { success(res.data); isLoading(false); getDrivers() })
            .catch(e => { error(e.response.data.toString()); isLoading(false) });
    };
}; 