export const EPSILON = '&';
export const SEPARATOR = '|';
export const DERIVATION = '->';
export const DEAD_STATE = '-';
export const NEW_STATE = "#";
export const ALPHABET = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9'];
export const MARKER = "@"

export default {
    isValidTerminal: terminal => {
        return /^([a-z]|[0-9]|&)$/.test(terminal);
    },
    isValidTerminalWithoutEpsilon: terminal => {
        return /^([a-z]|[0-9])$/.test(terminal);
    },
    isValidNonTerminal: nonTerminal => {
        return /^([A-Z])$/.test(nonTerminal);
    },

    
    // isStandardAtoZName: stateName => {
    //     return /^([A-Z])$/.test(stateName);
    // },
    // isStandardStateName: stateName => {
    //     return /^([A-Z]|Q[0-9]*)$/.test(stateName);
    // },
    // isEpsilon: str => {
    //     return str === EPSILON;
    // },
};