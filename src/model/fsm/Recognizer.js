export function sentenceRecognize(fsm, sentence) {
    // Check if all sentence letters are in FSM alphabets.
    if (sentence.split('').some(aChar => !fsm.alphabet.includes(aChar)))
        return false;

    let state = fsm.initial;
    let auxChar;
    let ended;

    // Iterate over each letter.
    for (let i = 0; i < sentence.length; i++) {
        ended = true;
        auxChar = sentence.charAt(i);

        for (let j = 0; j < fsm.transitions.length; j++) {
            if (fsm.transitions[j].from === state &&
                fsm.transitions[j].when === auxChar) {
                
                state = fsm.transitions[j].to;
                
                if (state !== undefined && state !== "")
                    ended = false;
               
                break;
            }
        }
        if (ended) return false;
    }
    return fsm.finals[fsm.states.indexOf(state)];
}