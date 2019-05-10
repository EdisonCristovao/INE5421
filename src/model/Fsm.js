import { isDeterministic, determine } from "./fsm/Determinator";
import { EPSILON, DEAD_STATE } from "./SymbolValidator";
import { sentenceRecognize } from "./fsm/Recognizer";
import * as R from "ramda";
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
    return this.transitions.some(trans => {
      if (trans.to !== undefined && trans.to !== "" && trans.to !== "-") {
        return trans.to
          .split(",")
          .some(singleState => !this.states.includes(singleState));
      } else {
        return false;
      }
    });
  }

  recognize(sentence) {
    return sentenceRecognize(this, sentence);
  }
  isFinal(stante) {
    return this.finals[this.states.indexOf(stante)];
  }

  createFsmFromFsm(fsm) {
    if (fsm) {
      this.states = fsm.states;
      this.alphabet = fsm.alphabet;
      this.transitions = fsm.transitions;
      this.initial = fsm.initial;
      this.finals = fsm.finals;
    }
  }

  getProductions(vn) {
    let productions = [];

    this.transitions.forEach(tran => {
      if (tran.from === vn && tran.to !== DEAD_STATE && tran.to !== undefined) {
        productions.push(`${tran.when}${tran.to}`);
        if (this.isFinal(tran.to)) productions.push(`${tran.when}`);
      }
    });

    return productions;
  }

  fsmToGrammarConvert() {
    let vn = [...this.states];
    let vt = [...this.alphabet];
    let p = [];
    let s = this.initial;

    vn.forEach(vn => {
      p = [...p, { nonTerminal: vn, productions: this.getProductions(vn) }];
    });

    let initialIsFinal = this.finals[this.states.indexOf(this.initial)];

    if (initialIsFinal)
      p.map(p_ => {
        if (p_.nonTerminal === this.initial)
          return p_.productions.push(`&`)
      });

    let grammar = new Grammar(vn, vt, p, s);
    return grammar;
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
