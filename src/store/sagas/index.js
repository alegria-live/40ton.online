import { takeEvery } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import {initLanguageSaga, autoInitLangSaga} from './initLang';
import {authProcessSaga, newPassProcessSaga, logoutUserSaga, checkAuthTimeoutSaga} from './auth';
import {registerProcessSaga, activateProcessSaga} from './register';
import {getTruckRoutesSaga} from './truckRoutes'

export function* watchInitLang () {
    yield takeEvery(actionTypes.AUTO_INIT_LANG, autoInitLangSaga)
    yield takeEvery(actionTypes.INIT_LANGUAGE, initLanguageSaga);
};
export function* watchAuth () {
    yield takeEvery(actionTypes.AUTH_PROCESS, authProcessSaga);
    yield takeEvery(actionTypes.NEW_PASS_PROCESS, newPassProcessSaga);
    yield takeEvery(actionTypes.LOGOUT_USER, logoutUserSaga);
    yield takeEvery(actionTypes.CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga);
};
export function* watchRegister () {
    yield takeEvery(actionTypes.REGISTER_PROCESS, registerProcessSaga);
    yield takeEvery(actionTypes.ACTIVATE_PROCESS, activateProcessSaga);
};
export function* watchTruckRoutes () {
    yield takeEvery(actionTypes.TRUCK_ROUTES_PROCESS, getTruckRoutesSaga);
};
