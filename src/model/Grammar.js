import { SEPARATOR, DERIVATION, EPSILON, NEW_STATE } from "./SymbolValidator";
import Fsm from "./Fsm";

export default class Grammar {
  constructor(Vn, Vt, P, S) {
    this.Vn = !Vn || !Array.isArray(Vn) ? [] : Vn;
    this.Vt = !Vt || !Array.isArray(Vt) ? [] : Vt;
    this.P = !P || !Array.isArray(P) ? [] : P;
    this.S = S;
  }

  grammarToFsmConvert() {
    let fsm = new Fsm();
    if (this.S === "" || this.S === undefined) return fsm;

    fsm.states = [...this.Vn].concat(NEW_STATE);
    fsm.alphabet = this.Vt.some(t => t == EPSILON) ? this.Vt.filter(t => t !== EPSILON) : [...this.Vt];
    fsm.initial = this.S;

    // Initializes final states
    for (let i = 0; i < fsm.states.length-1; i++) fsm.finals.push(false);
    
    // New state is final.
    fsm.finals.push(true);

    // If initial symbol has epsilon, then he's final too.
    for (let i = 0; i < this.P.length; i++) {
      if (this.P[i].nonTerminal === this.S && this.P[i].productions.some(p => p === EPSILON)) {
        fsm.finals[fsm.states.indexOf(fsm.initial)] = true;
        break;
      }
    }

    // All states that a symbol leads when in some state
    let toAux = [];
    for (let i = 0; i < fsm.alphabet.length; i++) toAux.push(new Set());

    this.P.forEach(p => {
      p.productions.forEach(pAux => {
        // Skip epsilon
        if (pAux === EPSILON) return;

        // Construct non deterministic automata
        let to, when;
        if (fsm.alphabet.some(letter => letter === pAux)) {
          to = NEW_STATE;
          when = pAux;
        } else {
          to = fsm.states.filter(state => pAux.includes(state))[0];
          when = fsm.alphabet.filter(letter => pAux.includes(letter))[0];
        }

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

  stringToGrammar(grammarString) {
    let grammar = new Grammar();

    let nonTerminals = new Set();
    let terminals = new Set();

    // Sets the first symbol from the first derivation as the grammar initial symbol 
    grammar.S = grammarString.substring(0, grammarString.indexOf(DERIVATION)).replace(/\s/g, '');

    grammarString.split("\n").forEach(line => {
      if (line === "" || !line.includes(DERIVATION)) return;

      // Remove all spaces from line
      line = line.replace(/\s/g, '');

      // Get derivation symbol
      let nonTerAux = line.substring(0, line.indexOf(DERIVATION));

      // Sees if this derivation symbol has already been added to the productions
      if (!nonTerminals.has(nonTerAux)) {
        nonTerminals.add(nonTerAux);
        grammar.P.push({ "nonTerminal": nonTerAux, "productions": [] });
      }

      let lastLength = line.length;

      line.substring(line.indexOf(DERIVATION) + 2, lastLength)
        .split(SEPARATOR).forEach(prod => {
          if (prod === "" || prod === undefined) return;

          terminals.add(prod[0]);

          if (!nonTerminals.has(prod[1]) && prod[1] !== "" && prod[1] !== undefined) {
            nonTerminals.add(prod[1]);
            grammar.P.push({ "nonTerminal": prod[1], "productions": [] });
          }

          let i;
          for (i = 0; i < grammar.P.length; i++)
            if (grammar.P[i].nonTerminal === nonTerAux) break;

          if (!grammar.P[i].productions.some(pAux => pAux === prod))
            grammar.P[i].productions.push(prod);
        });
    });

    grammar.Vn = Array.from(nonTerminals);
    grammar.Vt = Array.from(terminals);

    return grammar;
  }

  gramaToString() {
    let productions = "";

    // Build the string concatenating each production
    this.P.forEach(p => {
      productions += p.nonTerminal + " " + DERIVATION;
      p.productions.forEach((pAux, index) => {
        productions += (index === 0) ? " " + pAux : " | " + pAux;
      });
      productions += "\n";
    });

    return productions;
  }
}
