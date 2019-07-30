import { put } from "redux-saga/effects";
import axios from 'axios';
import * as actions from '../actions/index';

export function* getTruckRoutesSaga(action) {
    yield put (actions.truckRoutesInit());
    try {
        const response = yield axios.get('/system/truckRoutes?truckId='+action.truckId);
        yield put(actions.truckRoutesSuccess(response.data));
    }
    catch (error) {
        yield put(actions.truckRoutesFail(error.response.data.error || error.message));
    };
};