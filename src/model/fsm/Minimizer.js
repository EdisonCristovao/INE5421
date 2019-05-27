import FSM from "../Fsm";
import { min } from "moment";

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
    fsm.states.forEach(s => statesRange.push(new Set()));

    // Calculates the range of each state.
    fsm.transitions.forEach(t => statesRange[fsm.states.indexOf(t.from)].add(t.to));

    statesRange.forEach((ranges, i) => {
        ranges.forEach(sAux => {
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

    // Get dead states.
    let deads = getDeads(fsm);

    // Delete dead states from final states array.
    minFsm.finals = minFsm.finals.filter((_, i) => !deads.some(s => s === minFsm.states[i]));

    // Delete dead states from transitions.
    minFsm.transitions = minFsm.transitions.filter(t => !deads.some(s => (s === t.from || s === t.to)));

    // Delete dead states.
    minFsm.states = minFsm.states.filter(s => !deads.some(s1 => s1 === s));

    return minFsm;
}