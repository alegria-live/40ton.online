import { put, call,delay } from "redux-saga/effects";
import axios from 'axios';
import * as actions from '../actions/index';

export function* authProcessSaga(action) {
    yield put(actions.authInit());
    try {
        const response = yield axios.post('/login', action.data);
        const expiredDate = yield new Date(
            new Date().getTime() + response.data.expiredTime
          );
        yield localStorage.setItem("token", response.data.token);
        yield localStorage.setItem("company", response.data.company);
        yield localStorage.setItem("perm", response.data.perm);
        yield localStorage.setItem("demo", response.data.demo);
        yield localStorage.setItem("expiredDate", expiredDate);
        yield put(actions.authSuccess(response.data));       
        yield put(actions.checkAuthTimeout(response.data.expiredTime));
       
    }
    catch (error) {
        yield put(actions.authFail(error.response.data.error || error.message));
    };
};

export function* checkAuthTimeoutSaga(action) {    
    yield delay(action.data);
    yield put(actions.logoutUser());
};

export function* newPassProcessSaga(action) {
    yield put (actions.authInit());
    try {
        const response = yield axios.put('/api/user/psw', action.data);        
        yield put(actions.newPassSuccess(response.data));
    }
    catch (error) {
        yield put(actions.newPassFail(error.response.data.error || error.message));
    };
};

export function* logoutUserSaga(action) {
    axios.get('/logout');
    yield call([localStorage, "removeItem"], "token");    
    yield call([localStorage, "removeItem"], "company");
    yield call([localStorage, "removeItem"], "demo");
    yield call([localStorage, "removeItem"], "perm");
    yield call([localStorage, "removeItem"], "_csrf");
    yield call([localStorage, "removeItem"], "env");
    yield call([localStorage, "removeItem"], "expiredDate");
    yield put(actions.authLogout());
  };

