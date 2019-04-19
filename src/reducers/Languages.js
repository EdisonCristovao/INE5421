import {
    MAKE_NEW_LANGUAGE,
    CHANGE_SELECTED_LANGUAGE
} from 'constants/ActionTypes';
import uuidv4 from 'uuid/v4';
import InitialState from './states/language.state'


function _makeNewLanguage(name) {
    return {
        id: uuidv4(),
        name: name,
        empty: true,
        valid: true,
        grammar: undefined,
        expression: undefined,
        fsm: undefined,
        userSentences: [],
        enumerationLength: 5,
    };
}

const languages = (state = InitialState, action) => {
    switch (action.type) {
        case MAKE_NEW_LANGUAGE:
            const newLanguage = _makeNewLanguage(action.payload)
            const newList = [...state.listLanguages, newLanguage]
            return {
                ...state,
                listLanguages: newList,
                selectedLanguage: newList.length - 1
            }
        case CHANGE_SELECTED_LANGUAGE:
            return {
                ...state,
                selectedLanguage: action.payload
            }
        default:
            return state;
    }
};

export default languages;
