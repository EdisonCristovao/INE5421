import { SEPARATOR, DERIVATION, EPSILON, NEW_STATE } from "./SymbolValidator";
import Fsm from "./Fsm";

export default class Grammar {
  constructor(Vn, Vt, P, S) {
    this.Vn = !Vn || !Array.isArray(Vn) ? [] : Vn;
    this.Vt = !Vt || !Array.isArray(Vt) ? [] : Vt;
    this.P = !P || !Array.isArray(P) ? [] : P;
    this.S = S;
    this.isRegular = true;
  }

  grammarToFsmConvert() {
    let fsm = new Fsm();
    if (this.S === "" || this.S === undefined) return fsm;
    if (this.P.length === 1 && this.P[0].productions.length === 0) return fsm;

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

    // Productions elements (terminal and nonTerminal symbols for each iteration)
    let prodElements = [];

    this.P.forEach(p => {
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

  stringToGrammar(grammarString) {
    let grammar = new Grammar();

    // Auxiliar array and index to utilize throught some iterations
    let prodElements = [];
    let i = 0;

    // Skip isRegular test
    let skip = false;

    // Gets all nonTerminals (scanning each head of a production).
    grammar.Vn = Array.from(new Set(
      grammarString.split("\n")
      .map(l => l.substring(0, l.indexOf(DERIVATION)).trimLeft().trimRight())
      .filter(nonTerminal => nonTerminal !== ""))
    );

    // Initializes all productions arrays.
    grammar.Vn.forEach(nT => grammar.P.push({"nonTerminal": nT, "productions": []}));

    // Sets the first symbol from the first derivation as the grammar initial symbol 
    grammar.S = grammar.Vn[0];

    grammarString.split("\n").forEach(line => {
      // Grammar still on construction or blank line ?
      if (line === "" || !line.includes(DERIVATION)) return;
      
      // Get the head of a production
      let head = line.substring(0, line.indexOf(DERIVATION)).trimLeft().trimRight();
      i = grammar.Vn.indexOf(head);

      let originalLength = line.length;
      line.substring(line.indexOf(DERIVATION) + DERIVATION.length, originalLength)
      .split(SEPARATOR)
      .forEach(prod => {
        if (prod === "" || prod === undefined) return;
        
        // Removes any initial and final spaces from the production.
        prod = prod.trimLeft().trimRight();

        // Gets all terminal symbols of a production
        prodElements = prod.split(" ");
        
        // Skip test because the grammar is already non regular.
        if (!skip) {
          // Is this a regular grammar?
          if (prodElements.length > 2) {
            grammar.isRegular = false;
          } else if (prodElements.length === 2) {
            if (!grammar.Vn.some(nT => prodElements[1] === nT))
              grammar.isRegular = false;
            else if (grammar.Vn.some(nT => prodElements[0] === nT))
              grammar.isRegular = false;
          } else if (prodElements.length === 1) {
            if (grammar.Vn.some(nT => prodElements[0] === nT))
              grammar.isRegular = false;
          }

          if (!grammar.isRegular)
            skip = true;
        }
        
        // Adding terminal symbols into the grammar.
        prodElements.forEach(el => {
          if (!grammar.Vn.some(nT => nT === el) && !grammar.Vt.some(t => t === el))
            grammar.Vt.push(el);
        });

        // Adding the production into the grammar.
        if (!grammar.P[i].productions.some(p => p === prod))
          grammar.P[i].productions.push(prod);
      });
    });

    console.log(grammar);
    
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
