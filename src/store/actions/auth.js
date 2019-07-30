import * as actionTypes from './actionTypes';

export const authInit = () => {
    return {
        type: actionTypes.AUTH_INIT
    };
};
export const authProcess = data => {       
    return {
        type: actionTypes.AUTH_PROCESS,
        data
    } 
};
export const authSuccess = data => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        data
    }
};
export const authClearError = () => {
    return {
        type: actionTypes.AUTH_CLEAR_ERROR
    }
};
export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    };
};
export const logoutUser = () => {
    return{
        type: actionTypes.LOGOUT_USER
    }
}
export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};
export const checkAuthTimeout = data => {
    return {
        type: actionTypes.CHECK_AUTH_TIMEOUT,
        data
    }
}
export const newPassProcess = data => {
    return {
        type: actionTypes.NEW_PASS_PROCESS,
        data
    };
};
export const newPassSuccess = data => {
    return {
        type: actionTypes.NEW_PASS_SUCCESS,
        data
    };
};
export const newPassFail = error => {
    return {
        type: actionTypes.NEW_PASS_FAIL,
        error
    };
};
