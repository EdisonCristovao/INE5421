import Fsm from "../Fsm";
import { EPSILON } from "../SymbolValidator";
import FSM from "../Fsm";
import { FSM_EDIT } from "../../actions/Fsm";

export function isDeterministic(fsm) {
  if (!fsm instanceof Fsm) return "NotStance";

  return !(
    hasMultTransitions(fsm.transitions) || 
    hasEpsilon(fsm.alphabet)
    );
}

function hasMultTransitions(transitions) {
  return transitions.some(
    tran => tran.to.split(",").length > 1 //>  1 isDeterministic is false
  );
}

function hasEpsilon(alphabet) {
  return alphabet.some(
    letter => letter === EPSILON //>  1 isDeterministic is false
  );
}

export function determine(fsm) {
  let isDet = isDeterministic(fsm);
  if (isDet === "NotStance") return "NotStance";
  else if(isDet) return "AlreadyDeterministic";

  if (!hasEpsilon(fsm.alphabet)) 
    return determineWithoutEpsilon(fsm);
  else 
    return determineWithEpsilon(fsm);
}

function determineWithoutEpsilon(fsm) {
  let fsmDet = new FSM();
  let nStates0 = 0;
  let nStates1 = 1;
  let possibleStates = [];
  let realStates = new Set();

  fsmDet.initial = fsm.initial;
  fsmDet.states.push(fsm.initial);
  fsmDet.alphabet = fsm.alphabet;

  fsm.alphabet.forEach(
    symbol => possibleStates.push(new Set())
  );

  while(nStates0 != nStates1) {
    fsmDet.states[nStates0].split(",").forEach(
      singleState => {
        fsm.transitions.forEach(
          transition => {
            if (transition.from === singleState)
              transition.to.split(",").forEach(
                state => possibleStates[
                  fsm.alphabet.indexOf(transition.when)].
                  add(state)
              ); 
          }
        );
      }
    );
    

    possibleStates.forEach(posState => {
      // Coisas
      posState.clear();
    });
    realStates.clear();
    break;
  }

  return fsmDet;
}