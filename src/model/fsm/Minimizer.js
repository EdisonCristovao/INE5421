import FSM from "../Fsm";

// Search unreachable states starting from initial state.
function getUnreachables(fsm) {
    let actualState = 0;
    let unreachables = [fsm.initial];

    while (actualState < unreachables.length) {
        fsm.transitions.forEach(t => {
            if (t.from !== unreachables[actualState]) return;

            if (!unreachables.some(s => t.to === s))
                unreachables.push(t.to);
        });
        actualState++;
    }

    return fsm.states.filter(s0 => !unreachables.some(s1 => s1 === s0));
}

export function minimize(fsm) {
    let minFsm = new FSM();
    minFsm.initial = fsm.initial;
    minFsm.alphabet = [...fsm.alphabet];

    // Get unreachable states
    let unreachables = getUnreachables(fsm);

    // Delete unreachable states.
    minFsm.states = fsm.states.filter(s => !unreachables.some(s1 => s1 === s));
    
    // Delete unreachable states from final states array.
    for (let i = 0; i < fsm.finals.length; i++) {
        if (!unreachables.some(s => s === fsm.states[i]))
            minFsm.finals.push(fsm.finals[i]);
    }

    // Delete unreachable states from transitions.
    minFsm.transitions = fsm.transitions.filter(t => !unreachables.some(s => s === t.from));

    return minFsm;
}