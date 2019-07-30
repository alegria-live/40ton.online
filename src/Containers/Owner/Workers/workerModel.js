import axios from 'axios';
export class Worker {
    constructor({ id, dataSet, newData }) {
        this.workerData = {
            id,
            dataSet,
            newData
        }
    };    
    addWorker(success, error, isLoading) {
        isLoading(true);
        axios.post('api/workers/addWorker', this.workerData)
            .then(res => { success(res.data); isLoading(false); })
            .catch(e => { error(e.response.data.error.toString()); isLoading(false) });
    };
    updateWorker(success, error, isLoading, getWorkers) {
        isLoading(true);
        axios.put('/api/workers/editWorker', this.workerData)
            .then(res => { success(res.data); isLoading(false); getWorkers() })
            .catch(e => { error(e.response.data.toString()); isLoading(false) });
    };
    deleteWorker(success, error, isLoading, getWorkers) {
        isLoading(true);
        axios.delete('/api/workers/delWorker', {data: this.workerData} )
            .then(res => { success(res.data); isLoading(false); getWorkers() })
            .catch(e => { error(e.message); isLoading(false) });
    };
}; 