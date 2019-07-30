import * as actionTypes from './actionTypes';

export const autoInitLang = () => {
    return {
        type: actionTypes.AUTO_INIT_LANG
    };
};

export const initLanguage = lang => {
    return {
        type: actionTypes.INIT_LANGUAGE,
        language: lang
    };
};

export const resetLanguage = language => {
    return {
        type: actionTypes.RESET_LANGUAGE,
        language
    };
};

export const setLanguage = data => {
    return {
        type: actionTypes.SET_LANGUAGE,
        data
    };
};

export const setLanguageFail = error => {
    return {
        type: actionTypes.SET_LANGUAGE_FAILED,
        error
    };
};