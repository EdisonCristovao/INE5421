import {
    MAKE_NEW_LANGUAGE,
    CHANGE_SELECTED_LANGUAGE
} from 'constants/ActionTypes';

export function makeNewLanguage(name) {
    return { type: MAKE_NEW_LANGUAGE, payload: name };
}

export function changeSelectedLanguage(id) {
    return { type: CHANGE_SELECTED_LANGUAGE, payload: id };
}
