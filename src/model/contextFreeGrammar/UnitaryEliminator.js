import { EPSILON } from "../SymbolValidator";
import Grammar from "../Grammar"

function calculateRanges(grammar) {
    // Ranges of all non terminal symbols
    let ranges = [];
    
    // Calculates non terminal ranges for those who have unitary productions.
    grammar.Vn.forEach(nT => {
        // Initializes range auxiliary array.
        let range = [nT];
        let index = 0;

        while (index < range.length) {
            // Using for so we can break.
            for (let i = 0; i < grammar.P.length; i++) {
                // Find all productions from that non terminal.
                if (grammar.P[i].nonTerminal === range[index]) {
                    // non terminal partial range considering some head of production
                    let partRange = grammar.P[i].productions
                    .filter(p => grammar.Vn.some(s => s === p));

                    // Is there any unitary production on this iteration?
                    if (partRange.length > 0) {
                        partRange.forEach(p => {
                            if (!range.some(el => el === p)) {
                                range.push(p);
                            }
                        }); 
                    }
                    break;
                }
            }
            index++;
        }
        ranges.push(range);
    });

    return ranges;
}


export function removeUnitary(grammar) {
    let newGrammar = new Grammar();
    
    // Initializing new grammar
    newGrammar.isRegular = false;
    newGrammar.Vn = [...grammar.Vn];
    newGrammar.Vt = [...grammar.Vt];
    newGrammar.S = grammar.S;

    let ranges = calculateRanges(grammar);

    // Iterate over each head of production.
    grammar.P.forEach((p, i) => {
        // Auxiliary array to store all new productions.
        let prod = [];

        // Iterate over each production so we can find all productions that are inside a head of productions range.
        grammar.P.forEach(p1 => {
            if (ranges[i].some(nT => nT === p1.nonTerminal)) {
                // Iterate over this non terminal productions.
                p1.productions.forEach(pAux => {
                    // If a production isn't unitary.
                    if (!grammar.Vn.some(nT => nT === pAux)) {
                        // If a production wasn't added yet.
                        if (!prod.some(pAux1 => pAux1 === pAux)) {
                            // Add this production.
                            prod.push(pAux);
                        }
                    }
                });
            }
        })

        // Set all new productions into the new grammar.
        newGrammar.P.push({"nonTerminal": p.nonTerminal, "productions": prod});
    });

    return newGrammar;
}