import Fsm from "../model/Fsm"

export const FSM_EDIT = 'FSM_EDIT';

//FSM
export function fsmEdit(fsm) {
    fsm.determine();
    return { type: FSM_EDIT, payload: fsm };
}
