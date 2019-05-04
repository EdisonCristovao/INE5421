import { isDeterministic, determine } from "./fsm/Determinator";
import {sentenceRecognize} from "./fsm/Recognizer";
import * as R from 'ramda';
import Grammar from "./Grammar";

export default class FSM {
  constructor(states, alphabet, transitions, initial, finals) {
    this.states = !states || !Array.isArray(states) ? [] : states;
    this.alphabet = !alphabet || !Array.isArray(alphabet) ? [] : alphabet;
    this.transitions =
      !transitions || !Array.isArray(transitions) ? [] : transitions;
    this.initial = initial;
    this.finals = !finals || !Array.isArray(finals) ? [] : finals;
  }

  isDeterministic() {
    return isDeterministic(this);
  }

  determine() {
    return determine(this);
  }

  hasNonDeclaredState() {
    return this.transitions.some(
      trans => {
        if (trans.to !== undefined && trans.to !== ""
            && trans.to !== "-") {
          return trans.to.split(",").some(
            singleState => !this.states.includes(singleState)
          )
        } else {
          return false;
        }
      });
  }

  recognize(sentence) {
    return sentenceRecognize(this, sentence);
  }

  createFsmFromFsm(fsm) {
    this.states = fsm.states;
    this.alphabet = fsm.alphabet;
    this.transitions = fsm.transitions;
    this.initial = fsm.initial;
    this.finals = fsm.finals;
  }

  fsmToGrammarConvert() {
    
    let vn = [...this.states];
    let vt = [...this.alphabet];
    let p = [];
    let s = this.initial;
    
    // this.transitions.forEach(trans => {

    // })

    return new Grammar(vn, vt, p, s);
  }
  clone() {
    return new FSM(
      [...this.states],
      [...this.alphabet],
      [...R.clone(this.transitions)],
      this.initial,
      [...this.finals]
    );
  }
}
