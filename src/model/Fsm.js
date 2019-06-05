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
    return minimize(this.determine());
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
      p = [...p, { nonTerminal: vn, productions: this.getProductions(vn) }];
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
