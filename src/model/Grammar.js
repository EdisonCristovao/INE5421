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
    if (!this.s || !this.p) return "";

    let p = this.p;

    let p_ = "";

    for (let nonTerminal in p) {
        
    }

    return p_;
  }
}

// p= [
//     {nonTerminal: "S" , production: ["aA, bB, a, b"]}
// ]
