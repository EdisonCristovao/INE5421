import { isDeterministic, determine } from "./fsm/Determinator";
import {sentenceRecognize} from "./fsm/Recognizer";
import * as R from 'ramda';

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

  read(sentence) {
    return sentenceRecognize(this, sentence);
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
