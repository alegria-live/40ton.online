import * as actionTypes from './actionTypes';

export const truckRoutesInit = () => {
    return {
        type: actionTypes.TRUCK_ROUTES_INIT
    };
};
export const truckRoutesProcess = (truckId, from, end) => {
    return {
        type: actionTypes.TRUCK_ROUTES_PROCESS,
        truckId,
        from,
        end
    };
};
export const truckRoutesSuccess = truck => {
    return {
        type: actionTypes.TRUCK_ROUTES_SUCCESS,
        truck
    };
};
export const truckRoutesFail = error => {
    return {
        type: actionTypes.TRUCK_ROUTES_FAIL,
        error
    };
};