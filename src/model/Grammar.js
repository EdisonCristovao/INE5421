import { SEPARATOR, DERIVATION } from "./SymbolValidator";

export default class Grammar {
  constructor(Vn, Vt, P, S) {
    this.Vn = Vn;
    this.Vt = Vt;
    this.P = P;
    this.S = S;
    // this.fsm = null;

    //   this._convertToFSM();
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
