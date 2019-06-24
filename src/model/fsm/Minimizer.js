import FSM from "../Fsm";
import { min } from "moment";
import { DEAD_STATE } from "../SymbolValidator";

// Search unreachable states starting from initial state.
function getUnreachables(fsm) {
    let actualState = 0;
    let reachables = [fsm.initial];

    while (actualState < reachables.length) {
        fsm.transitions.forEach(t => {
            if (t.from !== reachables[actualState]) return;

            if (!reachables.some(s => t.to === s))
                reachables.push(t.to);
        });
        actualState++;
    }

    return fsm.states.filter(s0 => !reachables.some(s1 => s1 === s0));
}

// Search dead states.
function getDeads(fsm) {
    let statesRange = [];
    fsm.states.forEach(s => statesRange.push(new Set([s])));

    // Calculates the range of each state.
    fsm.transitions.forEach(t => statesRange[fsm.states.indexOf(t.from)].add(t.to));

    statesRange.forEach((ranges, i) => {
        ranges.forEach(sAux => {
            if (!fsm.states.some(s => s === sAux)) return;

            statesRange[fsm.states.indexOf(sAux)].forEach(s => {
                statesRange[i].add(s);
            });
        });
    });

    return fsm.states.filter((_, i) => 
                ![...statesRange[i]].some(s => 
                    fsm.finals.some((isFinal , j) => 
                        isFinal && s === fsm.states[j]
                    )
                )
            );
}

// Calculate equivalent states
function getEquivalents(fsm) {
    let eqGroups0 = [[], []];   /* First iteration.   */
    let eqGroups1 = [];         /* Next iterations.   */
    let i = 0, j = 0;           /* Loop indexes.      */
    let found = false;          /* Stop?.             */
    let size0, size1;           /* Group sizes.       */

    // Set auxiliar dead state if necessary
    fsm.setAuxiliarDeadState();

    // Initialize groups.
    fsm.finals.forEach((isFinal, i) => {
        if (isFinal)
            eqGroups0[1].push({"id": fsm.states[i], "pointers": []});
        else 
            eqGroups0[0].push({"id":fsm.states[i],"pointers": []});
    });

    do {
        // Saves group0 length.
        size0 = eqGroups0.length;

        // Calculates to which groups each member of a group points to.
        eqGroups0.forEach(group => {
            group.forEach((s, sIndex, a) => {
                // Reset pointers.
                s.pointers = [];

                fsm.transitions.forEach(t => {
                    // Skip transitions that aren't from that state.
                    if (t.from !== s.id) return;

                    // Record what group is being pointed.
                    for (j = 0; j < eqGroups0.length; j++) {
                        if (eqGroups0[j].some(s1 => s1.id === t.to)) {
                            a[sIndex].pointers.push(j);
                        }
                    }
                });
            });
        });

        // First member of the new group.
        eqGroups1.push([eqGroups0[0][0]]);

        // Recalculates each group
        eqGroups0.forEach((group, l1) => {
            group.forEach((s, l2) => {
                if (l1 === 0 && (l2 === 0)) return;
                
                found = false;

                for (i = 0; i < eqGroups1.length; i++) {
                    // Don't let non terminals join with terminals
                    if (fsm.finals[fsm.states.indexOf(s.id)] != fsm.finals[fsm.states.indexOf(eqGroups1[i][0].id)]) 
                        continue;
                    
                    if (!s.pointers.some((p, k) => p !== eqGroups1[i][0].pointers[k])) {
                        eqGroups1[i].push(s)
                        found = true;
                        break;
                    }    
                }

                if (!found)
                    eqGroups1.push([s]);
            });
        });
        
        // Saves new groups length.
        size1 = eqGroups1.length;

        // Reset arrays for the next iteration.
        eqGroups0 = [...eqGroups1];
        eqGroups1 = [];
    } while (size1 > size0);

    // Build array with equivalent states
    let eq = [];
    for (i = 0; i < eqGroups0.length; i++) {
        eq.push([]);
        for (j = 0; j < eqGroups0[i].length; j++) 
            eq[i].push(eqGroups0[i][j].id);
    }

    // Removing auxiliar dead state
    fsm.removeAuxiliarDeadState();
    
    // Removing dead state from equivalent groups
    return eq.filter(group => group[0] !== DEAD_STATE);
}

function calculateAcceptAllFSM(fsm) {
    let transitions = [];
  
    fsm.alphabet.forEach(a => {
        if (fsm.transitions.some(t => t.when === a)) {
            transitions.push({"from": "A", "to": "A", "when": a});
        }
    });
  
        return new FSM(["A"], [...fsm.alphabet], transitions, ["A"], [true]);
}

export function minimize(fsm) {
    // If the FSM doens't have any acceptance state, than return a NULL FSM.
    if (!fsm.finals.some(f => f)) return  new FSM([DEAD_STATE], [], [], DEAD_STATE, [false]);
  
    // If all states accept
    if (fsm.finals.every(f => f)) return calculateAcceptAllFSM(fsm);

    // If FSM has less than 2 states.
    if (fsm.states.length <= 1) return fsm;
    
    // Cloning fsm and removing useless transitions.
    let minFsm = fsm.clone();

    // Get unreachable states.
    let unreachables = getUnreachables(minFsm);

    // Does the FSM contains an unreachable state?
    if (unreachables.length > 0) {
        // Delete unreachable states from final states array.
        minFsm.finals = minFsm.finals.filter((_, i) => !unreachables.some(s => s === minFsm.states[i]));

        // Delete unreachable states from transitions.
        minFsm.transitions = minFsm.transitions.filter(t => !unreachables.some(s => (s === t.from || s === t.to)));
        
        // Delete unreachable states.
        minFsm.states = minFsm.states.filter(s => !unreachables.some(s1 => s1 === s));

        // Null FSM?
        if (minFsm.states.length === 0 || !minFsm.finals.some(f => f))
            return new FSM([DEAD_STATE], [], [], DEAD_STATE, [false]);

        // If all states accept
        if (minFsm.finals.every(f => f)) return calculateAcceptAllFSM(minFsm);
    } 

    // Get dead states.
    let deads = getDeads(minFsm);

    // Does the FSM have a dead state?
    if (deads.length > 0) {
        // Delete dead states from final states array.
        minFsm.finals = minFsm.finals.filter((_, i) => !deads.some(s => s === minFsm.states[i]));

        // Delete dead states from transitions.
        minFsm.transitions = minFsm.transitions.filter(t => !deads.some(s => (s === t.from || s === t.to)));

        // Delete dead states.
        minFsm.states = minFsm.states.filter(s => !deads.some(s1 => s1 === s));

        // Null FSM?
        if (minFsm.states.length === 0 || !minFsm.finals.some(f => f))
            return new FSM([DEAD_STATE], [], [], DEAD_STATE, [false]);

        // If all states accept
        if (minFsm.finals.every(f => f)) return calculateAcceptAllFSM(minFsm);
    }

    // Get equivalent states
    let eqStates = getEquivalents(minFsm);

    // Does any equivalent groups contains more than one state?
    if (eqStates.some(group => group.length > 1)) {
        // Filtering final states so that we have just one per equivalent group.
        minFsm.finals = minFsm.finals.filter((_, i) => eqStates.some(group => group[0] === minFsm.states[i]));
        
        // Filtering states so that we have just one per equivalent group.
        minFsm.states = minFsm.states.filter(s => eqStates.some(group => s === group[0]));
        
        // Filtering transitions to remove the ones that start in a removed state.
        minFsm.transitions = minFsm.transitions.filter(t => minFsm.states.some(s => t.from === s));

        // Changing ".to" attribute of transitions to a equivalent state that was not removed. 
        minFsm.transitions.forEach((t,i) => {
            if (!minFsm.states.some(s => s === t.to)) {
                for (let j = 0; j < eqStates.length; j++) {
                    if (eqStates[j].some(s => s === t.to)) {
                        minFsm.transitions[i].to = eqStates[j][0];
                    }
                }        
            } 
        });
    }

    // Boolean signal for visual interface
    minFsm.isMin = true;

    return minFsm;
}