import { isDeterministic, determine } from "./fsm/Determinator";
import { EPSILON, DEAD_STATE, ALPHABET } from "./SymbolValidator";
import { sentenceRecognize } from "./fsm/Recognizer";
import { minimize } from "./fsm/Minimizer";
import { unite } from "./fsm/Uniter";
import { intersect } from "./fsm/Intersecter";
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

  isEqualTo(fsm) {
    // Checking attributes length and fsm initials
    if (this.states.length !== fsm.states.length 
    || this.alphabet.length !== fsm.alphabet.length 
    || this.transitions.length !== fsm.transitions.length
    || this.finals.length !== fsm.finals.length 
    || this.initial !== fsm.initial) { 
      return false;
    }

    // Are all states equals?
    if (this.states.some(s1 => !fsm.states.some(s2 => s1 === s2))) return false;
    
    // Are all alphabet symbols equals?
    if (this.alphabet.some(a1 => !fsm.alphabet.some(a2 => a1 === a2))) return false;
    
    // Are all transitions equals?
    if (this.transitions.some(t1 => !fsm.transitions.some(t2 => 
      t1.from === t2.from && t1.to === t2.to && t1.when === t2.when))) return false;

    // Are all finals equals?
    if (this.finals.some((f,i) => f !== fsm.finals[fsm.states.indexOf(this.states[i])])) return false;

    // Passed all tests
    return true;
  }

  determine() {
    return determine(this);
  }

  minimize() {
    return this.isDeterministic() ? minimize(this) : minimize(this.determine());
  }

  unite(fsm) {
    return unite(this, fsm);
  }

  intersect(fsm) {
    // Determining so we don't have to deal with epsilon transitions.
    return intersect(this.determine(), fsm.determine());
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
    return sentenceRecognize(this.determine(), sentence);
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

    return new Grammar(vn, vt, p, s);
  }

  renameStates() {
    let newFsm = this.clone();

    newFsm.initial = ALPHABET[0];

    newFsm.transitions.forEach(t => {
      t.from = ALPHABET[newFsm.states.indexOf(t.from)];
      t.to = ALPHABET[newFsm.states.indexOf(t.to)];
    });

    for (let i = 0; i < newFsm.states.length; i++)
    newFsm.states[i] = ALPHABET[i];

    return newFsm;
  }

  renameForIdentification(id) {
    let newFSM = this.clone();

    newFSM.initial += id;

    newFSM.states.forEach((_, i, s) => s[i] += id);

    newFSM.transitions.forEach((t, i, a) => {
        a[i].from += id;
        a[i].to = t.to.split(",").map(s => s.replace(/\s/g, '') + id).join(","); 
    });

    return newFSM;
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
