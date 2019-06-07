import { EPSILON, NEW_STATE } from "../SymbolValidator";
import Fsm from "../Fsm";

export function grammarToFsmConvert(grammar) {
    let fsm = new Fsm();
    if (grammar.S === "" || grammar.S === undefined) return fsm;
    if (grammar.P.length === 1 && grammar.P[0].productions.length === 0) return fsm;
    if (!grammar.isRegular) return fsm;

    fsm.states = [...grammar.Vn].concat(NEW_STATE);
    fsm.alphabet = grammar.Vt.some(t => t == EPSILON) ? grammar.Vt.filter(t => t !== EPSILON) : [...grammar.Vt];
    fsm.initial = grammar.S;

    // Initializes final states
    for (let i = 0; i < fsm.states.length-1; i++) fsm.finals.push(false);
    
    // New state is final.
    fsm.finals.push(true);

    // If initial symbol has epsilon, then he's final too.
    for (let i = 0; i < grammar.P.length; i++) {
      if (grammar.P[i].nonTerminal === grammar.S && grammar.P[i].productions.some(p => p === EPSILON)) {
        fsm.finals[fsm.states.indexOf(fsm.initial)] = true;
        break;
      }
    }

    // All states that a symbol leads when in some state
    let toAux = [];
    for (let i = 0; i < fsm.alphabet.length; i++) toAux.push(new Set());

    // Productions elements (terminal and nonTerminal symbols for each iteration)
    let prodElements = [];

    grammar.P.forEach(p => {
      p.productions.forEach(pAux => {
        // Skip epsilon
        if (pAux === EPSILON) return;

        prodElements = pAux.split(" ");

        // Construct non deterministic automata
        let to, when;
        if (prodElements.length === 1) {
          to = NEW_STATE;
          when = prodElements[0];
        } else if (prodElements.length === 2) {
          to = fsm.states[fsm.states.indexOf(prodElements[1])];
          when = fsm.alphabet[fsm.alphabet.indexOf(prodElements[0])];
        } else return;
        toAux[fsm.alphabet.indexOf(when)].add(to);
      });

      // Join all states that a states reaches with some symbol into a string
      toAux.forEach((when, index) => {
        if (when.size == 0) return;

        let to = Array.from(when).sort().join(",");
        let symbol = fsm.alphabet[index];

        fsm.transitions.push({
          from: p.nonTerminal,
          to: to,
          when: symbol
        });

        when.clear();
      });
    });

    return fsm;
  }