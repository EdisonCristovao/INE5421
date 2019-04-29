export const FSM_EDIT = 'FSM_EDIT';

//FSM
export function fsmEdit(fsm) {
    console.log(fsm.determine());
    return { type: FSM_EDIT, payload: fsm };
}
