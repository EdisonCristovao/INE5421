import { isDeterministic, determine } from "./fsm/Determinator";
import { DEAD_STATE, ALPHABET } from "./SymbolValidator";
import { sentenceRecognize } from "./fsm/Recognizer";
import { minimize } from "./fsm/Minimizer";
import { unite } from "./fsm/Uniter";
import { intersect } from "./fsm/Intersecter";
import Grammar from "./Grammar";
import * as R from "ramda";

export default class FSM {
  constructor(states, alphabet, transitions, initial, finals) {
    this.states = !states || !Array.isArray(states) ? [] : states;
    this.alphabet = !alphabet || !Array.isArray(alphabet) ? [] : alphabet;
    this.transitions =
      !transitions || !Array.isArray(transitions) ? [] : transitions;
    this.initial = initial;
    this.finals = !finals || !Array.isArray(finals) ? [] : finals;
    this.isMin = false;
  }

  isDeterministic() {
    return isDeterministic(this);
  }

  determine() { 
    return determine(this);
  }

  minimize() {
    //Determining so we don't have to deal with epsilon transitions.
    //If it's already deterministic, determine() will return the same FSM.
    return minimize(this.isDeterministic() ? this : this.determine().renameStates());
  }

  unite(fsm) {
    return unite(this, fsm);
  }

  intersect(fsm) {
  // Determining so we don't have to deal with epsilon transitions.
  // Renaming states so we don't have any bugs related to commas on state names 
  return intersect(this.isDeterministic() ? this : this.determine().renameStates(),
         fsm.isDeterministic() ? fsm : fsm.determine().renameStates());
  }

  recognize(sentence) {
    return sentenceRecognize(this.determine(), sentence);
  }

  isFinal(state) {
    return this.finals[this.states.indexOf(state)];
  }

  createFsmFromFsm(fsm) {
    fsm.transitions.forEach((t, i, a) => {
      if (t.to === undefined) a[i].to = DEAD_STATE;
    });

    if (fsm) {
      this.states = fsm.states;
      this.alphabet = fsm.alphabet;
      this.transitions = fsm.transitions;
      this.initial = fsm.initial;
      this.finals = fsm.finals;
      this.isMin = fsm.isMin;
    }
  }

  getProductions(vn) {
    let productions = [];

    this.transitions.forEach(tran => {
      if (tran.from === vn && tran.to !== DEAD_STATE && tran.to !== undefined) {
        productions.push(tran.when+" "+tran.to);
        if (this.isFinal(tran.to)) productions.push(tran.when);
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
      p = [...p, { nonTerminal: vn, productions: this.getProductions(vn)}];
    });

    // If initial state is final
    if (this.finals[this.states.indexOf(this.initial)]) {
      for (let i = 0; i < p.length; i++)  {
        if (p[i].nonTerminal === this.initial) {
          p[i].productions.push("&");
        }
      }
    }

    return new Grammar(vn, vt, p, s);
  }

  renameStates() {
    let newFsm = this.clone();

    newFsm.initial = ALPHABET[0];

    newFsm.transitions.forEach(t => {
      t.from = ALPHABET[newFsm.states.indexOf(t.from)];
      if (t.to !== DEAD_STATE) 
        t.to = ALPHABET[newFsm.states.indexOf(t.to)];
    });

    for (let i = 0; i < newFsm.states.length; i++)
      newFsm.states[i] = ALPHABET[i];

    return newFsm;
  }

  setAuxiliarDeadState() {
    // Any non declared state?
    if (!this.transitions.some(t => this.states.some(s => t.to.split(",").some(s1 => s1 === s)))) {
      // No transitions to dead state or dead state already added
      if (!this.transitions.some(t => t.to === DEAD_STATE) || this.states.some(s => S === DEAD_STATE)) {
        return;
      }
    }
    
    // Renaming transitions.
    this.transitions.forEach((t, i, a) => {
      if (!this.states.some(s => t.to.split(",").some(s1 => s1 === s))) {
        a[i].to = DEAD_STATE;
      }
    })
    
    this.states.push(DEAD_STATE);
    this.alphabet.forEach(a => {
      this.transitions.push({"from": DEAD_STATE, "to": DEAD_STATE, "when": a});
    });
    this.finals.push(false);
  }

  removeAuxiliarDeadState() {
    this.states = this.states.filter(s => s !== DEAD_STATE);
    this.transitions = this.transitions.filter(t => t.from !== DEAD_STATE);
    this.finals = this.finals.filter((_, i, a) => i < a.length - 1);
  }

  renameForIdentification(id) {
    let newFSM = this.clone();

    newFSM.initial += id;

    newFSM.states.forEach((_, i, s) => s[i] += id);

    newFSM.transitions.forEach((t, i, a) => {
      a[i].from += id;

      // Skip transitions to dead state.
      if (t.to === DEAD_STATE) return;
      
      a[i].to = t.to.split(",").map(s => s.replace(/\s/g, '') + id).join(","); 
    });

    return newFSM;
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
