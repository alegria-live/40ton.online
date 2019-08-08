import axios from 'axios';
export class Truck {
    constructor({ id, Truck, newData }) {
        this.truckData = {
            id,
            Truck,
            newData
        }
    };    
    addTruck(success, error, isLoading) {
        isLoading(true);
        axios.post('/system/addTruck', this.truckData)
            .then(res => { success(res.data); isLoading(false); })
            .catch(e => { error(e.response.data.toString()); isLoading(false) });
    };
    updateTruck(success, error, isLoading, getTrucks) {
        isLoading(true);
        axios.put('/system/update', this.truckData)
            .then(res => { success(res.data); isLoading(false); getTrucks() })
            .catch(e => { error(e.response.data.toString()); isLoading(false) });
    };
    deleteTruck(success, error, isLoading, getTrucks) {
        isLoading(true);
        axios.delete('/system/update', {data: this.truckData} )
            .then(res => { success(res.data); isLoading(false); getTrucks() })
            .catch(e => { error(e.response.data.toString()); isLoading(false) });
    };
}; 