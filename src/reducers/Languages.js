import {
  MAKE_NEW_LANGUAGE,
  CHANGE_SELECTED_LANGUAGE,
  CHANGE_REG_EXPRESSION,
  CHANGE_REG_GRAMMA,
  FSM_EDIT,
  ADD_SENTENCE,
  REMOVE_SENTENCE
} from "./../actions/Language";
import uuidv4 from "uuid/v4";
import InitialState from "./states/language.state";
import Fsm from "./../model/Fsm";

function _makeNewLanguage(name) {
  return {
    id: uuidv4(),
    name: name,
    empty: true,
    valid: true,
    grammar: "",
    expression: "",
    // fsm: new Fsm(['A', 'B'], ['a','b'], [{from: 'A', to: 'B', when: 'a'}, {from: 'A', to: 'A', when: 'b'}], 'A', [false, true]),
    fsm: new Fsm([], [], [], "", []),
    userSentences: [
      { sentence: "aaabba", valid: false },
      { sentence: "ababbaa", valid: true }
    ],
    enumerationLength: 5
  };
}

const languages = (state = InitialState, action) => {
  switch (action.type) {
    case MAKE_NEW_LANGUAGE:
      const newLanguage = _makeNewLanguage(action.payload);
      const newList = [...state.listLanguages, newLanguage];
      return {
        ...state,
        listLanguages: newList,
        selectedLanguage: newList.length - 1
      };
    case CHANGE_SELECTED_LANGUAGE:
      return {
        ...state,
        selectedLanguage: action.payload
      };
    case CHANGE_REG_EXPRESSION:
      state.listLanguages[state.selectedLanguage].expression = action.payload;
      return {
        ...state
      };
    case CHANGE_REG_GRAMMA:
      state.listLanguages[state.selectedLanguage].grammar = action.payload;
      return {
        ...state
      };
    case FSM_EDIT:
      state.listLanguages[state.selectedLanguage].fsm = action.payload;
      return {
        ...state
      };
    case ADD_SENTENCE:
      const sentences =
        state.listLanguages[state.selectedLanguage].userSentences;
      state.listLanguages[state.selectedLanguage].userSentences = [
        ...sentences,
        { sentence: action.payload, valid: false }
      ];
      return {
        ...state
      };
    case REMOVE_SENTENCE:
      state.listLanguages[
        state.selectedLanguage
      ].userSentences = state.listLanguages[
        state.selectedLanguage
      ].userSentences.filter((sent, index) => index !== action.payload);
      return {
        ...state
      };

    case "LOAD_STORAGE":
      state = action.payload;
      return {
        ...state
      };
    default:
      return state;
  }
};

export default languages;
