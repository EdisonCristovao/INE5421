import {
    MAKE_NEW_LANGUAGE,
    CHANGE_SELECTED_LANGUAGE,
    CHANGE_REG_EXPRESSION,
    CHANGE_REG_GRAMMA
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
    console.log(action.payload)
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
        case CHANGE_REG_EXPRESSION:
            state.listLanguages[state.selectedLanguage].expression = action.payload;
            return {
                ...state
            }
        case CHANGE_REG_GRAMMA:
            state.listLanguages[state.selectedLanguage].grammar = action.payload;
            return {
                ...state
            }
        default:
            return state;
    }
};

export default languages;
