import * as actionTypes from './actionTypes';

export const registerInit = () => {
    return {
        type: actionTypes.REGISTER_INIT
    };
};
export const registerProcess = data => {
    return {
        type: actionTypes.REGISTER_PROCESS,
        data
    };
};
export const registerSuccess = data => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        data
    };
};
export const registerFail = error => {
    return {
        type: actionTypes.REGISTER_FAIL,
        error
    };
};
export const registerClearError = () => {
    return {
        type: actionTypes.REGISTER_CLEAR_ERROR
    };
};
export const activateProcess = data => {
    return {
        type: actionTypes.ACTIVATE_PROCESS,
        data
    };
};
export const activateSuccess = data => {
    return {
        type: actionTypes.ACTIVATE_SUCCESS,
        data
    };
};