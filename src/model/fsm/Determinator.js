import { EPSILON, DEAD_STATE } from "../SymbolValidator";
import FSM from "../Fsm";

export function isDeterministic(fsm) {
  if (!fsm instanceof FSM) return "NotStance";

  return !(
    hasMultTransitions(fsm.transitions) || 
    hasEpsilon(fsm.alphabet)
    );
}

function hasMultTransitions(transitions) {
  return transitions.some(tran => {
    if (tran.to !== undefined && tran.to !== "")  
      return tran.to.split(",").length > 1 //>  1 isDeterministic is false
    else
      return false
  });
}

function hasEpsilon(alphabet) {
  return alphabet.some(
    letter => letter === EPSILON //>  1 isDeterministic is false
  );
}

// This function acts like a class
function makeDeterministic(fsm) {
  let fsmDet = new FSM();
  let eStar = [];
  let actualState = 0;
  let possibleStates = [];

  let search = function(eStarIndex, originalState, auxState) {
    if (auxState === originalState) return;
    if (eStar[eStarIndex].has(auxState)) return;

    eStar[eStarIndex].add(auxState);

    let auxTrans = fsm.transitions.filter(
      trans => trans.from === auxState &&
        trans.when === EPSILON && trans.to !== undefined
    );

    if (auxTrans[0] === undefined) return;

    auxTrans[0].to.split(",").forEach(state =>
      search(eStarIndex, originalState, state)
    );
  }

  let eStarCalculate = function() {
    if (!hasEpsilon(fsm.alphabet)) return;

    fsm.transitions.forEach(
      transition => {
        if (transition.when === EPSILON &&
          transition.to !== undefined) {
          transition.to.split(",").forEach(
            state => {
              search(fsm.states.indexOf(transition.from),
                transition.from, state);
            }
          )
        }
      }
    );
  }


  /*
   * Collects all states that, throught a state (new state
   * in the new automata), with a symbol, whe can go to
   */
  let calculatePossibleStates = function() {
    let stateAux = fsmDet.states[actualState];
    let lengthAux = stateAux.length;

    stateAux.substring(1, lengthAux - 1).split(",").forEach(
      singleState => {
        fsm.transitions.forEach(
          transition => {
            if (transition.from === singleState
              && transition.to !== undefined
              && transition.to !== ""
              && transition.when !== EPSILON) {
              transition.to.split(",").forEach(
                state => {

                  eStar[fsm.states.indexOf(state)]
                    .forEach(eStarState => possibleStates[
                      fsmDet.alphabet.indexOf(transition.when)]
                      .add(eStarState)
                    );
                }
              )
            }
          }
        )
      }
    );
  }

  /*
   * Sorts all states collected in the previous loop
   * to make sure that there's no equivalent states
   * before adding new states and transitions.
   * (for example, (A,B) or (B,A) are the same thing).
   */
  let calculateRealStates = function() {
    possibleStates.forEach(
      (state, index) => {
        let fromStateStr = fsmDet.states[actualState];
        let toStateStr = "{" + Array.from(state).sort().join(",") + "}";

        if (toStateStr === "") toStateStr = DEAD_STATE;
        if (fromStateStr === "") fromStateStr = DEAD_STATE;

        fsmDet.transitions.push(
          {
            "from": fromStateStr,
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
  }

  let calculateFinalStates = function() {
    fsmDet.states.forEach(state => {
      let lengthAux = state.length;

      if (state.substring(1, lengthAux - 1).split(",").some(
        singleState => fsm.finals[fsm.states.indexOf(singleState)])) {
        fsmDet.finals.push(true);
      } else {
        fsmDet.finals.push(false);
      }
    });
  }
  // Initializes eStar array
  fsm.states.forEach(state => {
    if (state !== undefined && state !== "")
      eStar.push(new Set([state]))
  });

  // Alphabet is the same from the original (Without epsilon)
  fsmDet.alphabet = fsm.alphabet.filter(a => a != EPSILON);

  // Auxiliary array to collect all states that a symbol leads
  for (let i = 0; i < fsmDet.alphabet.length; i++)
    possibleStates.push(new Set());

  eStarCalculate();

  // First state will be e* of the original FA first state
  fsmDet.initial = "{" + Array.from(eStar[fsm.states.indexOf(fsm.initial)]).sort().join(",") + "}";
  fsmDet.states.push(fsmDet.initial);

  while(actualState !== fsmDet.states.length) {
    calculatePossibleStates();
    calculateRealStates();
    actualState++;
  }
  calculateFinalStates();
  
  return fsmDet;
}

export function determine(fsm) {
  let isDet = isDeterministic(fsm);
  if (isDet === "NotStance") 
    return "NotStance";
  else if(isDet) 
    return fsm;

  return makeDeterministic(fsm);
}
