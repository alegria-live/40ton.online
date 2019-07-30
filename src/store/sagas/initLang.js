import { put } from "redux-saga/effects";
import axios from "axios";
import * as actions from "../actions";

export function* initLanguageSaga(action) {

	yield put(actions.resetLanguage(action.language));
	try {
		const response = yield axios.get(`/${action.language}`);
		yield localStorage.setItem("language", action.language);
		yield localStorage.setItem("_csrf", response.data._csrf);
		yield localStorage.setItem("env", response.data.env);
		response.data.textHome = yield require(`../../text-data/${action.language}/home.json`);
		response.data.textOwner = yield require(`../../text-data/${action.language}/owner.json`);
		response.data.language = yield action.language;
		yield put(actions.setLanguage(response.data));
	}
	catch (error) {
		yield put(actions.setLanguageFail(error));
	};
};
export function* autoInitLangSaga() {
	const language = yield localStorage.getItem("language");
	if (language) {
		yield put(actions.initLanguage(language));

		const token = yield localStorage.getItem("token");
		const company = yield localStorage.getItem("company");
		const perm = yield localStorage.getItem("perm");
		const demo = yield localStorage.getItem("demo") === 'true';
		const expiredDate = yield new Date(
			localStorage.getItem("expiredDate")
		);		
		if (token && company && perm && expiredDate && !demo ) {
			if (expiredDate <= new Date()) {					
				yield put(actions.logoutUser())
			}
			else {				
				yield put(actions.authSuccess({ token, company, perm, demo }));
				yield put(actions.checkAuthTimeout(expiredDate.getTime() - new Date().getTime()))
			}
		}
	}
}