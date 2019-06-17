import { EPSILON, MARKER } from "../SymbolValidator";
import Grammar from "../Grammar"

function removeUnproductives(productions, terminals, nonTerminals) {
    let prods = [...productions];

    // First step, marking all terminal symbos in each production]
    prods.forEach((prod, i) => {
        prod.productions.forEach((p, j) => {
            let index = 0;

            p.split(" ").forEach(s => {
                if (terminals.some(t => t === s)) {
                    let pAux = prods[i].productions[j];
                    index = pAux.indexOf(s, index);

                    prods[i].productions[j] = pAux.substring(0, index + s.length) + MARKER +
                    pAux.substring(index + s.length, pAux.length);

                    index += 1;
                }
            });
        });
    });

    let hasNewMark = true;
    let headsMarked = new Set();
    let partialMarks = new Set();

    // Loop step
    while(hasNewMark) {
        hasNewMark = false;

        prods.forEach(prod => {
            prod.productions.forEach(p => {
                // All symbols are marked, than add this production head
                if ((p.match(new RegExp(MARKER, 'g')) || []).length === p.split(" ").length) {
                    if (!headsMarked.has(prod.nonTerminal)) {
                        // Storing who was already marked
                        headsMarked.add(prod.nonTerminal);

                        // Storing partial marks for this iteration
                        partialMarks.add(prod.nonTerminal);

                        // Ensure next iteration
                        hasNewMark = true;
                    }
                }
            });
        });

        // Skiping code
        if (!hasNewMark) {
            partialMarks.clear();
            break;
        }

        // Marking non terminals found previously.
        prods.forEach((prod, i) => {
            prod.productions.forEach((p, j) => {
                let index = 0;

                p.split(" ").forEach(s => {
                    if (nonTerminals.some(nT => nT === s) && partialMarks.has(s)) {
                        let pAux = prods[i].productions[j];
                        index = pAux.indexOf(s, index);

                        prods[i].productions[j] = pAux.substring(0, index + s.length) + MARKER +
                        pAux.substring(index + s.length, pAux.length);

                        index += 1;
                    }
                });
            });
        });

        // Clearing marks for next iteration
        partialMarks.clear();
    }

    // Creating new productions
    let newProds = [];
    let index = 0;

    // Pushing all productions that have all symbols marked
    prods.forEach(prod => {
        if (headsMarked.has(prod.nonTerminal)) {
            newProds.push(({"nonTerminal": prod.nonTerminal, "productions": []}))
            prod.productions.forEach(p => {
                // All symbols are marked, so we keep this production alive.
                if ((p.match(new RegExp(MARKER, 'g')) || []).length === p.split(" ").length) {
                    // Remove the markers and push this production
                    newProds[index].productions.push(p.replace(new RegExp(MARKER, 'g'), ''));
                }
            });

            // Next production head.
            index += 1;
        };
    });

    return newProds;
}

function removeUnreachables(prods, terminals) {

}

export function removeUseless(grammar) {
    let newGrammar = new Grammar();
    
    // Initial symbol will be the same
    newGrammar.S = grammar.S;

    // Terminals will be the same
    newGrammar.Vt = [...grammar.Vt];

    // Removing unproductive productions
    newGrammar.P = removeUnproductives(grammar.P , grammar.Vt, grammar.Vn);

    console.log(newGrammar.P);

    // Removing unreachable productions
    //newGrammar.P = removeUnreachables([...newGrammar.P], [...grammar.Vt]);
    
    // Removing non terminals that aren't on the procutions
    //newGrammar.Vn = grammar.Vn.filter(nT => newGrammar.P.some(p => p.nonTerminal === nT));

    return newGrammar;
}