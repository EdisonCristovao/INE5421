import {
    MAKE_NEW_LANGUAGE
} from 'constants/ActionTypes';

export function makeNewLanguage(name) {
    return { type: MAKE_NEW_LANGUAGE, payload: name };
}
