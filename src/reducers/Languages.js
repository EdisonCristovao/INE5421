import {
  MAKE_NEW_LANGUAGE,
  MAKE_NEW_LANGUAGE_DET,
  CHANGE_SELECTED_LANGUAGE,
  DELETE_LANGUAGE,
  CHANGE_REG_EXPRESSION,
  CHANGE_REG_GRAMMA,
  FSM_EDIT,
  ADD_SENTENCE,
  REMOVE_SENTENCE,
  UNION_INTERSECT_LANGUAGE,
  UNION,
  INTERSECT,
  makeNewLanguage
} from "./../actions";
import uuidv4 from "uuid/v4";
import InitialState from "./states/language.state";
import Fsm from "./../model/Fsm";
import { toast } from "react-toastify";
import Grammar from "./../model/Grammar";

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
      // { sentence: "aaabba", valid: false },
      // { sentence: "ababbaa", valid: true }
    ],
    enumerationLength: 5,
    type: null
  };
}

const languages = (state = InitialState, action) => {
  const language = state.listLanguages[state.selectedLanguage];
  switch (action.type) {
    case MAKE_NEW_LANGUAGE:
      let newLanguage = _makeNewLanguage(action.payload.name);
      newLanguage.type = action.payload.type;
      const newList = [...state.listLanguages, newLanguage];
      return {
        ...state,
        listLanguages: newList,
        selectedLanguage: newList.length - 1
      };

    case MAKE_NEW_LANGUAGE_DET:
      let attach = action.payload.fsm.isMin ? "MIN" : "DET";
      let newLanguageDet = _makeNewLanguage(language.name + " " + attach);
      let fsmDet = new Fsm();
      fsmDet.createFsmFromFsm(action.payload.fsm);
      fsmDet = fsmDet.renameStates();
      newLanguageDet.fsm = fsmDet;

      newLanguageDet.grammar = fsmDet.fsmToGrammarConvert().gramaToString();

      // Language Type = regular
      newLanguageDet.type = 1

      const newListLang = [...state.listLanguages, newLanguageDet];
      return {
        ...state,
        listLanguages: newListLang,
        selectedLanguage: newListLang.length - 1
      };

    case CHANGE_SELECTED_LANGUAGE:
      return {
        ...state,
        selectedLanguage: action.payload
      };

    case UNION_INTERSECT_LANGUAGE:
      let fsmA = new Fsm();
      fsmA.createFsmFromFsm(action.payload.language.fsm);

      let fsmB = new Fsm();
      const unOpLangu = state.listLanguages.find(
        lang => lang.id === action.payload.languageId
      );
      fsmB.createFsmFromFsm(unOpLangu.fsm);

      let opLanguage = null;

      if (action.payload.operation === UNION) {
        opLanguage = _makeNewLanguage(
          `${action.payload.language.name} U ${unOpLangu.name}`
        );
        opLanguage.fsm = fsmA.unite(fsmB);
      } else {
        opLanguage = _makeNewLanguage(
          `${action.payload.language.name} I ${unOpLangu.name}`
        );
        opLanguage.fsm = fsmA.intersect(fsmB);
      }
      
      if (opLanguage.fsm === null) {
        toast.warn("Intersecção vazia.");
        return {
          ...state
        };
      }
      
      const newListUniInte = [...state.listLanguages, opLanguage];

      // Language Type = regular
      opLanguage.type = 1

      return {
        ...state,
        listLanguages: newListUniInte
      };

    case DELETE_LANGUAGE:
      return {
        ...state,
        selectedLanguage: null,
        listLanguages: state.listLanguages.filter(
          (language, index) => index !== action.payload
        )
      };

    case CHANGE_REG_EXPRESSION:
      state.listLanguages[state.selectedLanguage].expression = action.payload;
      return {
        ...state
      };

    case CHANGE_REG_GRAMMA:
      let nGramma = new Grammar();
      state.listLanguages[state.selectedLanguage].fsm = nGramma
        .stringToGrammar(action.payload)
        .grammarToFsmConvert();
      state.listLanguages[state.selectedLanguage].grammar = action.payload;

      return {
        ...state
      };

    case FSM_EDIT:
      let nFsm = new Fsm();
      nFsm.createFsmFromFsm(action.payload);
      if (nFsm.isDeterministic())
        state.listLanguages[
          state.selectedLanguage
        ].grammar = nFsm.fsmToGrammarConvert().gramaToString();
      else
        state.listLanguages[state.selectedLanguage].grammar =
          "Automato nao deterministico";

      state.listLanguages[state.selectedLanguage].fsm = action.payload;
      return {
        ...state
      };

    case ADD_SENTENCE:
      return recognizeReduce(state, action);

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

const recognizeReduce = (state, action) => {
  const language = state.listLanguages[state.selectedLanguage];
  const fsm = language.fsm;
  const newFsm = new Fsm(
    fsm.states,
    fsm.alphabet,
    fsm.transitions,
    fsm.initial,
    fsm.finals
  );

  let valid = false;
  if (newFsm.isDeterministic()) valid = newFsm.recognize(action.payload);
  else valid = newFsm.determine().recognize(action.payload);

  state.listLanguages[state.selectedLanguage].userSentences = [
    ...language.userSentences,
    { sentence: action.payload, valid: valid }
  ];
  return {
    ...state
  };
};
