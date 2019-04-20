import {
    MAKE_NEW_LANGUAGE,
    CHANGE_SELECTED_LANGUAGE,
    CHANGE_REG_EXPRESSION,
    CHANGE_REG_GRAMMA
} from 'constants/ActionTypes';


//LANGUAGES
export function makeNewLanguage(name) {
    return { type: MAKE_NEW_LANGUAGE, payload: name };
}

export function changeSelectedLanguage(id) {
    return { type: CHANGE_SELECTED_LANGUAGE, payload: id };
}

//LANGUAGE
export function changeRegExpression(regExpression) {
    return { type: CHANGE_REG_EXPRESSION, payload: regExpression };
}

export function changeRegGramma(regGramma) {
    return { type: CHANGE_REG_GRAMMA, payload: regGramma };
}
