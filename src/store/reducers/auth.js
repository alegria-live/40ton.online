import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    error: null,
    loading: false,
    token: null,
    company: null,
    perm: null,
    newPassEmail: null,
    newPassError: null,
    demo: false
};

const authStart = (state, action) => {  
   return updateObject(state, {error: null, loading: true});
};

const authFail = (state, action) => {
    return updateObject(state, {error: action.error, loading: false})
};

const authSuccess = (state, action) => {   
    return updateObject(state, {
        token: action.data.token,
        company: action.data.company,
        perm: Number(action.data.perm),
        demo: action.data.demo,
        loading: false})
};

const authLogout = (state, action) => {   
    return updateObject(state, {token: null, company: null, demo: true})
};

const clearError = (state, action) => {
    return updateObject(state, {error: null, newPassError: null, newPassEmail: null})
};

const newPassSuccess = (state, action) => {
    return updateObject(state, {newPassEmail: action.data, loading: false, newPassError: null})
};

const newPassError = (state, action) => {
    return updateObject(state, {newPassError: action.error, loading: false})
};

const reducers = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_INIT: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_CLEAR_ERROR: return clearError(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.NEW_PASS_SUCCESS: return newPassSuccess(state, action);
        case actionTypes.NEW_PASS_FAIL: return newPassError(state, action);
        default: return state;
    };
};
export default reducers;