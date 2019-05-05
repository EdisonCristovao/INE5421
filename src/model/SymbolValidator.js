export const EPSILON = '&';
export const SEPARATOR = '|';
export const DERIVATION = '->';
export const DEAD_STATE = '-';

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