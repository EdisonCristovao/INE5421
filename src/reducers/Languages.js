import {
    MAKE_NEW_LANGUAGE
} from 'constants/ActionTypes';

const initialSettings = {
    listLanguages: [
        {
            name: 'binários sem 000',
            empty: true,
            valid: true,
            grammar: undefined,
            expression: undefined,
            fsm: undefined,
            userSentences: [],
            enumerationLength: 5
        },
        {
            name: 'iniciam com a mesma letra',
            empty: true,
            valid: true,
            grammar: undefined,
            expression: undefined,
            fsm: undefined,
            userSentences: [],
            enumerationLength: 5
        },
        {
            name: 'Numero par de 1',
            empty: true,
            valid: true,
            grammar: undefined,
            expression: undefined,
            fsm: undefined,
            userSentences: [],
            enumerationLength: 5
        },
    ],
    selectedLanguage: 0,

};


function _makeNewLanguage(name) {
    return {
        // id: uuidv4(),
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

const languages = (state = initialSettings, action) => {
    switch (action.type) {
        case MAKE_NEW_LANGUAGE:
            return {
                ...state,
                listLanguages: [...state.listLanguages, _makeNewLanguage(action.payload)]
            }
        default:
            return state;
    }
};

export default languages;
