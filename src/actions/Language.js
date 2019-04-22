export const MAKE_NEW_LANGUAGE = 'MAKE_NEW_LANGUAGE';
export const CHANGE_SELECTED_LANGUAGE = 'CHANGE_SELECTED_LANGUAGE';
export const CHANGE_REG_EXPRESSION = 'CHANGE_REG_EXPRESSION';
export const CHANGE_REG_GRAMMA = 'CHANGE_REG_GRAMMA';

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
