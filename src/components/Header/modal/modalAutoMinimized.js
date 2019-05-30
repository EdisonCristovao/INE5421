import React from "react";
import { connect } from "react-redux";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from "reactstrap";
import Fsm from "./../../../model/Fsm";
import { makeNewLanguageDet } from "./../../../actions/Language";

class ModalAutoMinimized extends React.Component {
  state = {
    modal: false,
    detFsm: null
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    this.forceUpdate();
  };

  getNextState = (state, letter, transitions) => {
    const transition = transitions.find(
      tran => tran.from === state && tran.when == letter
    );
    if (transition === undefined) return <td>{"-"}</td>;
    else return <td>{transition.to}</td>;
  };

  render() {
    const { fsm } = this.props.language;
    let detFsm = new Fsm();
    detFsm.createFsmFromFsm(fsm);

    if (this.state.modal) detFsm = detFsm.determine().minimize();

    return (
      <div>
        <li className="pointer" onClick={this.toggle}>
          <div className="d-flex align-items-center">
            {/* <i className={`flag flag-24 flag-${icon}`} /> */}
            <h4 className="mb-0 ml-2">Minimizar</h4>
          </div>
        </li>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader >Automato Minimizado</ModalHeader>
          <ModalBody>
            <table className="default-table table table-sm table-responsive-sm table-hover mb-1">
              <thead className="th-border-b">
                <tr>
                  <th>
                    <i class="zmdi zmdi-arrow-right" />
                  </th>
                  <th>F</th>
                  <th>Estado</th>
                  {detFsm.alphabet.map((letter, index) => (
                    <th>{letter}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {detFsm.states.map((state, index) => (
                  <tr>
                    <td>
                      <Input
                        className="position-relative m-0"
                        type="radio"
                        name="initialDet"
                        checked={state === detFsm.initial}
                      // onChange={e => this.setInitialState(e, state)}
                      />
                    </td>
                    <td>
                      <Input
                        className="position-relative m-0"
                        type="checkbox"
                        checked={detFsm.finals[index]}
                      // onChange={e => this.setFinalState(e, index)}
                      />
                    </td>
                    <td>{state}</td>
                    {detFsm.alphabet.map((letter, index) =>
                      this.getNextState(state, letter, detFsm.transitions)
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(e) => { this.toggle(); this.props.makeNewLanguageDet(detFsm) }}>Criar nova linguagem</Button>
            <Button color="secondary" onClick={this.toggle}>Voltar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
const mapState = ({ languages }) => {
  const { listLanguages, selectedLanguage } = languages;
  return { language: listLanguages[selectedLanguage] };
};

export default connect(mapState, { makeNewLanguageDet })(ModalAutoMinimized);
