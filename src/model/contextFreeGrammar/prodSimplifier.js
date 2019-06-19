import Grammar from "../Grammar"

export function simplifyProductions(grammar) {
    let newGrammar = new Grammar();
    let hasNewState = true;

    // Clonning grammar
    newGrammar.isRegular = false;
    newGrammar.S = grammar.S;
    newGrammar.Vt = [...grammar.Vt];
    newGrammar.Vn = [...grammar.Vn];
    grammar.P.forEach(prod => 
        newGrammar.P.push(({"nonTerminal": prod.nonTerminal, "productions": [...prod.productions]})));
        
    while(hasNewState) {
        let productions = [];
        hasNewState = false;

        newGrammar.P.filter(prod => {
            let sameProd = [];
            let removedProd = [];
            let newProds = [];

            // Separates productions that need to change from those who don't
            prod.productions.forEach(p => p.split(" ").length <= 2 ? sameProd.push(p): removedProd.push(p));

            // This means that we will have new states
            if (removedProd.length > 0) {
                hasNewState = true;

                // Creating new productions
                removedProd.forEach(p => {
                    let newProd1, newProd2;
                    let newState;
                    let symbolsArray = p.split(" ");

                    // Dividing removed productions so we can re-add them
                    newProd1 = symbolsArray.slice(0, 2);
                    newProd2 = symbolsArray.slice(1, symbolsArray.length).join(" ");

                    newState = newProd1[1] + "'";

                    while(newGrammar.Vn.some(nT => nT === newState)) newState += "'"

                    newGrammar.Vn.push(newState);
                    newProd1 = [newProd1[0], newState].join(" ");

                    sameProd.push(newProd1);
                    newProds.push({"nonTerminal": newState, "productions": [newProd2]});
                });
                
                productions.push({"nonTerminal": prod.nonTerminal, "productions": sameProd});
                productions = productions.concat(newProds);
            } else {
                productions.push({"nonTerminal": prod.nonTerminal, "productions": sameProd});
            }
        });
        newGrammar.P = productions;
    }

    console.log(newGrammar);

    return newGrammar;
}