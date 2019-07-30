import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    error: null,
    loading: false,
    registerEmail: null,
    isActivated: false
};

const registerStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
};
const registerError = (state, action) => {
    return updateObject(state, {error: action.error, loading: false})
};
const registerSuccess = (state, action) => {
    return updateObject(state, {error: null, loading: false, registerEmail: action.data})
};
const registerClearError = (state, action) => {
    return updateObject(state, {error: null, loading: false, registerEmail: null, isActivted: false})
};
const activateSuccess = (state, action) => {
    return updateObject(state, {error: null, loading: false, isActivated: action.data})
};

const reducers = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.REGISTER_INIT: return registerStart(state, action);
        case actionTypes.REGISTER_SUCCESS: return registerSuccess(state, action);
        case actionTypes.REGISTER_FAIL: return registerError(state, action);
        case actionTypes.REGISTER_CLEAR_ERROR: return registerClearError(state, action);
        case actionTypes.ACTIVATE_SUCCESS: return activateSuccess(state, action);
        default: return state;
    };
};
export default reducers;