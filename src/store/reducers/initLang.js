import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: null,
    language: null,
    _csrf:'',
    env:'',
    textHome: {
        headerSlogan: '',
        navHeader: []
    },
    textOwner: {},
    textHomeInside: {}
};

const resetLanguage = (state, action) => {
    return {
        ...state,
        language: action.language
    };
}
const setLanguage = (state, action) => {
    const updatedState = action.data
    return {
        ...state,
        ...updatedState
    }
};

const setLanguageFailed = (state, action) => {
    return {
        ...state,
        error: action.error
    }
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_LANGUAGE: return setLanguage( state, action );
        case actionTypes.RESET_LANGUAGE: return resetLanguage( state, action );
        case actionTypes.SET_LANGUAGE_FAILED: return setLanguageFailed(state, action);
        default: return state;
    };
};

export default reducer;
