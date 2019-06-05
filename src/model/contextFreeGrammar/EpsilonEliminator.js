import { SEPARATOR, DERIVATION, EPSILON, NEW_STATE } from "../SymbolValidator";
import Grammar from "../Grammar"

function getNullables(grammar) {
    let nullables = new Set();

    // Heads that contain an epsilon production.
    grammar.P.forEach(p => {
        if (p.productions.some(p1 => p1 === EPSILON))
            nullables.add(p.nonTerminal);
    });

    // Heads that contain a nullable production.
    grammar.P.forEach(p => {
        if (p.productions.some(p1 => p1.split(" ")
            .filter(s => grammar.Vn.some(nT => nT === s))
            .some(nT => nullables.has(nT))))
            nullables.add(p.nonTerminal);
    })

    return nullables;
}

function arrangeNulls(nulls) {
    // Base of recursion.
    if (nulls.length === 1) return [nulls];
    
    let arr = [[...nulls]];
    
    // Recursion steps
    for (let i = 0; i < nulls.length; i++)
        arr = arr.concat(arrangeNulls(nulls.filter((_, iAux) => iAux !== i)))

    return arr;
}

function calculateNewProductions(prod, nullables) {
    let newProd = [];  /* New productions for some head.        */
    let nullsArr = []; /* Arrangment of all non terminal nulls. */

    prod.forEach(p => {
        let pElements = p.split(" ");
        let nulls = pElements.filter(s => nullables.has(s));

        // If there's no nullable element in this production
        if (nulls.length === 0) return;
        
        // Calculating all arrangments and removing duplicates
        arrangeNulls(nulls).forEach(arr => {
            if (!nullsArr.some(arr1 => arr1.sort().join('') === arr.sort().join('')))
                nullsArr.push(arr);
        });
        
        // Calculating new productions
        nullsArr.forEach(arr => {
            let newProdAux = [];
            let indexArr = 0;

            // The order of elements on each array are related.
            pElements.forEach(el => {
                // Find a nullable non terminal symbol and skip it.
                if (el === arr[indexArr]) indexArr++;
                else newProdAux.push(el);
            })
            
            if (newProdAux.length > 0)
                newProd.push(newProdAux.join(" "));
        });

        // Clear array for next iteration
        nullsArr = [];
    });

    return newProd;
}

export function removeEpsilon(grammar) {
    let newGrammar = new Grammar();
    let prodAux = [];

    newGrammar.isRegular = false;
    newGrammar.Vn = [...grammar.Vn];
    newGrammar.Vt = [...grammar.Vt];

    // Calculate nullable non terminal symbols
    let nullables = getNullables(grammar);

    // Initial symbol is nullable?
    if (nullables.has(grammar.S)) {
        newGrammar.Vn.push(grammar.S+"'");
        newGrammar.S = grammar.S+"'";
        newGrammar.P.push({"nonTerminal": newGrammar.S, "productions": [grammar.S, EPSILON]});
    } else {
        newGrammar.S = grammar.S;
    }

    // Set initial productions (without epsilon)
    grammar.P.forEach(p => {
        prodAux = p.productions.filter(p1 => p1 !== EPSILON);
        newGrammar.P.push({"nonTerminal": p.nonTerminal, "productions": prodAux});
    });

    // Calculates new productions
    newGrammar.P.forEach((p, i, pArray) => {
        prodAux = calculateNewProductions(p.productions, nullables);

        // No productions to be added on this iteration step.
        if (prodAux.length === 0) return;

        // Adding new productions.
        pArray[i].productions = p.productions.concat(prodAux);
    })
    
    return newGrammar;
}