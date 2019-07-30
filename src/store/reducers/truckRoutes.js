import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    error: null,
    isLoading: false,
    loaded: false,
    truckId: null,
    truckRoutes: []
};

const routesTruckInit = (state, action) => {
    return updateObject(state, {isLoading: true});
}
const routesTruckSuccess = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        truckId: action.truck._id,
        truckRoutes: action.truck.routes,
        loaded: true
    });
}
const routesTruckFail = (state, action) => {
   
    return updateObject(state, {error: action.error, isLoading: false});
}

const reducers = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.TRUCK_ROUTES_INIT: return routesTruckInit(state, action);
        case actionTypes.TRUCK_ROUTES_SUCCESS: return routesTruckSuccess(state, action);
        case actionTypes.TRUCK_ROUTES_FAIL: return routesTruckFail(state, action);
        
        default: return state;
    };
};
export default reducers;