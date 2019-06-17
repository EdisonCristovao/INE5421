import { SEPARATOR, DERIVATION } from "./SymbolValidator";
import { grammarToFsmConvert } from "./regularGrammar/Converter"
import { removeEpsilon } from "./contextFreeGrammar/EpsilonEliminator"
import { removeUnitary } from "./contextFreeGrammar/UnitaryEliminator"
import { removeUseless } from "./contextFreeGrammar/UselessEliminator"

export default class Grammar {
  constructor(Vn, Vt, P, S) {
    this.Vn = !Vn || !Array.isArray(Vn) ? [] : Vn;
    this.Vt = !Vt || !Array.isArray(Vt) ? [] : Vt;
    this.P = !P || !Array.isArray(P) ? [] : P;
    this.S = S;
    this.isRegular = null;
  }

  removeEpsilon() {
    return removeEpsilon(this);
  }

  removeUnitary() {
    return removeUnitary(this);
  }

  removeUseless() {
    return removeUseless(this);
  }

  transformToChomsky() {
    return this.removeEpsilon().removeUnitary().removeUseless();
  }

  grammarToFsmConvert() {
    return grammarToFsmConvert(this);
  }

  stringToGrammar(grammarString) {
    let grammar = new Grammar();

    // Auxiliar array and index to utilize throught some iterations
    let prodElements = [];
    let i = 0;

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
        if (prod.replace(/\s/g, '') === "" || prod === undefined) return;
        
        // Removes any initial and final spaces from the production.
        prod = prod.trimLeft().trimRight();

        // Gets all symbols (terminal and non terminals) of a production
        prodElements = prod.split(" ");
        
        // Skip test if the grammar is already non regular.
        if (grammar.isRegular || grammar.isRegular === null) {
          // Is this a regular grammar?
          if (prodElements.length > 2) {
            grammar.isRegular = false;
          } else if (prodElements.length === 2) {
            if (!grammar.Vn.some(nT => prodElements[1] === nT)) {
              grammar.isRegular = false;
            } else if (grammar.Vn.some(nT => prodElements[0] === nT)) {
              grammar.isRegular = false;
            } else {
              grammar.isRegular = true;
            }
          } else if (prodElements.length === 1) {
            if (grammar.Vn.some(nT => prodElements[0] === nT)){
              grammar.isRegular = false;
            } else {
              grammar.isRegular = true;
            }
          }
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

    grammar.removeUseless();
    
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
