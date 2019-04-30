export const FSM_EDIT = 'FSM_EDIT';

//FSM
export function fsmEdit(fsm) {
    return { type: FSM_EDIT, payload: fsm };
}
