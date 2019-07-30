import { put } from "redux-saga/effects";
import axios from 'axios';
import * as actions from '../actions/index';

export function* registerProcessSaga(action) {
    yield put (actions.registerInit());
    try {
        const response = yield axios.post('/api/user', action.data);        
        yield put(actions.registerSuccess(response.data));
    }
    catch (error) {
        yield put(actions.registerFail(error.response.data.error || error.message));
    };
};
export function* activateProcessSaga(action) {
    
    yield put (actions.registerInit());
    try {
        const response = yield axios.put('/activation', action.data);
        yield put(actions.activateSuccess(response.data));
    }
    catch (error) {
        yield put(actions.registerFail(error.response.data.error || error.message));
    };
};