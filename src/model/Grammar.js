import { SEPARATOR, DERIVATION } from "./SymbolValidator";
import Fsm from "./Fsm"

export default class Grammar {
  constructor(Vn, Vt, P, S) {
    this.Vn = Vn;
    this.Vt = Vt;
    this.P = P;
    this.S = S;
    // this.fsm = null;

    //   this._convertToFSM();
  }

  grammarToFsmConvert(gramma) {
    let productions = gramma.split('\n')
    let productions = productions.map(prod => console.log(prod.replace(/\s/g, '')));
    console.log(productions);

    return new Fsm();
  }

  gramaToString() {
    // if (!this.s || !this.p) return "";
    
    let p = this.P;
    let p_ = "";

    p.forEach(prod => {
      p_ += `${prod.nonTerminal} ${DERIVATION} ${
        prod.productions.map((pr, i) => {
          if (prod.productions.length - 1 === i) 
            return `${pr} \n`
          else 
            return `${pr} ${SEPARATOR} `
        }
        )}`
    });
    // console.log(p_)
    return p_;
  }
}
