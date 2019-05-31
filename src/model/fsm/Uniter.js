import { EPSILON, DEAD_STATE } from "../SymbolValidator";
import FSM from "../Fsm";

export function unite(fsm1, fsm2) {
    let fsm1Aux = fsm1.clone();
    let fsm2Aux = fsm2.clone();
    let uFsm = new FSM();

    // Renaming states of each FSM so we can know from each FSM they are (1 or 2).
    fsm1Aux.initial += "1";

    fsm1Aux.states = fsm1Aux.states.map(s => s += "1");

    fsm1Aux.transitions.forEach((t, i) => {
        fsm1Aux.transitions[i].from += "1";
        fsm1Aux.transitions[i].to = t.to.split(",").map(s => s += "1").join(","); 
    });

    fsm2Aux.initial += "2";

    fsm2Aux.states = fsm2Aux.states.map(s => s += "2");

    fsm2Aux.transitions.forEach((t, i) => {
        fsm2Aux.transitions[i].from += "2";
        fsm2Aux.transitions[i].to = t.to.split(",").map(s => s += "2").join(",");
    });

    return uFsm;
}