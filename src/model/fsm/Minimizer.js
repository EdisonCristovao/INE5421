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
    let count = 0;              /* Auxiliary counter. */
    let found = false;          /* Stop?.             */
    let size0, size1;           /* Group sizes.       */

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
            group.forEach(s => {
                // Reset pointers.
                s.pointers = [];

                // Find all transitions from some state.
                for (i = 0, count = 0; count < fsm.alphabet.length; i++) {
                    // Transition not from that state.
                    if (fsm.transitions[i].from !== s.id) continue;
                    
                    // Found a transiton from that state.
                    count++;

                    // Record what group is being pointed.
                    for (j = 0; j < eqGroups0.length; j++) {
                        if (eqGroups0[j].some(s1 => s1.id === fsm.transitions[i].to)) {
                            s.pointers.push(j);
                            break;
                        }
                    }
                }
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

    return eq;
}

export function minimize(fsm) {
    let minFsm = new FSM();
    minFsm.initial = fsm.initial;
    minFsm.alphabet = [...fsm.alphabet];

    // Get unreachable states.
    let unreachables = getUnreachables(fsm);

    // Delete unreachable states.
    minFsm.states = fsm.states.filter(s => !unreachables.some(s1 => s1 === s));
    
    // Delete unreachable states from final states array.
    minFsm.finals = fsm.finals.filter((_, i) => !unreachables.some(s => s === fsm.states[i]));

    // Delete unreachable states from transitions.
    minFsm.transitions = fsm.transitions.filter(t => !unreachables.some(s => (s === t.from || s === t.to)));

    // Null FSM?
    if (minFsm.states.length === 0) return new FSM([DEAD_STATE], [], [], DEAD_STATE, [false]);

    // Get dead states.
    let deads = getDeads(minFsm);

    // Delete dead states from final states array.
    minFsm.finals = minFsm.finals.filter((_, i) => !deads.some(s => s === minFsm.states[i]));

    // Delete dead states from transitions.
    minFsm.transitions = minFsm.transitions.filter(t => !deads.some(s => (s === t.from || s === t.to)));

    // Delete dead states.
    minFsm.states = minFsm.states.filter(s => !deads.some(s1 => s1 === s));

    // Null FSM?
    if (minFsm.states.length === 0) return new FSM([DEAD_STATE], [], [], DEAD_STATE, [false]);

    // Get equivalent states
    let eqStates = getEquivalents(minFsm);

    
    
    return minFsm;
}