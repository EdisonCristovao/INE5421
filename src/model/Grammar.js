import { SEPARATOR, DERIVATION } from "./SymbolValidator";
import Fsm from "./Fsm";

export default class Grammar {
  constructor(Vn, Vt, P, S) {
    this.Vn = Vn;
    this.Vt = Vt;
    this.P = P;
    this.S = S;
    // this.fsm = null;

    //   this._convertToFSM();
  }

  grammarToFsmConvert(grammar) {
    let fsm = new Fsm();
    fsm.states = [...grammar.Vn];
    fsm.alphabet = [...grammar.Vt];
    fsm.initial = grammar.S;

    // Initializes final states
    for (let i = 0; i < fsm.states.length; i++) fsm.finals.push(false);

    // All states that a symbol leads when in some state
    let toAux = [];
    for (let i = 0; i < fsm.alphabet.length; i++) toAux.push(new Set());

    grammar.P.forEach(p => {
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

  gramaToString() {
    // if (!this.s || !this.p) return "";

    let p = this.P.map(prod => {
      if (prod.nonTerminal == this.S)
        return { ...prod, nonTerminal: `*${prod.nonTerminal}` };
      else return prod;
    });
    let p_ = "";

    p.forEach(prod => {
      p_ += `${prod.nonTerminal} ${DERIVATION} ${prod.productions.map(
        (pr, i) => {
          if (prod.productions.length - 1 === i && pr !== undefined) return `${pr} \n`;
          else if(pr !== undefined) return `${pr} ${SEPARATOR} `;
        }
      )}`;
    });
    console.log(p_)
    return p_;
  }
}
