import FSM from "../Fsm";

export function intersect(fsm1, fsm2) {
    // Testing if the intersection of each FSMs alphabets isn't null.
    if (!fsm1.alphabet.some(s1 => fsm2.alphabet.some(s2 => s1 == s2))) return null;
    
    // Auxiliary variables to construct the new FSM
    let iFsm = new FSM();
    let auxIndex = -1;
    let newStates = [];
    let newState = "";
    
    // Renaming states of each FSM so we can know from each FSM they are (1st or 2nd).
    let fsm1Aux = fsm1.clone().renameForIdentification("1");
    let fsm2Aux = fsm2.clone().renameForIdentification("2");
    
    // alphabet will be all the symbols that both FSMs alphabets contains.
    iFsm.alphabet = fsm1Aux.alphabet.filter(s1 => fsm2Aux.alphabet.some(s2 => s1 == s2));

    // initializing new states array
    for (let i = 0; i < iFsm.alphabet.length; i++) newStates[i] = new Set();

    iFsm.initial = fsm1Aux.initial + "," + fsm2Aux.initial;

    iFsm.states.push(iFsm.initial);

    iFsm.finals.push(fsm1Aux.finals[0] || fsm2Aux.finals[0]);

    do {
        // Increasing index to iterate over the new state.
        auxIndex++;

        // Calculate possible new states
        iFsm.states[auxIndex].split(",").forEach(s => {
            if (s[s.length-1] === "1") {
                fsm1Aux.transitions.forEach(t => {
                    if (t.from !== s) return;
                    if (!iFsm.alphabet.some(a => a === t.when)) return;
            
                    newStates[iFsm.alphabet.indexOf(t.when)].add(t.to);
                });
            } else {
                fsm2Aux.transitions.forEach(t => {
                    if (t.from !== s) return;
                    if (!iFsm.alphabet.some(a => a === t.when)) return;
            
                    newStates[iFsm.alphabet.indexOf(t.when)].add(t.to);
                });
            }
        });

        // Push possible new states (if this state wasn't added yet).
        newStates.forEach((set, i, a) => {
            // Creating the new state sorting each element so we can do some comparisons later.
            newState = Array.from(set).sort().join(",");

            if (newState === "") return;

            // Checking if this states was already added.
            if (!iFsm.states.some(s => s === newState)) {
                // Adding the new state.
                iFsm.states.push(newState);

                // Is this a final state?.
                iFsm.finals.push(newState.split(",").every(
                    s => s[s.length-1] === "1" ?
                        fsm1Aux.finals[fsm1Aux.states.indexOf(s)]
                        :
                        fsm2Aux.finals[fsm2Aux.states.indexOf(s)]
                ));
            }

            // Adding transitions to that new state.
            iFsm.transitions.push(
                {
                    "from": "{" + iFsm.states[auxIndex] + "}",
                    "to": "{" + newState + "}",
                    "when": iFsm.alphabet[i]
                }
            );

            // Clearing our set for the next iteration.
            a[i].clear();
        });
    }  while(auxIndex < iFsm.states.length-1);


    // There's no accepting state, so the intersection is null.
    if (!iFsm.finals.some(f => f)) return null;

    // Adding brackets
    iFsm.initial = "{" + iFsm.initial + "}";
    iFsm.states.forEach((s, i, a) => a[i] = "{" + s + "}");

    return iFsm;
}