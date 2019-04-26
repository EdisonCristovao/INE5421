import Fsm from "../Fsm";
import { EPSILON, DEAD_STATE } from "../SymbolValidator";
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
  let actualState = 0;
  let possibleStates = [];

  // First state will be the first of the original FA
  fsmDet.initial = fsm.initial;
  fsmDet.states.push(fsm.initial);
  fsmDet.alphabet = fsm.alphabet;

  // Auxiliar array to collect all states that a symbol leads
  for(let i = 0; i < fsm.alphabet.length; i++)
    possibleStates.push(new Set());

  /* 
   * Colect all states that, throught a state (new state
   * in the new automata), with a symbol, whe can go to
   */
  while(actualState != fsmDet.states.length) {
    
    fsmDet.states[actualState].split(",").forEach(
      singleState => {
        fsm.transitions.forEach(
          transition => {
            if (transition.from === singleState
              && transition.to !== undefined) {
              transition.to.split(",").forEach(
                state => possibleStates[
                  fsm.alphabet.indexOf(transition.when)]
                  .add(state)
              ); 
            }
          }
        );
      }
    );
    
    /*
     * Sorts all states collected in the previous loop
     * to make sure that there's no equivalent states
     * before adding new states and transitions. 
     * (for example, (A,B) or (B,A) are the same thing).
     */
    possibleStates.forEach(
      (state, index) => {
        let fromStateStr = fsmDet.states[actualState];
        let toStateStr = Array.from(state).sort().join(",");

        if (toStateStr === "") toStateStr = DEAD_STATE;
        if (fromStateStr === "") fromStateStr = DEAD_STATE;

        fsmDet.transitions.push(
          {
            "from": fromStateStr ,
            "to": toStateStr,
            "when": fsmDet.alphabet[index]
          }
        );
        
        /* 
         * Makes sure that the new state
         * isn't on states list before adding it.
         */
        if (!fsmDet.states.includes(toStateStr))
          fsmDet.states.push(toStateStr);
        
        // Set context variables for next iteration
        state.clear();
      }
    );

    actualState++;
  }
  return fsmDet;
}