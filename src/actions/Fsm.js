export const FSM_EDIT = 'FSM_EDIT';

//LANGUAGES
export function fsmEdit(fsm) {
    return { type: FSM_EDIT, payload: fsm };
}
