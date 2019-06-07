import { EPSILON, NEW_STATE } from "../SymbolValidator";
import FSM from "../Fsm";

export function unite(fsm1, fsm2) {
    let uFsm = new FSM();

    /* Renaming states of each FSM so we can know from each FSM they are (1st or 2nd). */
    let fsm1Aux = fsm1.clone().renameForIdentification("1");
    let fsm2Aux = fsm2.clone().renameForIdentification("2");

    /* Initial state will be a new state. */
    uFsm.initial = NEW_STATE;
    
    /* Alphabet will be the union from both FSMs alphabet sets plus an epsilon symbol. */
    uFsm.alphabet = [EPSILON].concat(Array.from(new Set(fsm1Aux.alphabet.concat(fsm2Aux.alphabet))));

    /* States will be the concatenation of the new state with both FSMs state sets. */
    uFsm.states = [NEW_STATE].concat(fsm1Aux.states).concat(fsm2Aux.states);

    /* Transitions will be all transitions from both FSMs + an epsilon *
     * transition from the new state to each FSMs initial state        */
    uFsm.transitions.push({"from": NEW_STATE, "to": fsm1Aux.initial+","+fsm2Aux.initial, "when": EPSILON});
    uFsm.transitions = uFsm.transitions.concat(fsm1Aux.transitions).concat(fsm2Aux.transitions);

    /* Final states will be a first element indicating that the new state isn't  *
     * a final one plus the concatenation of both FSMs final state arrays .      */
    uFsm.finals = [false].concat(fsm1Aux.finals).concat(fsm2Aux.finals);

    uFsm.setAuxiliarDeadState();
    
    return uFsm;
}