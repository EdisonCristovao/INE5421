export const UNION = 1;
export const INTERSECT = 2;

//LANGUAGE =========================================
export const MAKE_NEW_LANGUAGE = "MAKE_NEW_LANGUAGE";
export const MAKE_NEW_LANGUAGE_DET = "MAKE_NEW_LANGUAGE_DET";
export const CHANGE_SELECTED_LANGUAGE = "CHANGE_SELECTED_LANGUAGE";
export const DELETE_LANGUAGE = "DELETE_LANGUAGE";

export const UNION_INTERSECT_LANGUAGE = "UNION_INTERSECT_LANGUAGE";

//EXPRESSION =========================================
export const CHANGE_REG_EXPRESSION = "CHANGE_REG_EXPRESSION";

//GRAMMA =========================================
export const CHANGE_REG_GRAMMA = "CHANGE_REG_GRAMMA";

export const CHANGE_LLC_GRAMMA = "CHANGE_LLC_GRAMMA";

//SENTENCE =========================================
export const ADD_SENTENCE = "ADD_SENTENCE";
export const REMOVE_SENTENCE = "REMOVE_SENTENCE";

//FSM ===============================================
export const FSM_EDIT = "FSM_EDIT";

//LANGUAGES =========================================
export function makeNewLanguage(name, type) {
  if (!type) type = 1;
  return { type: MAKE_NEW_LANGUAGE, payload: { name, type } };
}
export function makeNewLanguageDet(fsm) {
  return { type: MAKE_NEW_LANGUAGE_DET, payload: { fsm } };
}

export function changeSelectedLanguage(id) {
  return { type: CHANGE_SELECTED_LANGUAGE, payload: id };
}

export function deleteLanguage(id) {
  return { type: DELETE_LANGUAGE, payload: id };
}

export function unionIntersectLanguage(language, operation, languageId) {
  return {
    type: UNION_INTERSECT_LANGUAGE,
    payload: { language, operation, languageId }
  };
}

export function changeRegExpression(regExpression) {
  return { type: CHANGE_REG_EXPRESSION, payload: regExpression };
}

export function changeLLCExpression(llcExpression) {
  return { type: CHANGE_LLC_GRAMMA, payload: llcExpression };
}

export function changeRegGramma(regGramma) {
  return { type: CHANGE_REG_GRAMMA, payload: regGramma };
}

//FSM ===============================================
export function fsmEdit(fsm) {
  return { type: FSM_EDIT, payload: fsm };
}

//SENTENCES =========================================
export function addSentence(sentence) {
  return { type: ADD_SENTENCE, payload: sentence };
}

export function removeSentence(index) {
  return { type: REMOVE_SENTENCE, payload: index };
}
