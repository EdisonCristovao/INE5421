import { SEPARATOR, DERIVATION } from "./SymbolValidator";
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
    fsm.states = [...this.Vn];
    fsm.alphabet = [...this.Vt];
    fsm.initial = this.S;

    // Initializes final states
    for (let i = 0; i < fsm.states.length; i++) fsm.finals.push(false);

    // All states that a symbol leads when in some state
    let toAux = [];
    for (let i = 0; i < fsm.alphabet.length; i++) toAux.push(new Set());

    this.P.forEach(p => {
      // Calculates all terminal symbols that some non terminal symbols leads to
      let auxTer = fsm.alphabet.filter(letter =>
        p.productions.some(prod => prod === letter)
      );

      p.productions.forEach(pAux => {
        if (auxTer.some(letter => letter === pAux)) return;

        let to = fsm.states.filter(state => pAux.includes(state))[0];
        let when = fsm.alphabet.filter(letter => pAux.includes(letter))[0];

        toAux[fsm.alphabet.indexOf(when)].add(to);

        // Checks if the state that the transition leads to is a final one
        if (auxTer.some(letter => letter === when))
          fsm.finals[fsm.states.indexOf(to)] = true;
      });

      toAux.forEach((when, index) => {
        if (when.size == 0) return;

        let to = Array.from(when)
          .sort()
          .join(",");
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

    let prodIndex = -1;
    let nonTerminals = new Set();
    let terminals = new Set();

    // Sets the first symbol from the first derivation as the grammar initial symbol 
    grammar.S = grammarString.substring(0, grammarString.indexOf(DERIVATION)).replace(/\s/g, '');

    grammarString.split("\n").forEach(line => {
      if (line === "") return;

      // Remove all spaces from line
      line = line.replace(/\s/g, '');

      // Get derivation symbol
      let nonTerAux = line.substring(0, line.indexOf(DERIVATION));

      // Sees if this derivation symbol has already been added to the productions
      if (!nonTerminals.has(nonTerAux)) {
        nonTerminals.add(nonTerAux);
        grammar.P.push({ "nonTerminal": nonTerAux, "productions": [] });
        prodIndex++;
      }

      let lastLength = line.length;

      line.substring(line.indexOf(DERIVATION) + 2, lastLength)
        .split(SEPARATOR).forEach(prod => {
          terminals.add(prod[0]);
          grammar.P[prodIndex].productions.push(prod);
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
